import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Check } from 'lucide-react';
import { TableZone } from '../../types';

const AtmosphereStep = ({ formData, setFormData, environmentDetails, roomAvailability, setStep }: any) => {
  return (
    <motion.div key="atmosphere" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(environmentDetails).map(([key, value]: [string, any]) => {
          const isAvailable = roomAvailability[key as TableZone];
          return (
            <button
              key={key}
              disabled={!isAvailable}
              onClick={() => setFormData({...formData, tableZone: key as TableZone, tableId: ''})}
              className={`flex items-center gap-6 p-8 border-2 rounded-[3rem] text-left transition-all relative overflow-hidden group ${
                !isAvailable ? 'opacity-40 grayscale cursor-not-allowed border-slate-100 bg-slate-50' :
                formData.tableZone === key ? 'border-slate-950 bg-slate-950 text-white shadow-2xl scale-[1.02]' : 'bg-slate-50 border-slate-50 text-slate-400 hover:border-slate-200 hover:bg-white hover:shadow-lg'
              }`}
            >
              <div className={`p-5 rounded-2xl shrink-0 ${formData.tableZone === key ? 'bg-white/10 text-white' : 'bg-white text-slate-300 shadow-sm'}`}>
                {value.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-black uppercase tracking-widest mb-1">{value.label}</h4>
                <p className={`text-[10px] font-light italic leading-snug ${formData.tableZone === key ? 'text-white/60' : 'text-slate-400'}`}>
                  {isAvailable ? value.desc : 'Temporarily Closed for Maintenance'}
                </p>
              </div>
              {!isAvailable && <div className="absolute top-6 right-6 text-red-500"><AlertTriangle size={16} /></div>}
              {isAvailable && formData.tableZone === key && <div className="absolute top-6 right-6 text-gold-500"><Check size={20} /></div>}
            </button>
          );
        })}
      </div>
      <button onClick={() => setStep('table')} className="w-full py-7 bg-slate-950 text-white font-black uppercase tracking-[0.5em] text-[11px] rounded-full hover:bg-brandRed-500 transition-all shadow-2xl">
        Choose Your Seat
      </button>
    </motion.div>
  );
};

export default AtmosphereStep;