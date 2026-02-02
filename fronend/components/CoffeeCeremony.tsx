import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Flame, Wind } from 'lucide-react';

const CoffeeCeremony: React.FC = () => {
  const steps = [
    { icon: <Flame />, title: "Roasting", text: "Fresh green beans are roasted over hot coals until they crackle and shine." },
    { icon: <Wind />, title: "The Aroma", text: "The pan is brought to guests to enjoy the spirit of the roast." },
    { icon: <Coffee />, title: "The Pour", text: "Brewed in a clay Jebena, poured gracefully from a height." }
  ];

  const stepContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const stepItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      // Fixed: added 'as const' to ensure 'ease' matches the required Easing literal type
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section id="experience" className="py-24 bg-slate-50 relative scroll-mt-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -100, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:w-1/2 relative order-2 lg:order-1"
          >
            <div className="absolute -top-6 -right-6 w-full h-full border border-gold-400/20 rounded-full animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1594488331164-9f796a40c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Traditional Coffee Ceremony" 
              className="relative z-10 w-full aspect-square object-cover rounded-full shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>

          <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h2 className="text-gold-600 uppercase tracking-widest font-semibold text-sm">Sacred Tradition</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">The Art of the Coffee Ceremony</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Coffee isn't just a drink in Ethiopia; it's a bridge between souls. Our traditional ceremony is performed daily, filling the house with the scent of frankincense and freshly roasted beans.
              </p>
            </motion.div>

            <motion.div 
              variants={stepContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="grid gap-6"
            >
              {steps.map((step, i) => (
                <motion.div 
                  key={i} 
                  variants={stepItemVariants}
                  className="flex gap-4 p-4 bg-white rounded shadow-sm border-l-4 border-gold-500 hover:shadow-md transition-shadow cursor-default"
                >
                  <div className="text-gold-500 shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-slate-500">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoffeeCeremony;