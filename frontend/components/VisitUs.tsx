import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { BusinessInfo } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface VisitUsProps {
  onReserve: () => void;
  businessInfo: BusinessInfo;
}

const VisitUs: React.FC<VisitUsProps> = ({ onReserve, businessInfo }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 8000);
  };

  return (
    <section id="location" className="py-32 bg-offWhite scroll-mt-24 relative overflow-hidden">
      {/* Decorative Brand Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brandRed-500/10 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-stretch">
          
          {/* Left Side: The Salon (Information) */}
          <div className="lg:w-2/5 flex flex-col justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <span className="text-brandRed-500 uppercase tracking-[0.6em] font-black text-[9px] block">Contact & Location</span>
                <h3 className="text-5xl md:text-7xl font-serif text-brandRed-950 italic leading-none">Get in <br/>Touch.</h3>
                <p className="text-brandRed-900/50 font-light text-lg max-w-sm italic leading-relaxed">
                  Experience excellence in every interaction. Reach out to our concierge for special requests or inquiries.
                </p>
              </div>

              <div className="space-y-6">
                {/* Address Tile */}
                <div className="group flex items-center gap-6 p-6 bg-white rounded-3xl border border-brandRed-100/50 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="p-4 bg-brandRed-50 text-brandRed-500 rounded-2xl group-hover:bg-brandRed-500 group-hover:text-white transition-colors duration-500">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brandRed-400 block mb-1">Our Location</span>
                    <p className="text-sm font-bold text-brandRed-950">{businessInfo.address}</p>
                  </div>
                </div>

                {/* Phone & Email Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
                  <div className="group flex items-center gap-6 p-6 bg-white rounded-3xl border border-brandRed-100/50 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="p-4 bg-brandRed-50 text-brandRed-500 rounded-2xl group-hover:bg-brandRed-500 group-hover:text-white transition-colors duration-500">
                      <Phone size={22} />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brandRed-400 block mb-1">Reservations</span>
                      <p className="text-sm font-bold text-brandRed-950">{businessInfo.phone}</p>
                    </div>
                  </div>
                  <div className="group flex items-center gap-6 p-6 bg-white rounded-3xl border border-brandRed-100/50 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="p-4 bg-brandRed-50 text-brandRed-500 rounded-2xl group-hover:bg-brandRed-500 group-hover:text-white transition-colors duration-500">
                      <Mail size={22} />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brandRed-400 block mb-1">Inquiries</span>
                      <p className="text-sm font-bold text-brandRed-950">{businessInfo.email}</p>
                    </div>
                  </div>
                </div>

                {/* Opening Hours Block */}
                <div className="p-8 bg-brandRed-950 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 transition-transform duration-1000 group-hover:rotate-0">
                    <Clock size={100} />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-brandRed-400" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">Service Schedule</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end border-b border-white/10 pb-2">
                        <span className="text-xs font-light text-white/50 uppercase tracking-widest">Monday — Friday</span>
                        <span className="text-sm font-bold text-white tracking-tighter">5:00 PM - 11:00 PM</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-white/10 pb-2">
                        <span className="text-xs font-light text-white/50 uppercase tracking-widest">Saturday — Sunday</span>
                        <span className="text-sm font-bold text-white tracking-tighter">12:00 PM - 11:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: The Inquiry (Form & Map) */}
          <div className="lg:w-3/5 flex flex-col gap-8">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full min-h-[500px] bg-white rounded-[3rem] p-16 flex flex-col items-center justify-center text-center shadow-2xl border border-brandRed-100/30"
                >
                  <div className="w-24 h-24 bg-brandRed-500 text-white rounded-full flex items-center justify-center mb-10 shadow-[0_20px_40px_rgba(128,4,32,0.3)]">
                    <CheckCircle2 size={48} />
                  </div>
                  <h4 className="text-4xl font-serif text-brandRed-950 italic mb-4">Message Transmitted</h4>
                  <p className="text-brandRed-900/50 font-light leading-relaxed max-w-sm mx-auto mb-10">
                    Thank you, {formState.name}. Your inquiry has been logged with our team. We respond to all guests within one business day.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-brandRed-500 border-b border-brandRed-500 pb-2 hover:opacity-70 transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-brandRed-50/50 relative"
                >
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="relative group">
                        <label className="text-[9px] font-black uppercase tracking-widest text-brandRed-400 mb-2 block ml-1">Full Name</label>
                        <input 
                          required 
                          placeholder="Your Name"
                          className="w-full p-5 bg-brandRed-50/30 rounded-2xl outline-none border border-transparent focus:border-brandRed-500/20 focus:bg-white transition-all text-sm font-medium"
                          value={formState.name}
                          onChange={(e) => setFormState({...formState, name: e.target.value})}
                        />
                      </div>
                      <div className="relative group">
                        <label className="text-[9px] font-black uppercase tracking-widest text-brandRed-400 mb-2 block ml-1">Email Address</label>
                        <input 
                          required 
                          type="email"
                          placeholder="hello@example.com"
                          className="w-full p-5 bg-brandRed-50/30 rounded-2xl outline-none border border-transparent focus:border-brandRed-500/20 focus:bg-white transition-all text-sm font-medium"
                          value={formState.email}
                          onChange={(e) => setFormState({...formState, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="relative group">
                        <label className="text-[9px] font-black uppercase tracking-widest text-brandRed-400 mb-2 block ml-1">Phone Number</label>
                        <input 
                          required 
                          placeholder="+44"
                          className="w-full p-5 bg-brandRed-50/30 rounded-2xl outline-none border border-transparent focus:border-brandRed-500/20 focus:bg-white transition-all text-sm font-medium"
                          value={formState.phone}
                          onChange={(e) => setFormState({...formState, phone: e.target.value})}
                        />
                      </div>
                      <div className="relative group">
                        <label className="text-[9px] font-black uppercase tracking-widest text-brandRed-400 mb-2 block ml-1">Inquiry Subject</label>
                        <input 
                          required 
                          placeholder="How can we help?"
                          className="w-full p-5 bg-brandRed-50/30 rounded-2xl outline-none border border-transparent focus:border-brandRed-500/20 focus:bg-white transition-all text-sm font-medium"
                          value={formState.subject}
                          onChange={(e) => setFormState({...formState, subject: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="text-[9px] font-black uppercase tracking-widest text-brandRed-400 mb-2 block ml-1">Message Detail</label>
                      <textarea 
                        required 
                        rows={4}
                        placeholder="Please share any specific details or special requests..."
                        className="w-full p-5 bg-brandRed-50/30 rounded-2xl outline-none border border-transparent focus:border-brandRed-500/20 focus:bg-white transition-all text-sm font-medium resize-none"
                        value={formState.message}
                        onChange={(e) => setFormState({...formState, message: e.target.value})}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="group w-full py-6 bg-brandRed-500 text-white rounded-2xl font-black uppercase tracking-[0.5em] text-[11px] shadow-2xl hover:bg-brandRed-600 active:scale-95 transition-all flex items-center justify-center gap-4 relative overflow-hidden"
                    >
                      <span className="relative z-10">Send Inquiry</span>
                      <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-brandRed-600 to-brandRed-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Styled Map Container */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-2 rounded-[3rem] shadow-xl border border-brandRed-50 overflow-hidden"
            >
              <div className="w-full h-72 rounded-[2.8rem] overflow-hidden grayscale-[100%] hover:grayscale-0 transition-all duration-1000 relative">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  title="Location Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(businessInfo.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full"
                ></iframe>
                {/* Visual Label overlay on map */}
                <div className="absolute bottom-6 left-6 px-6 py-3 bg-brandRed-950/90 backdrop-blur-md text-white rounded-2xl flex items-center gap-4 pointer-events-none">
                  <div className="w-2 h-2 bg-brandRed-500 rounded-full animate-ping"></div>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">Live from Fortess Road</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitUs;