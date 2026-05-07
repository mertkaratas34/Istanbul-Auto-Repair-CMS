import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-secondary/80 py-2 text-xs sm:text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex space-x-6">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-accent" />
              <span>Maslak, Istanbul</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-accent" />
              <span>Mon-Sat: 08:00 - 19:00</span>
            </div>
          </div>
          <div className="flex items-center font-medium text-secondary">
            <Phone className="w-4 h-4 mr-2 text-accent" />
            <a href="tel:+905551234567" className="hover:text-accent transition-colors">+90 555 123 45 67</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-secondary py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <a href="/" className="font-display font-bold text-2xl tracking-tighter text-primary">
                ISTANBUL<span className="text-accent">AUTO</span>
              </a>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 items-center">
              <a href="#services" className="text-primary hover:text-accent font-medium transition-colors">Services</a>
              <a href="#why-us" className="text-primary hover:text-accent font-medium transition-colors">Why Us</a>
              <a href="#location" className="text-primary hover:text-accent font-medium transition-colors">Location</a>
              <a 
                href="#booking" 
                className="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-md font-semibold transition-colors shadow-sm"
              >
                Online Appointment
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-primary hover:text-accent focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <a 
                href="#services" 
                className="block px-3 py-3 text-base font-medium text-primary hover:bg-gray-50 hover:text-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#why-us" 
                className="block px-3 py-3 text-base font-medium text-primary hover:bg-gray-50 hover:text-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Why Us
              </a>
              <a 
                href="#location" 
                className="block px-3 py-3 text-base font-medium text-primary hover:bg-gray-50 hover:text-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Location
              </a>
              <div className="pt-4 px-3">
                <a 
                  href="#booking" 
                  className="block w-full text-center bg-accent text-white px-4 py-3 rounded-md font-semibold shadow-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Online Appointment
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
