import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const ArrivalStep = ({ 
  formData, setFormData, currentCalendarDate, setCurrentCalendarDate, 
  handleDateSelect, calendarDays, availableTimeSlots, customGuestCount, 
  setCustomGuestCount, setStep 
}: any) => {
  return (
    <motion.div key="arrival" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col gap-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">1. Select Date</h4>
            <div className="flex items-center gap-6 text-[11px] font-black">
              <button onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1)))} className="p-2 text-slate-300 hover:text-slate-950 transition-colors"><ChevronLeft size={16}/></button>
              <span className="uppercase tracking-[0.3em] min-w-[120px] text-center text-slate-900">{currentCalendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
              <button onClick={() => setCurrentCalendarDate(new Date(currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1)))} className="p-2 text-slate-300 hover:text-slate-950 transition-colors"><ChevronRight size={16}/></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 bg-slate-50/50 p-6 rounded-[2.5rem] border border-slate-100 shadow-inner">
            {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-[9px] font-black text-slate-300 py-3 text-center">{d}</div>)}
            {calendarDays.map((day: any, i: number) => (
              <button
                key={i}
                disabled={!day || day < new Date(new Date().setHours(0,0,0,0))}
                onClick={() => day && handleDateSelect(day)}
                className={`aspect-square flex items-center justify-center rounded-2xl text-[13px] font-bold transition-all ${
                  !day ? 'invisible' : 
                  day < new Date(new Date().setHours(0,0,0,0)) ? 'text-slate-200' :
                  formData.date === `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,'0')}-${String(day.getDate()).padStart(2,'0')}` 
                    ? 'bg-slate-950 text-white shadow-2xl scale-110 z-10' 
                    : 'text-slate-500 hover:bg-white hover:text-slate-950 hover:shadow-sm'
                }`}
              >
                {day?.getDate()}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-12">
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">2. Arrival Time</h4>
            <div className="relative group">
              <select 
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full p-6 bg-slate-50 border border-transparent rounded-[2rem] outline-none font-bold text-slate-950 appearance-none focus:bg-white focus:border-slate-950 transition-all cursor-pointer shadow-sm text-base"
                disabled={!formData.date}
              >
                <option value="" disabled>Choose arrival time...</option>
                {availableTimeSlots.map((t: string) => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown size={20} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">3. Party Size</h4>
            <div className="relative group">
              <select 
                value={formData.guests} 
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
                className="w-full p-6 bg-slate-50 border border-transparent rounded-[2rem] outline-none font-bold text-slate-950 appearance-none focus:bg-white focus:border-slate-950 transition-all cursor-pointer shadow-sm text-base"
              >
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={String(n)}>{n} Guests</option>)}
                <option value="more">More than 8 guests...</option>
              </select>
              <ChevronDown size={20} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>
            {formData.guests === 'more' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                <input 
                  type="number"
                  placeholder="Exact number of guests"
                  className="w-full p-6 bg-white border-2 border-gold-500 rounded-[2rem] outline-none font-bold text-slate-950 shadow-inner text-base"
                  value={customGuestCount}
                  onChange={(e) => setCustomGuestCount(e.target.value)}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <button 
        disabled={!formData.date || !formData.time || (formData.guests === 'more' && !customGuestCount)} 
        onClick={() => setStep('atmosphere')} 
        className="w-full py-7 bg-slate-950 text-white font-black uppercase tracking-[0.5em] text-[11px] rounded-full hover:bg-brandRed-500 transition-all disabled:opacity-20 shadow-2xl mt-auto shrink-0"
      >
        Select Atmosphere
      </button>
    </motion.div>
  );
};

export default ArrivalStep;