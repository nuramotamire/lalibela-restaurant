import React, { useState, useEffect, useMemo } from 'react';
import { X, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TableZone, ReservationStatus, Reservation, RoomAvailability } from '../types';

// Sub-component Imports
import ArrivalStep from './reservationmodal/ArrivalStep';
import AtmosphereStep from './reservationmodal/AtmosphereStep';
import TableStep from './reservationmodal/TableStep';
import ContactStep from './reservationmodal/ContactStep';
import SuccessStep from './reservationmodal/SuccessStep';
import api from '@/src/services/api';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reservation: Reservation) => void;
  reservations: Reservation[];
  roomAvailability: RoomAvailability;
}

type Step = 'arrival' | 'atmosphere' | 'table' | 'contact' | 'success';

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, onSubmit, reservations, roomAvailability }) => {
  const [step, setStep] = useState<Step>('arrival');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedRefCode, setGeneratedRefCode] = useState('');
  const [customGuestCount, setCustomGuestCount] = useState('');
  
  // CALENDAR STATE
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  
  const [formData, setFormData] = useState({
    date: '', guests: '2', time: '', name: '', email: '', phone: '', notes: '',
    tableZone: TableZone.BAR, tableId: ''
  });

  // --- CALENDAR LOGIC ---
  const calendarDays = useMemo(() => {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days: (Date | null)[] = Array(firstDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }, [currentCalendarDate]);

  const handleDateSelect = (day: Date) => {
    const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
    setFormData({ ...formData, date: dateStr, time: '' });
  };

  const availableTimeSlots = useMemo(() => {
    if (!formData.date) return [];
    const dayStr = new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long' });
    const isWeekend = ['Friday', 'Saturday', 'Sunday'].includes(dayStr);
    
    return isWeekend 
      ? ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM']
      : ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];
  }, [formData.date]);

  // --- ENVIRONMENT DETAILS ---
  const environmentDetails = {
    [TableZone.BAR]: { label: 'The Bar', desc: 'Lively & Social', icon: '🍷' },
    [TableZone.VILLAGE]: { label: 'The Village', desc: 'Traditional Seating', icon: '🏘️' },
    [TableZone.LALIBELA]: { label: 'Lalibela', desc: 'Cultural Immersion', icon: '⛪' },
    [TableZone.GARDEN]: { label: 'The Garden', desc: 'Open Air Bliss', icon: '🌿' }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // 1. Generate the unique reference code
    const refCode = `LAL-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    // 2. Prepare the final guest count
    const finalGuests = formData.guests === 'more' ? customGuestCount : formData.guests;

    // 3. Construct the data object exactly as MongoDB expects it
    const reservationData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      guests: finalGuests,
      tableZone: formData.tableZone,
      tableId: formData.tableId,
      notes: formData.notes,
      referenceCode: refCode,
      status: ReservationStatus.CONFIRMED
    };

    try {
      // 4. Send to your Backend (ensure your 'api' service is imported)
      const response = await api.post('/reservations', reservationData);
      
      if (response.status === 201 || response.status === 200) {
        setGeneratedRefCode(refCode);
        
        // 5. Update local global state so the UI reflects the new booking
        onSubmit(response.data); 
        
        setStep('success');
      }
    } catch (err: any) {
      console.error("MongoDB Save Error:", err);
      alert(`System Error: ${err.response?.data?.message || "Could not connect to database"}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center overflow-hidden p-0 md:p-6 lg:p-10">
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-6xl h-full md:h-[90vh] md:max-h-[850px] md:rounded-[4rem] shadow-2xl flex flex-col lg:grid lg:grid-cols-[320px_1fr] overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-full h-auto lg:h-full bg-brandRed-950 p-6 md:p-8 lg:p-12 text-white flex flex-col relative shrink-0">
          <img src="/img/logoo.png" alt="Lalibela" className="h-6 md:h-8 lg:h-12 w-auto brightness-0 invert mb-8" />
          <div className="hidden lg:flex flex-col gap-6 w-full">
               {['arrival', 'atmosphere', 'table', 'contact'].map((s, idx) => (
                 <div key={s} className={`flex items-center gap-4 transition-opacity ${step === s ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${step === s ? 'bg-gold-500 border-gold-500 text-slate-950' : 'border-white/20'}`}>
                       {idx + 1}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{s}</span>
                 </div>
               ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-white flex flex-col min-w-0 h-full overflow-hidden">
          <header className="px-6 py-5 md:py-8 lg:px-12 border-b border-slate-100 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-4">
               {step !== 'arrival' && step !== 'success' && (
                 <button onClick={() => {
                   if (step === 'atmosphere') setStep('arrival');
                   if (step === 'table') setStep('atmosphere');
                   if (step === 'contact') setStep('table');
                 }} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl">
                   <ArrowLeft size={18} />
                 </button>
               )}
               <h3 className="text-xl lg:text-3xl font-serif font-bold text-slate-950 italic capitalize">{step}</h3>
             </div>
             <button onClick={onClose} className="p-3 bg-slate-50 text-slate-400 rounded-2xl"><X size={20} /></button>
          </header>

          <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-16 scrollbar-hide">
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div key="processing" className="h-full flex flex-col items-center justify-center">
                  <Loader2 className="w-16 h-16 text-brandRed-500 animate-spin" />
                  <p className="mt-8 text-[11px] font-black uppercase tracking-[0.5em] text-slate-300">Reserving Experience...</p>
                </motion.div>
              ) : (
                <>
                  {step === 'arrival' && (
                    <ArrivalStep 
                      formData={formData} 
                      setFormData={setFormData} 
                      currentCalendarDate={currentCalendarDate} 
                      setCurrentCalendarDate={setCurrentCalendarDate} 
                      calendarDays={calendarDays}
                      handleDateSelect={handleDateSelect}
                      availableTimeSlots={availableTimeSlots}
                      customGuestCount={customGuestCount}
                      setCustomGuestCount={setCustomGuestCount}
                      setStep={setStep}
                    />
                  )}
                  {step === 'atmosphere' && (
                    <AtmosphereStep 
                      formData={formData} 
                      setFormData={setFormData} 
                      setStep={setStep} 
                      environmentDetails={environmentDetails}
                      roomAvailability={roomAvailability} 
                    />
                  )}
                  {step === 'table' && (
                    <TableStep 
                      formData={formData} 
                      setFormData={setFormData} 
                      setStep={setStep} 
                      reservations={reservations} 
                    />
                  )}
                  {step === 'contact' && (
                    <ContactStep 
                      formData={formData} 
                      setFormData={setFormData} 
                      handleSubmit={handleSubmit} 
                    />
                  )}
                  {step === 'success' && (
                    <SuccessStep 
                      formData={formData} 
                      generatedRefCode={generatedRefCode} 
                      onClose={onClose} 
                    />
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReservationModal;