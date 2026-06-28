import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import TrustSignals from './components/TrustSignals';
import BookingForm from './components/BookingForm';
import LocationContact from './components/LocationContact';
import Footer from './components/Footer';
import StickyWhatsApp from './components/StickyWhatsApp';
import ChatWidget from './components/ChatWidget';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    // Intercept clicks on links to handle client-side routing
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        const url = new URL(anchor.href);
        const path = url.pathname;
        
        // If it's a hash link on the same page, let the browser handle it
        if (path === window.location.pathname && url.hash) {
          return;
        }

        if (path === '/admin' || path === '/admin/login' || path === '/') {
          e.preventDefault();
          window.history.pushState({}, '', url.pathname + url.search + url.hash);
          setCurrentPath(path);
          
          if (url.hash) {
            setTimeout(() => {
              const el = document.getElementById(url.hash.substring(1));
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            window.scrollTo(0, 0);
          }
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
    if (status) {
      window.history.pushState({}, '', '/admin');
      setCurrentPath('/admin');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    window.history.pushState({}, '', '/admin/login');
    setCurrentPath('/admin/login');
  };

  if (currentPath === '/admin/login') {
    if (isAuthenticated) {
      window.history.pushState({}, '', '/admin');
      setCurrentPath('/admin');
      return null;
    }
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (currentPath === '/admin') {
    if (!isAuthenticated) {
      window.history.pushState({}, '', '/admin/login');
      setCurrentPath('/admin/login');
      return null;
    }
    return <AdminPanel onLogout={handleLogout} />;
  }

  return (
    <div className="font-sans text-primary bg-secondary min-h-screen selection:bg-accent selection:text-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <TrustSignals />
        <BookingForm />
        <LocationContact />
      </main>
      <Footer />
      <StickyWhatsApp />
      <ChatWidget />
    </div>
  );
}
