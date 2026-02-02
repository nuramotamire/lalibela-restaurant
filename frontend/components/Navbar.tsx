import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ChevronRight, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  onReserve: () => void;
  // onStaffAccess is no longer needed as a prop because we use the /admin route
}

const Navbar: React.FC<NavbarProps> = ({ onReserve }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);

    // If we are not on the home page, go home first
    if (location.pathname !== '/') {
      navigate('/');
      // Small timeout to allow the home page to mount before scrolling
      setTimeout(() => scrollToElement(id), 100);
    } else {
      scrollToElement(id);
    }
  };

  const scrollToElement = (id: string) => {
    const targetId = id.replace('#', '');
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const navLinks = [
    { name: 'About', href: '#philosophy' },
    { name: 'Menu', href: '#menu' },
    { name: 'Experience', href: '#experience' },
    { name: 'Spaces', href: '#environments' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-700 ease-in-out ${
      scrolled || isOpen
        ? 'bg-white/95 backdrop-blur-xl py-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border-b border-slate-200/40' 
        : 'bg-transparent py-8'
    }`}>
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center shrink-0">
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== '/') navigate('/');
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="relative transition-transform hover:scale-105 active:scale-95"
          >
            <img 
              src="/img/logoo.png" 
              alt="Lalibela Logo" 
              className={`h-9 md:h-12 w-auto object-contain transition-all duration-700 ${scrolled || isOpen ? 'brightness-100' : 'brightness-0 invert'}`}
            />
          </a>
        </div>

        {/* Desktop Navigation Pill */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
          <div className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-700 border ${
            scrolled 
              ? 'bg-slate-100/50 border-slate-200/50' 
              : 'bg-white/10 backdrop-blur-md border-white/20'
          }`}>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-5 py-2.5 font-black text-[9px] uppercase tracking-[0.3em] transition-all relative group ${
                  scrolled ? 'text-slate-900 hover:text-brandRed-500' : 'text-white hover:text-gold-400'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                <motion.span 
                  className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-4 ${
                    scrolled ? 'bg-brandRed-500' : 'bg-gold-400'
                  }`}
                />
              </a>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          {/* Admin Trigger: Now Navigates to /admin */}
          <button 
            onClick={() => navigate('/admin')}
            className={`hidden md:flex p-4 rounded-full transition-all hover:scale-110 active:scale-90 ${
              scrolled ? 'text-slate-300 hover:text-slate-900' : 'text-white/20 hover:text-white'
            }`}
            title="Staff Access"
          >
            <ShieldCheck size={18} />
          </button>

          <button 
            onClick={onReserve}
            className={`hidden md:flex items-center gap-4 px-9 py-4 rounded-full uppercase text-[10px] tracking-[0.4em] font-black transition-all shadow-2xl active:scale-95 group ${
              scrolled 
                ? 'bg-brandRed-950 text-white hover:bg-slate-800' 
                : 'bg-brandRed-950 text-white hover:bg-white hover:text-brandRed-950'
            }`}
          >
            <Calendar size={14} className="text-gold-500" />
            <span>Reservations</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden p-4 rounded-2xl transition-all active:scale-90 ${
              scrolled || isOpen ? 'bg-slate-950 text-white shadow-xl' : 'bg-white/10 text-white backdrop-blur-md border border-white/20'
            }`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 top-[68px] h-[calc(100vh-68px)] bg-white z-[99] flex flex-col p-8 md:p-12"
          >
            <div className="flex flex-col gap-6 overflow-y-auto py-4">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-slate-950 hover:text-gold-500 font-serif text-4xl md:text-5xl tracking-tighter transition-all italic text-left group flex items-center justify-between border-b border-slate-50 pb-4"
                >
                  <span>{link.name}</span>
                  <ChevronRight size={24} className="text-gold-500 opacity-20" />
                </motion.a>
              ))}
              
              {/* Mobile Staff Link */}
              <motion.button 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                onClick={() => { setIsOpen(false); navigate('/admin'); }}
                className="text-slate-300 hover:text-slate-950 font-serif text-2xl tracking-tight transition-all italic text-left flex items-center gap-4 py-4"
              >
                <ShieldCheck size={20} className="text-gold-500/50" />
                <span>Staff Portal</span>
              </motion.button>
            </div>

            <div className="mt-auto pt-10 pb-6 space-y-6">
              <button 
                onClick={() => { onReserve(); setIsOpen(false); }}
                className="w-full py-6 bg-slate-950 text-white font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl active:scale-95 transition-all rounded-full flex items-center justify-center gap-4"
              >
                <Calendar size={18} className="text-gold-500" />
                Book Experience
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;