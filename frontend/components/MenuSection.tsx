import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { MenuItem, MenuCategory } from '../types';
import { 
  ChevronRight, ChevronLeft, Sparkles, UtensilsCrossed, 
  Wine, Coffee, Beer, Sandwich, Flame, X, 
  ArrowRight, Award, Star, AlertCircle
} from 'lucide-react';

interface MenuSectionProps {
  items: MenuItem[];
  onReserve?: () => void; // Prop to trigger the global reservation modal
}

const MenuSection: React.FC<MenuSectionProps> = ({ items, onReserve }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const categoryMap = [
    { label: 'Starters', icon: <UtensilsCrossed size={16} />, types: [MenuCategory.APPETIZERS] },
    { label: 'Meat Dishes', icon: <Flame size={16} />, types: [MenuCategory.MAINS_MEAT] },
    { label: 'Vegan & Veg', icon: <Sandwich size={16} />, types: [MenuCategory.VEGAN] },
    { label: 'Platters', icon: <Sparkles size={16} />, types: [MenuCategory.COMBOS] },
    { label: 'Wines', icon: <Wine size={16} />, types: [MenuCategory.RED_WINES, MenuCategory.WHITE_WINES] },
    { label: 'Spirits & Beer', icon: <Beer size={16} />, types: [MenuCategory.SPIRITS, MenuCategory.BEERS] },
    { label: 'Soft & Hot', icon: <Coffee size={16} />, types: [MenuCategory.SOFT_DRINKS, MenuCategory.HOT_DRINKS] },
    { label: 'Desserts', icon: <Sparkles size={16} />, types: [MenuCategory.DESSERTS] },
  ];

  const [selectedTab, setSelectedTab] = useState(categoryMap[0].label);
  const [currentPage, setCurrentPage] = useState(0);
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null);
  const itemsPerPage = 6; 
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to format price and prevent crashes
  const formatPrice = (price: any) => {
    const num = Number(price);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTab]);

  const filteredItems = useMemo(() => {
    const activeConfig = categoryMap.find(c => c.label === selectedTab);
    if (!activeConfig) return [];
    
    // Filter by category and sort so available items appear first
    return items
      .filter(item => activeConfig.types.includes(item.category))
      .sort((a, b) => (a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1));
  }, [items, selectedTab]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleReserveClick = () => {
    setDetailItem(null);
    if (onReserve) {
      onReserve();
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="menu" ref={containerRef} className="py-32 bg-offWhite relative overflow-hidden scroll-mt-24">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-gold-400"></span>
              <span className="text-gold-600 uppercase tracking-[0.6em] font-black text-[10px]">Culinary Collection</span>
              <span className="w-12 h-px bg-gold-400"></span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-slate-950 italic leading-none mb-8">
              The <span className="text-gold-500">Menu.</span>
            </h2>
            <p className="text-slate-400 text-sm font-light uppercase tracking-[0.4em]">Heritage Flavors Since 1993</p>
          </motion.div>
        </div>

        <div className="mb-20 overflow-x-auto no-scrollbar border-b border-slate-100 flex justify-center">
          <div className="flex gap-10 px-6 pb-6">
            {categoryMap.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedTab(cat.label)}
                className={`group flex flex-col items-center gap-4 transition-all relative ${
                  selectedTab === cat.label ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-70'
                }`}
              >
                <div className={`p-4 rounded-2xl transition-all duration-500 ${
                  selectedTab === cat.label ? 'bg-slate-950 text-gold-400 shadow-xl' : 'bg-white text-slate-400'
                }`}>
                  {cat.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap ${
                  selectedTab === cat.label ? 'text-slate-950' : 'text-slate-400'
                }`}>
                  {cat.label}
                </span>
                {selectedTab === cat.label && (
                  <motion.div layoutId="menuActive" className="absolute -bottom-6 w-full h-0.5 bg-gold-500 shadow-lg" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[600px] mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedTab}-${currentPage}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
            >
              {paginatedItems.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  layoutId={`item-container-${item.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setDetailItem(item)}
                  className={`flex items-center gap-6 md:gap-8 p-6 md:p-8 bg-white rounded-[2.5rem] border border-slate-100 transition-all group relative overflow-hidden cursor-pointer active:scale-95 ${
                    !item.isAvailable ? 'opacity-60' : 'hover:border-gold-500/30 hover:shadow-2xl'
                  }`}
                >
                  <div className="w-28 h-28 md:w-36 md:h-36 shrink-0 rounded-[2rem] overflow-hidden shadow-lg border border-slate-50 relative">
                    <motion.img 
                      layoutId={`item-image-${item.id}`}
                      src={item.image || '/img/placeholder-food.jpg'} 
                      alt={item.name} 
                      className={`w-full h-full object-cover transition-all duration-1000 ${
                        !item.isAvailable ? 'grayscale' : 'grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110'
                      }`} 
                    />
                    {!item.isAvailable && (
                      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                        <span className="text-[8px] font-black text-white uppercase tracking-widest bg-rose-600 px-3 py-1 rounded-full shadow-lg">Sold Out</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <motion.h4 layoutId={`item-name-${item.id}`} className="text-lg md:text-xl font-serif font-bold text-slate-950 group-hover:text-gold-600 transition-colors leading-tight">
                        {item.name}
                      </motion.h4>
                      <motion.div layoutId={`item-price-${item.id}`} className="text-gold-600 font-black text-base md:text-lg tracking-tighter whitespace-nowrap">
                        £{formatPrice(item.price)}
                      </motion.div>
                    </div>
                    <p className="text-slate-400 text-[10px] md:text-xs leading-relaxed font-light italic line-clamp-2 pr-4">
                      {item.description}
                    </p>
                    <div className="flex gap-2 items-center">
                       {item.chefTip && item.isAvailable && (
                        <div className="flex items-center gap-1.5 text-gold-500 text-[8px] font-black uppercase tracking-widest bg-gold-50 px-2 py-1 rounded-lg w-fit border border-gold-100">
                          <Star size={10} className="fill-gold-500" /> Favorite
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-12 pt-12 border-t border-slate-100">
            <div className="flex items-center gap-10">
              <button 
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 hover:text-slate-950 disabled:opacity-0 transition-all"
              >
                <div className="p-4 rounded-full border border-slate-100 group-hover:bg-slate-50">
                  <ChevronLeft size={16} /> 
                </div>
                <span>Prev</span>
              </button>

              <div className="flex gap-3">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentPage(i)}
                    className={`h-1.5 transition-all duration-700 rounded-full ${
                      currentPage === i ? 'w-12 bg-gold-500 shadow-[0_0_15px_rgba(184,146,34,0.3)]' : 'w-3 bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 hover:text-slate-950 disabled:opacity-0 transition-all"
              >
                <span>Next</span>
                <div className="p-4 rounded-full border border-slate-100 group-hover:bg-slate-50">
                  <ChevronRight size={16} />
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {detailItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" onClick={() => setDetailItem(null)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
            
            <motion.div 
              layoutId={`item-container-${detailItem.id}`}
              className="relative bg-white w-full max-w-lg md:max-w-xl rounded-[3.5rem] shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full relative h-64 md:h-72 bg-slate-900 shrink-0">
                <motion.img 
                  layoutId={`item-image-${detailItem.id}`}
                  src={detailItem.image || '/img/placeholder-food.jpg'} 
                  alt={detailItem.name} 
                  className={`w-full h-full object-cover ${!detailItem.isAvailable && 'grayscale brightness-50'}`}
                />
                <button onClick={() => setDetailItem(null)} className="absolute top-6 right-6 p-3 bg-white/20 hover:bg-white/40 backdrop-blur text-white rounded-full"><X size={18} /></button>
                {!detailItem.isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-rose-600 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl flex items-center gap-2">
                       <AlertCircle size={16} /> Sold Out
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 md:p-12 flex flex-col gap-8 overflow-y-auto bg-white">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <motion.h3 layoutId={`item-name-${detailItem.id}`} className="text-3xl md:text-4xl font-serif font-bold text-slate-950 italic">{detailItem.name}</motion.h3>
                    <motion.div layoutId={`item-price-${detailItem.id}`} className="text-gold-600 font-serif text-2xl font-black italic">£{formatPrice(detailItem.price)}</motion.div>
                  </div>
                  <div className="h-px w-20 bg-gold-400/30"></div>
                </div>

                <div className="space-y-6">
                  <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed italic">{detailItem.description}</p>
                  
                  {detailItem.chefTip && detailItem.isAvailable && (
                    <div className="bg-gold-50 p-6 rounded-[1.5rem] border border-gold-100/50 flex items-start gap-4">
                       <Sparkles size={20} className="text-gold-500 shrink-0 mt-1" />
                       <div className="space-y-1">
                          <span className="text-[8px] font-black uppercase tracking-widest text-gold-600">Chef's Recommendation</span>
                          <p className="text-slate-900 font-serif italic text-sm md:text-base leading-snug">{detailItem.chefTip}</p>
                       </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex gap-4">
                  <button onClick={() => setDetailItem(null)} className="flex-1 py-4 border border-slate-100 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-50">Close</button>
                  {detailItem.isAvailable ? (
                    <button onClick={handleReserveClick} className="flex-[2] py-4 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-[0.4em] text-[9px] shadow-xl hover:bg-gold-500 hover:text-slate-950 transition-all flex items-center justify-center gap-3">Reserve Table <ArrowRight size={14} /></button>
                  ) : (
                    <div className="flex-[2] py-4 bg-slate-100 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[9px] text-center border border-slate-200">Currently Unavailable</div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MenuSection;