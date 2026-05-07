import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export default function LocationContact() {
  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Visit Our Workshop
            </h2>
            <div className="w-16 h-1 bg-accent mb-8"></div>
            <p className="text-gray-600 text-lg mb-10">
              Conveniently located in Maslak, the heart of Istanbul's automotive district. Drop by for a consultation or scheduled service.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-primary mb-2">Location</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Maslak Mahallesi, Ahi Evran Caddesi No: 15<br />
                    Sarıyer, Istanbul 34398<br />
                    Turkey
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-primary mb-2">Working Hours</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li className="flex justify-between w-48"><span>Mon - Fri:</span> <span>08:00 - 19:00</span></li>
                    <li className="flex justify-between w-48"><span>Saturday:</span> <span>09:00 - 16:00</span></li>
                    <li className="flex justify-between w-48 text-gray-400"><span>Sunday:</span> <span>Closed</span></li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-primary mb-2">Contact</h3>
                  <p className="text-gray-600 mb-1">
                    <a href="tel:+905551234567" className="hover:text-accent transition-colors">+90 555 123 45 67</a>
                  </p>
                  <p className="text-gray-600">
                    <a href="mailto:info@istanbulauto.com" className="hover:text-accent transition-colors">info@istanbulauto.com</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a 
                href="https://wa.me/905551234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-md font-bold text-lg transition-colors shadow-md"
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                WhatsApp Support
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] lg:h-auto min-h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3006.183063853112!2d29.02058427656911!3d41.1086259132514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab5e9e51b6a71%3A0x6b4a625121f1585!2sMaslak%2C%20Sar%C4%B1yer%2F%C4%B0stanbul!5e0!3m2!1sen!2str!4v1709641234567!5m2!1sen!2str" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Istanbul Auto Repair Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
