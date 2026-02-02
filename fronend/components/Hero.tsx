
import React, { useState, useEffect } from 'react';
import { Utensils, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  onReserve: () => void;
}

const Hero: React.FC<HeroProps> = ({ onReserve }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const slides = [
    { type: 'image', url: '/img/bar1.jpeg', alt: 'The Grand Entrance', location: 'London NW5' },
    { type: 'image', url: '/img/interior.jpg', alt: 'Artisanal Culinary Craft', location: 'The Dining Room' },
    { type: 'image', url: '/img/Lalibela entrance.jpg', alt: 'Authentic Heritage', location: 'Village Hall' },
    { type: 'image', url: '/img/traditional.jpg', alt: 'Sophisticated Ambiance', location: 'The Sanctuary' },
    { type: 'image', url: '/img/bar3.jpeg', alt: 'Sophisticated Ambiance', location: 'The Sanctuary' },
    { type: 'image', url: '/img/bar4.jpeg', alt: 'The Spice Journey', location: 'Chef\'s Table' }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="top" className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-slate-950">
      {/* BACKGROUND SYSTEM */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentSlideIndex ? 1 : 0,
              scale: index === currentSlideIndex ? 1.05 : 1.15
            }}
            transition={{ 
              opacity: { duration: 2.5, ease: [0.4, 0, 0.2, 1] },
              scale: { duration: 10, ease: "linear" } 
            }}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <img
              src={slide.url}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
              style={{ filter: 'contrast(1.05) brightness(0.7)' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/img/bar1.jpeg';
              }}
            />
          </motion.div>
        ))}

        {/* ADAPTIVE OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/40 z-10"></div>
      </div>

      {/* HERO CONTENT */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20 h-full flex flex-col justify-center items-center">
        <div className="max-w-6xl w-full text-center">
          
          {/* Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-6 md:mb-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse"></span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.6em] font-black text-white/90">Welcome</span>
            </div>
          </motion.div>

          {/* Main Title - Responsive for all mobile screens */}
          <div className="relative mb-6 md:mb-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            >
              <h1 className="text-white font-serif text-[clamp(3.5rem,15vw,14rem)] leading-[0.85] tracking-tighter drop-shadow-2xl">
                LALIBELA
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 1.2 }}
              className="hidden md:block absolute -top-10 left-[62%]"
            >
              <span className="text-gold-500 font-serif italic text-4xl drop-shadow-lg">Since 1993</span>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="max-w-2xl mx-auto mb-12 md:mb-16 px-4"
          >
            <p className="text-lg md:text-3xl font-serif text-white/95 leading-relaxed italic tracking-wide">
              The soul of <span className="text-gold-400 font-bold">Habesha</span> hospitality, <br className="hidden md:block" />
              where ancient flavors find a refined modern stage.
            </p>
          </motion.div>

          {/* Action Suite - Vertically stacked for small mobile, horizontal for larger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8"
          >
            <button
              onClick={onReserve}
              className="group relative w-full sm:w-auto px-10 py-5 md:px-14 md:py-6 bg-gold-500 text-slate-950 font-black uppercase tracking-[0.4em] text-[10px] md:text-[11px] rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl"
            >
              <div className="relative flex items-center justify-center gap-4">
                <Calendar size={14} />
                <span>Reserve Table</span>
              </div>
            </button>

            <a
              href="#menu"
              className="w-full sm:w-auto px-10 py-5 md:px-14 md:py-6 border border-white/30 text-white font-black uppercase tracking-[0.4em] text-[10px] md:text-[11px] rounded-full transition-all hover:bg-white hover:text-slate-950 backdrop-blur-sm active:scale-95 flex items-center justify-center gap-4"
            >
              <Utensils size={14} />
              <span>The Menu</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* LUXURY UI ELEMENTS - MOBILE OPTIMIZED */}
      <div className="absolute left-6 bottom-8 md:left-12 md:bottom-12 z-30 flex flex-col gap-1">
        <motion.div 
          key={currentSlideIndex}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-px bg-gold-500"></div>
          <span className="text-white font-serif italic text-base md:text-lg">{slides[currentSlideIndex].alt}</span>
        </motion.div>
        <div className="flex items-center gap-2 ml-11">
          <MapPin size={10} className="text-gold-500" />
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/40 font-black">{slides[currentSlideIndex].location}</span>
        </div>
      </div>

      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlideIndex(i)}
            className={`transition-all duration-700 ${
              i === currentSlideIndex 
                ? 'w-1 h-16 md:h-20 bg-gold-500 shadow-[0_0_15px_rgba(184,146,34,0.5)]' 
                : 'w-0.5 h-4 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
