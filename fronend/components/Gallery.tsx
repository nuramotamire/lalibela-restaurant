import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Instagram, Camera, Sparkles } from 'lucide-react';

const Gallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{url: string, alt: string} | null>(null);
  
  // Mapping local images from /img and /menu folders
  const images = useMemo(() => {
    const list = [
      { url: '/img/Lalibela entrance.jpg', alt: 'The Grand Entrance' },
      { url: '/img/img1.jpeg', alt: 'Heritage Atmosphere' },
      { url: '/img/img2.jpeg', alt: 'Traditional Table Setting' },
      { url: '/img/img3.jpeg', alt: 'Culinary Craft' },
      { url: '/img/img4.jpeg', alt: 'Authentic Decor' },
      { url: '/img/img5.jpeg', alt: 'The Village Room' },
      { url: '/img/img6.jpeg', alt: 'Sacred Spaces' },
      { url: '/img/img7.jpeg', alt: 'Evening Glow' },
      { url: '/img/bar2.jpeg', alt: 'Artisanal Spices' },
      { url: '/img/img9.jpeg', alt: 'Guest Moments' },
      { url: '/img/bar1.jpeg', alt: 'Lalibela Spirits' },
      { url: '/img/img10.jpeg', alt: 'Traditional Dance' },
      { url: '/img/img11.jpeg', alt: 'Coffee Ceremony' },
      { url: '/img/img12.jpeg', alt: 'The Sanctuary' },
      // FIXED: Removed the invalid '/img/.jpeg' entry and replaced with valid entry or placeholder
      { url: '/img/img13.jpeg', alt: 'Ancient Traditions' }, 
      { url: '/img/img14.jpeg', alt: 'Modern Elegance' },
      { url: '/img/bar3.jpeg', alt: 'Lalibela Spirits' },
     
      // Menu photography
      { url: '/menu/injera.jpeg', alt: 'Injera & Stews' },
      { url: '/menu/beyaynet.jpeg', alt: 'Beyaynetu' },
      { url: '/menu/coffee.jpeg', alt: 'Coffee Ceremony - Menu' },
      { url: '/menu/kitfo.jpg', alt: 'Kitfo' },
    ];
    return list;
  }, []);

  const featuredImages = useMemo(() => images.slice(0, 5), [images]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredImages.length]);

  return (
    <section id="gallery" className="bg-white py-32 scroll-mt-24 overflow-hidden relative">
      {/* Texture Layer */}
      <div className="absolute inset-0 bg-grid-white opacity-40 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-px bg-gold-400"></span>
              <span className="text-gold-600 uppercase tracking-[0.6em] font-black text-[9px]">Visual Narrative</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-brandRed-950 italic leading-none">
              A Glimpse Into <br/>
              <span className="text-gold-500">Our World.</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-end gap-4"
          >
            <a 
              href="https://www.instagram.com/lalibela_resturant_uk/" 
              target="_blank"
              className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-950 transition-all"
            >
              Follow Our Journey <Instagram size={16} className="group-hover:rotate-12 transition-transform" />
            </a>
            <div className="flex gap-1">
               {[...Array(5)].map((_, i) => <Sparkles key={i} size={8} className="text-gold-400" />)}
            </div>
          </motion.div>
        </div>

        {/* Premium Slideshow */}
        <div className="relative h-[500px] md:h-[750px] mb-24 rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white group/slider">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={featuredImages[activeIndex].url}
                alt={featuredImages[activeIndex].alt}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  // FIXED: Replaced broken Unsplash link with reliable placeholder
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80`;
                }}
              />
              {/* Cinematic Scrims */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none"></div>
            </motion.div>
          </AnimatePresence>
          
          {/* Slideshow Content */}
          <div className="absolute bottom-16 left-16 text-left text-white z-10 max-w-xl">
             <motion.div 
               key={`meta-${activeIndex}`}
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }}
               className="space-y-4"
             >
                <div className="flex items-center gap-3">
                   <Camera size={14} className="text-gold-400" />
                   <span className="text-[10px] font-black uppercase tracking-[0.6em] text-gold-400/80">Lalibela Archives</span>
                </div>
                <h4 className="text-4xl md:text-5xl font-serif italic drop-shadow-lg">{featuredImages[activeIndex].alt}</h4>
                <div className="flex items-center gap-10 pt-4">
                   <button 
                     onClick={() => setSelectedImage(featuredImages[activeIndex])}
                     className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] hover:text-gold-400 transition-colors"
                   >
                     View Full Resolution <Maximize2 size={12} />
                   </button>
                </div>
             </motion.div>
          </div>

          {/* Nav Controls */}
          <div className="absolute bottom-16 right-16 flex items-center gap-8 z-10">
            <div className="flex gap-4">
              {featuredImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="relative h-1 w-12 bg-white/10 rounded-full overflow-hidden"
                >
                  {i === activeIndex && (
                    <motion.div 
                      layoutId="activeProgress"
                      className="absolute inset-0 bg-gold-500 shadow-[0_0_15px_rgba(184,146,34,0.5)]"
                      initial={{ x: '-100%' }}
                      animate={{ x: '0%' }}
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
               <button 
                 onClick={() => setActiveIndex((prev) => (prev - 1 + featuredImages.length) % featuredImages.length)}
                 className="p-4 bg-white/5 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-slate-950 transition-all border border-white/10"
               >
                 <ChevronLeft size={20} />
               </button>
               <button 
                 onClick={() => setActiveIndex((prev) => (prev + 1) % featuredImages.length)}
                 className="p-4 bg-white/5 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-slate-950 transition-all border border-white/10"
               >
                 <ChevronRight size={20} />
               </button>
            </div>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {images.map((img, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (index % 4) * 0.1 }}
              onClick={() => setSelectedImage(img)}
              className="relative overflow-hidden group rounded-[2.5rem] break-inside-avoid shadow-xl cursor-pointer bg-slate-50 border border-slate-100"
            >
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-auto object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0" 
                onError={(e) => {
                  // FIXED: Replaced broken Unsplash URL with a stable one
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80`;
                }}
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
                <div className="p-4 rounded-full border border-white/20 mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <Maximize2 size={20} className="text-white" />
                </div>
                <p className="text-white font-serif italic text-lg mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">{img.alt}</p>
                <span className="text-gold-400 text-[8px] font-black uppercase tracking-[0.4em] translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-150">Lalibela Moment</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Premium Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-slate-950/98 backdrop-blur-2xl"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-10 right-10 p-4 bg-white/5 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 z-[110]"
            >
              <X size={24} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-7xl h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.alt} 
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                onError={(e) => {
                  // FIXED: Stable fallback for full-resolution view
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80`;
                }}
              />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center space-y-2 pointer-events-none">
                <h3 className="text-white text-3xl font-serif italic drop-shadow-xl">{selectedImage.alt}</h3>
                <p className="text-gold-500 text-[10px] font-black uppercase tracking-[0.6em]">Authentic Heritage Captured</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;