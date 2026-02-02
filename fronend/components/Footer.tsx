
import React from 'react';
import { Facebook, Instagram, Music2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brandRed-500 text-white/60 py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          <div className="space-y-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-4 text-3xl font-serif font-bold text-white tracking-widest uppercase mb-2">
                <img src="/img/logoo.png" alt="Lalibela Logo" className="h-10 w-auto object-contain brightness-0 invert" />
              </div>
              <span className="text-white/40 text-[10px] tracking-[0.4em] font-black uppercase mt-4">Authentic Ethiopian Dining</span>
            </div>
            <p className="text-sm leading-relaxed font-light max-w-xs text-white/80">
              Where casual meets extraordinary. We believe exceptional dining should be an everyday experience.
            </p>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[11px] mb-10 pb-4 border-b border-white/10">Navigation</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.3em] font-black">
              <li><a href="#philosophy" className="text-white hover:opacity-70 transition-colors">Origins</a></li>
              <li><a href="#menu" className="text-white hover:opacity-70 transition-colors">Menu</a></li>
              <li><a href="#experience" className="text-white hover:opacity-70 transition-colors">Experience</a></li>
              <li><a href="#location" className="text-white hover:opacity-70 transition-colors">Location</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[11px] mb-10 pb-4 border-b border-white/10">Reservations</h4>
            <ul className="space-y-4 text-xs font-light text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Dining Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Group Bookings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[11px] mb-10 pb-4 border-b border-white/10">Social Connection</h4>
            <div className="flex flex-wrap gap-6 mb-8">
              <a 
                href="https://www.instagram.com/lalibela_resturant_uk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-brandRed-500 transition-all"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.tiktok.com/@londonlalibelarestaurant" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-brandRed-500 transition-all"
              >
                <Music2 size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40">
            © 2024 Lalibela Restaurant. Elevated Dining.
          </p>
          <div className="flex gap-6 opacity-40">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
