import React from 'react';
import { Wrench, Settings, Disc, Activity, Wind, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'maintenance',
    title: 'Periodic Maintenance',
    description: 'Comprehensive oil changes, filter replacements, and fluid top-ups to keep your engine running smoothly.',
    icon: Settings,
    image: 'https://picsum.photos/seed/maintenance/800/600'
  },
  {
    id: 'engine',
    title: 'Engine Repair',
    description: 'Expert diagnostics and repair for all engine types. From minor fixes to complete overhauls.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'brakes',
    title: 'Brake System',
    description: 'Pad replacement, rotor resurfacing, and fluid flushes ensuring maximum stopping power and safety.',
    icon: Disc,
    image: 'https://images.unsplash.com/photo-1600661653561-629509216228?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'diagnostic',
    title: 'Diagnostic Check-up',
    description: 'State-of-the-art computer diagnostics to accurately identify and resolve complex electronic issues.',
    icon: Activity,
    image: 'https://picsum.photos/seed/diagnostic/800/600'
  },
  {
    id: 'ac',
    title: 'Air Conditioning',
    description: 'A/C recharge, leak detection, and compressor repair to keep you comfortable in Istanbul traffic.',
    icon: Wind,
    image: 'https://picsum.photos/seed/ac/800/600'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            Comprehensive Auto Services
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">
            From routine maintenance to complex repairs, our certified technicians use advanced equipment to get you back on the road safely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`group bg-secondary rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                index === 3 ? 'lg:col-span-2 lg:flex' : ''
              } ${index === 4 ? 'lg:col-span-1' : ''}`}
            >
              <div className={`relative overflow-hidden ${index === 3 ? 'lg:w-1/2' : 'h-48'}`}>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300"></div>
                <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className={`p-6 md:p-8 ${index === 3 ? 'lg:w-1/2 flex flex-col justify-center' : ''}`}>
                <h3 className="font-display text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <a href="#booking" className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors mt-auto">
                  Book Service <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
