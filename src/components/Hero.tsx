import React from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative bg-primary text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2070&auto=format&fit=crop" 
          alt="Professional Car Repair Workshop" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <ShieldCheck className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium tracking-wide uppercase">Istanbul's Premier Auto Center</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Professional Car Care in the <span className="text-accent">Heart of Istanbul.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-xl font-sans leading-relaxed">
              Expert diagnostics, precision repairs, and transparent pricing. Trust your vehicle to certified technicians who care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#booking" 
                className="inline-flex justify-center items-center bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-md font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-accent/30"
              >
                Book Appointment
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="tel:+905551234567" 
                className="inline-flex justify-center items-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-md font-bold text-lg transition-all"
              >
                Call Now
              </a>
            </div>
          </motion.div>
          
          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            <div>
              <p className="font-display text-3xl font-bold text-white">15+</p>
              <p className="text-sm text-gray-400 mt-1">Years Experience</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-white">10k+</p>
              <p className="text-sm text-gray-400 mt-1">Cars Repaired</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-white">100%</p>
              <p className="text-sm text-gray-400 mt-1">Satisfaction</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
