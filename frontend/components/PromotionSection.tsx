import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Sparkles, ArrowRight, Star, Clock } from 'lucide-react';
import { MarketingPost } from '../types';

interface PromotionSectionProps {
  posts: MarketingPost[];
}

const PromotionSection: React.FC<PromotionSectionProps> = ({ posts }) => {
  // Only show posts explicitly set to 'live' in the Admin Panel
  const livePosts = posts.filter(p => p.status === 'live');

  if (livePosts.length === 0) return null;

  return (
    <section className="py-24 bg-slate-950 overflow-hidden relative border-y border-white/5">
      {/* Premium Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <span className="w-8 h-px bg-gold-500"></span>
              <span className="text-gold-500 uppercase tracking-[0.6em] font-black text-[9px]">The Collection</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
              Seasonal <span className="italic text-gold-400">Spotlights.</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:flex flex-col items-end"
          >
            <div className="flex gap-1 mb-2">
               {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-gold-400 text-gold-400" />)}
            </div>
            <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">Curated Heritage Experiences</p>
          </motion.div>
        </div>

        <div className="grid gap-10">
          {livePosts.map((post, idx) => (
            <motion.div 
              key={(post as any)._id || post.id} // Updated key for MongoDB compatibility
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white/5 rounded-[2rem] overflow-hidden border border-white/10 flex flex-col lg:flex-row h-auto lg:h-[400px] hover:border-gold-500/30 transition-all duration-500"
            >
              {/* Image Side - Now using REAL DB DATA */}
              <div className="w-full lg:w-2/5 relative overflow-hidden p-6">
                <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
                  <img 
                    // Point to the live image from the database
                    src={post.image || '/img/placeholder-promo.jpg'} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
                    onError={(e) => {
                      // Fallback if the database image URL is broken
                      (e.target as HTMLImageElement).src = '/img/img5.jpg'; 
                    }}
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] pointer-events-none"></div>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="flex-1 p-10 lg:p-14 flex flex-col justify-center">
                <div className="mb-6 flex items-center gap-3">
                  <div className="px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 flex items-center gap-2">
                    <Sparkles size={10} />
                    <span className="text-[8px] font-black uppercase tracking-widest">Premium Selection</span>
                  </div>
                  <div className="text-white/20 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <Clock size={10} /> Limited Time
                  </div>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-serif text-white mb-6 italic group-hover:text-gold-400 transition-colors">
                  {post.title}
                </h3>
                
                {/* Preserve line breaks from the textarea in the caption */}
                <p className="text-white/60 text-sm lg:text-base leading-relaxed mb-8 font-light max-w-xl whitespace-pre-wrap">
                  {post.caption}
                </p>

                <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-white/5">
                  <a 
                    href="https://www.instagram.com/lalibela_resturant_uk/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gold-500 hover:text-white transition-all text-[9px] font-black uppercase tracking-[0.3em] group/link"
                  >
                    <Instagram size={14} className="group-hover/link:rotate-12 transition-transform" /> 
                    Reserve Experience
                  </a>
                  
                  <div className="ml-auto flex items-center gap-4">
                    <span className="text-[8px] text-white/20 font-black uppercase tracking-widest hidden md:block">Ref. {idx + 1}</span>
                    <button className="w-12 h-12 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-gold-400 hover:text-slate-950 hover:border-gold-400 transition-all group/btn shadow-xl">
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Decorative Accent */}
              <div className="absolute top-8 right-8 text-gold-500/5 font-serif italic text-4xl select-none group-hover:text-gold-500/10 transition-colors">
                Lalibela
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 flex items-center justify-center gap-4 text-white/10"
        >
          <div className="w-12 h-px bg-white/5"></div>
          <Sparkles size={12} />
          <div className="w-12 h-px bg-white/5"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromotionSection;