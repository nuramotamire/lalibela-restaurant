import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const ContactStep = ({ formData, setFormData, handleSubmit }: any) => {
  return (
    <motion.form key="contact" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="space-y-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-3">Full Name</label>
          <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-6 bg-slate-50 rounded-[2rem] outline-none font-bold text-lg focus:bg-white border border-transparent focus:border-slate-950 transition-all shadow-sm" placeholder="Your Identity" />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-3">Email Address</label>
          <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-6 bg-slate-50 rounded-[2rem] outline-none font-bold text-sm focus:bg-white border border-transparent focus:border-slate-950 transition-all shadow-sm" placeholder="concierge@example.com" />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-3">Mobile Contact</label>
          <input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-6 bg-slate-50 rounded-[2rem] outline-none font-bold text-sm focus:bg-white border border-transparent focus:border-slate-950 transition-all shadow-sm" placeholder="+44 7..." />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-3 flex items-center gap-2">
            <MessageSquare size={14}/> Any Special Requests?
          </label>
          <textarea 
            value={formData.notes} 
            onChange={(e) => setFormData({...formData, notes: e.target.value})} 
            className="w-full p-6 bg-slate-50 rounded-[2rem] outline-none font-medium text-sm focus:bg-white border border-transparent focus:border-slate-950 transition-all shadow-sm resize-none" 
            rows={3} 
            placeholder="Dietary needs, allergies, anniversaries..." 
          />
        </div>
      </div>
      <button type="submit" className="w-full py-7 bg-brandRed-500 text-white font-black uppercase tracking-[0.5em] text-[11px] rounded-full hover:bg-slate-950 shadow-2xl transition-all">
        Finalize My Reservation
      </button>
    </motion.form>
  );
};

export default ContactStep;