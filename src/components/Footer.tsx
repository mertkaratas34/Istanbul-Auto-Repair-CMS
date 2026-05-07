import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-300 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}~
          <div className="col-span-1 lg:col-span-1">
            <a href="#" className="font-display font-bold text-2xl tracking-tighter text-white mb-6 block">
              ISTANBUL<span className="text-accent">AUTO</span>
            </a>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Premium automotive repair and maintenance services in Istanbul. We combine expertise with advanced technology to deliver exceptional care for your vehicle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="hover:text-accent transition-colors">Our Services</a></li>
              <li><a href="#why-us" className="hover:text-accent transition-colors">Why Choose Us</a></li>
              <li><a href="#booking" className="hover:text-accent transition-colors">Book Appointment</a></li>
              <li><a href="#location" className="hover:text-accent transition-colors">Location & Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-accent transition-colors">Periodic Maintenance</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Engine Diagnostics & Repair</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Brake System Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Transmission Repair</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">A/C Service & Repair</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-accent mr-3 shrink-0 mt-1" />
                <span>Maslak Mah. Ahi Evran Cad. No:15<br />Sarıyer, Istanbul</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-accent mr-3 shrink-0" />
                <a href="tel:+905551234567" className="hover:text-white transition-colors">+90 555 123 45 67</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-accent mr-3 shrink-0" />
                <a href="mailto:info@istanbulauto.com" className="hover:text-white transition-colors">info@istanbulauto.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Istanbul Auto Repair. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="/admin" className="hover:text-white transition-colors">Admin Login</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
