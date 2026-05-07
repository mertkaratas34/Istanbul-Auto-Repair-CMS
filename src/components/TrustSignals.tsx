import React from 'react';
import { Award, ShieldCheck, Banknote, Cpu } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Certified Technicians',
    description: 'Our team consists of highly trained professionals with years of experience in European and Asian vehicles.'
  },
  {
    icon: ShieldCheck,
    title: '1-Year Warranty',
    description: 'We stand behind our work. All parts and labor come with a comprehensive 12-month or 10,000 km warranty.'
  },
  {
    icon: Banknote,
    title: 'Transparent Pricing',
    description: 'No hidden fees or surprise charges. We provide detailed estimates before any work begins.'
  },
  {
    icon: Cpu,
    title: 'Advanced Equipment',
    description: 'We utilize the latest diagnostic tools and technology to accurately identify and fix issues the first time.'
  }
];

export default function TrustSignals() {
  return (
    <section id="why-us" className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Why Choose Us for Your <span className="text-accent">Auto Repair</span> Needs?
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We understand that finding a trustworthy mechanic in Istanbul can be challenging. That's why we've built our business on a foundation of honesty, expertise, and customer satisfaction.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 border border-white/20">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=1000&auto=format&fit=crop" 
                alt="Mechanic working on a car" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-bold text-2xl text-white">4.9</span>
                  </div>
                  <div>
                    <div className="flex text-accent mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-white font-medium">Based on 500+ Google Reviews</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-full blur-2xl opacity-50 z-[-1]"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 z-[-1]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
