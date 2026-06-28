import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Settings } from 'lucide-react';

// >>> CHATBOT API AYARLARI <<<
// Tunnel URL'i geçici (her cloudflared restart'ında değişir). Değişince header'daki
// ayar (dişli) butonundan güncelle — redeploy gerekmez (localStorage'a kaydedilir).
const DEFAULT_API =
  'https://nutten-pittsburgh-strings-warrior.trycloudflare.com/api/v1/chat/messages';
const PUBLIC_KEY = 'pk_web_02fdaddacfec41c098ca3e1568f7630c'; // dashboard → Kanallar

type Role = 'USER' | 'ASSISTANT';
type Message = { id?: string; role: Role; content: string };

function getApiUrl(): string {
  return localStorage.getItem('chatApiUrl') || DEFAULT_API;
}

function getSessionId(): string {
  let sid = localStorage.getItem('aisa_sid');
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem('aisa_sid', sid);
  }
  return sid;
}

const WELCOME: Message = {
  role: 'ASSISTANT',
  content: 'Merhaba! 👋 Istanbul Auto Repair\'a hoş geldiniz. Size nasıl yardımcı olabilirim?',
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sessionId = useRef<string>(getSessionId());
  const seenRef = useRef<Set<string>>(new Set());
  const afterRef = useRef<string | null>(null);
  const firstRef = useRef(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addMessage = (msg: Message) => setMessages((prev) => [...prev, msg]);

  // Yeni ASSISTANT (ve ilk poll'da USER) mesajlarını çek
  const poll = async () => {
    try {
      const url = new URL(getApiUrl());
      url.searchParams.set('sessionId', sessionId.current);
      if (afterRef.current) url.searchParams.set('after', afterRef.current);

      const res = await fetch(url, { headers: { 'X-Public-Key': PUBLIC_KEY } });
      if (!res.ok) return;

      const data = await res.json();
      const incoming: any[] = data.messages || [];

      for (const m of incoming) {
        if (seenRef.current.has(m.id)) continue;
        seenRef.current.add(m.id);
        afterRef.current = m.createdAt;
        // İlk poll'dan sonra kendi USER mesajlarımızı atla (optimistik eklendiler)
        if (m.role === 'USER' && !firstRef.current) continue;
        addMessage({ id: m.id, role: m.role, content: m.content });
      }
      firstRef.current = false;
    } catch {
      /* sessiz geç — bir sonraki poll'da tekrar dener */
    }
  };

  // Mount'ta ilk poll + 2.5sn'de bir polling
  useEffect(() => {
    poll();
    const interval = setInterval(poll, 2500);
    return () => clearInterval(interval);
  }, []);

  // Yeni mesajda en alta kaydır
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;

    addMessage({ role: 'USER', content: text }); // optimistik
    setInput('');
    setIsSending(true);

    try {
      const res = await fetch(getApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Public-Key': PUBLIC_KEY },
        body: JSON.stringify({ sessionId: sessionId.current, text }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        addMessage({ role: 'ASSISTANT', content: '⚠️ ' + (err.error || res.status) });
        return;
      }

      const data = await res.json();
      if (data.messageId) seenRef.current.add(data.messageId);
      setTimeout(poll, 400);
    } catch {
      addMessage({
        role: 'ASSISTANT',
        content: 'Üzgünüm, şu an bağlantı kuramadım. Lütfen biraz sonra tekrar deneyin.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSettings = () => {
    const current = getApiUrl();
    const next = window.prompt('Chatbot API adresi (tunnel URL):', current);
    if (next && next.trim()) {
      localStorage.setItem('chatApiUrl', next.trim());
      // Yeni endpoint için cursor/seen sıfırla ki geçmiş yeniden yüklensin
      afterRef.current = null;
      firstRef.current = true;
      seenRef.current = new Set();
    }
  };

  return (
    <>
      {/* Chat paneli */}
      <div
        className={`fixed bottom-24 left-6 z-50 flex flex-col w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl bg-white overflow-hidden transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
        }`}
        style={{ maxHeight: '70vh' }}
        role="dialog"
        aria-label="Chat"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-primary text-white px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 ring-2 ring-primary" />
            </div>
            <div>
              <p className="font-display font-bold text-sm leading-tight">Istanbul Auto Repair</p>
              <p className="text-xs text-gray-300 leading-tight">Çevrimiçi</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleSettings}
              className="p-1 rounded-md hover:bg-white/10 transition-colors"
              aria-label="API ayarı"
              title="API adresini güncelle"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Sohbeti kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mesaj listesi */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary">
          {messages.map((msg, i) => (
            <div
              key={msg.id ?? `local-${i}`}
              className={`flex ${msg.role === 'USER' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                  msg.role === 'USER'
                    ? 'bg-accent text-white rounded-br-sm'
                    : 'bg-white text-primary shadow-sm rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* "Yazıyor" göstergesi */}
          {isSending && (
            <div className="flex justify-start">
              <div className="bg-white text-primary shadow-sm rounded-2xl rounded-bl-sm px-3 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input alanı */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mesajınızı yazın..."
            autoComplete="off"
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!input.trim() || isSending}
            className="bg-accent hover:bg-accent-hover text-white p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Gönder"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Floating buton */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 left-6 z-50 bg-accent hover:bg-accent-hover text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label={isOpen ? 'Sohbeti kapat' : 'Sohbeti aç'}
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
      </button>
    </>
  );
}
