
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-32 bg-white scroll-mt-24 overflow-hidden relative">
      {/* Subtle brand texture background */}
      <div className="absolute inset-0 bg-grid-white opacity-40"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2 space-y-10"
          >
            <div className="inline-block">
              <span className="text-brandRed-500 uppercase tracking-[0.4em] font-black text-[10px] border-b-2 border-brandRed-500/30 pb-1">Our Story</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-brandRed-950 leading-[1.1] tracking-tight">
              Exceptional <br/>
              <span className="italic text-brandRed-500">Dining.</span>
            </h2>
            <div className="space-y-6 max-w-xl">
              <p className="text-brandRed-900/70 leading-relaxed text-lg font-light italic">
             Home of Ethiopian cuisine in London serving you the best home-style Ethiopian food since 1993. Lalibela is one of the best Ethiopian restaurants present in London. An aesthetically pleasing selection of interior and artwork portray Ethiopia’s culture, and the scrumptious food and relaxing environment will definitely force you to keep coming back for more. The attentive and friendly staff of Lalibela is always there to help you with a selection of food and an understanding of the menu.               </p>
              <p className="text-brandRed-900/70 leading-relaxed text-base font-light">
             Whether you are looking for vegetarian or non-vegetarian food, the lovely dishes prepared at the restaurant will allow you a chance to experience a tasteful, original, and distinctive dine-in. Each dish is served in a fascinating manner, which makes you feel your presence in the highlands of Ethiopia. So whether you intend to organize a party, a get-together, or wish to plan a corporate lunch/dinner, Lalibela Ethiopian Restaurant will, beyond doubt, satisfy you and your guests. The restaurant is located in Archway, London.              </p>
            </div>
            
            <div className="pt-4">
              <a 
                href="#experience"
                className="inline-flex items-center gap-6 text-brandRed-950 font-black uppercase tracking-[0.3em] text-[10px] hover:text-brandRed-500 transition-all group"
              >
                <span className="group-hover:translate-x-2 transition-transform duration-500">The Experience</span> 
                <div className="h-px w-16 bg-brandRed-950/20 group-hover:bg-brandRed-500 group-hover:w-24 transition-all duration-500"></div>
              </a>
            </div>
          </motion.div>
          
          <div className="lg:w-1/2 relative w-full mt-20 lg:mt-0 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-[3/4]">
              
              {/* Primary Background Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 60 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-[85%] h-[90%] overflow-hidden rounded-[2.5rem] shadow-2xl border border-brandRed-100/50"
              >
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 4 }}
                  src="/img/Lalibela entrance.jpg" 
                  alt="Lalibela Atmosphere" 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/img/Lalibela entrance.jpeg';
                  }}
                />
              </motion.div>

              {/* Secondary Image - Removed white box framing, now floating with deep shadow */}
              <motion.div 
                initial={{ opacity: 0, x: 60, y: 60 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-8 -right-4 lg:-right-12 z-20 w-[65%] aspect-[4/3] group rounded-[2rem] overflow-hidden shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)] border border-white/20"
              >
                <motion.img 
                  src="/img/bar1.jpeg" 
                  alt="Traditional Detail" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/img/bar1.jpeg';
                  }}
                />
                <div className="absolute top-6 left-6 bg-gold-400/90 backdrop-blur-md text-slate-950 p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles size={16} />
                </div>
              </motion.div>

              {/* Vertical Label */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 0.2, x: 0 }}
                viewport={{ once: false }}
                className="absolute -left-16 top-1/2 -translate-y-1/2 hidden xl:block"
              >
                <p className="rotate-180 [writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-[1em] text-brandRed-950">
                  Lalibela • Authentic • Est. 1993
                </p>
              </motion.div>

              {/* Decorative Accent: Geometric frame */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                className="absolute -top-12 -left-12 w-48 h-48 border-t-2 border-l-2 border-brandRed-500/10 rounded-tl-[4rem] -z-10"
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
