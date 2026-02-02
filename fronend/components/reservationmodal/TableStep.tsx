import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Info, CalendarX } from 'lucide-react';
import { TableZone, ReservationStatus } from '../../types';

interface TableStepProps {
  formData: any;
  setFormData: any;
  setStep: (step: any) => void;
  reservations: any[];
}

const TableStep: React.FC<TableStepProps> = ({ formData, setFormData, setStep, reservations }) => {
  const timeToMinutes = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const occupiedTableIds = useMemo(() => {
    if (!formData.date || !formData.time) return [];
    const selectedMinutes = timeToMinutes(formData.time);
    const DINING_DURATION = 120;

    return reservations
      .filter(r => {
        if (r.date !== formData.date || r.status === ReservationStatus.CANCELLED) return false;
        const resMinutes = timeToMinutes(r.time);
        return Math.abs(selectedMinutes - resMinutes) < DINING_DURATION;
      })
      .map(r => r.tableId);
  }, [reservations, formData.date, formData.time]);

  const getTablesForZone = (zone: TableZone) => {
    const prefix = zone[0]; // Simplification for logic
    return Array.from({ length: 9 }, (_, i) => ({
      id: `${prefix}${i + 1}`,
      top: `${15 + Math.floor(i / 3) * 30}%`,
      left: `${10 + (i % 3) * 30}%`
    }));
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
      <div className="bg-slate-950 p-8 rounded-[3rem] relative aspect-[16/9] w-full overflow-hidden">
         <div className="absolute inset-0 bg-grid-white opacity-[0.05]"></div>
         <div className="relative w-full h-full border border-white/10 rounded-3xl">
            {getTablesForZone(formData.tableZone).map((table) => {
              const isOccupied = occupiedTableIds.includes(table.id);
              const isSelected = formData.tableId === table.id;
              return (
                <button key={table.id} disabled={isOccupied} onClick={() => setFormData({...formData, tableId: table.id})}
                  className={`absolute w-[18%] h-[18%] rounded-2xl border-2 transition-all ${
                    isOccupied ? 'bg-rose-950/40 border-rose-500/30 text-rose-500/50 cursor-not-allowed' :
                    isSelected ? 'bg-gold-500 border-gold-400 text-slate-950 z-10' : 'bg-white/5 border-white/10 text-white/30 hover:bg-white/10'
                  }`}
                  style={{ top: table.top, left: table.left }}>
                  {isOccupied ? <CalendarX size={14} /> : <span className="text-[10px] font-black">{table.id}</span>}
                </button>
              );
            })}
         </div>
      </div>
      <div className="flex items-center gap-6 text-slate-500 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
         <Info size={20} className="text-gold-600 shrink-0" />
         <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
           {formData.tableId ? `Table ${formData.tableId} is secured` : 'Select an available seat on the blueprint'}
         </p>
      </div>
      <button disabled={!formData.tableId} onClick={() => setStep('contact')} className="w-full py-7 bg-slate-950 text-white font-black uppercase tracking-[0.5em] text-[11px] rounded-full hover:bg-brandRed-500 transition-all shadow-2xl disabled:opacity-20">
        Confirm Selection
      </button>
    </motion.div>
  );
};

export default TableStep;