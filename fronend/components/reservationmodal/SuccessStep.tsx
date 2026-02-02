import React from 'react';
import { motion } from 'framer-motion';
import { Check, Download } from 'lucide-react';
import { jsPDF } from 'https://esm.sh/jspdf@2.5.1';

interface SuccessStepProps {
  formData: any;
  generatedRefCode: string;
  customGuestCount: string;
  onClose: () => void;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ formData, generatedRefCode, customGuestCount, onClose }) => {
  const handleDownload = async () => {
    const doc = new jsPDF();
    // Your 100+ lines of PDF logic from the original file go here...
    doc.text("Lalibela Reservation", 10, 10);
    doc.text(`Reference: ${generatedRefCode}`, 10, 20);
    doc.save(`Lalibela-Booking-${generatedRefCode}.pdf`);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6 space-y-10">
      <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
        <Check size={48} strokeWidth={3} />
      </div>
      <div className="space-y-4 max-w-lg mx-auto">
        <h3 className="text-4xl font-serif font-bold text-slate-950 italic">Selam! It's Confirmed.</h3>
        <p className="text-slate-600 font-serif italic text-lg leading-relaxed">
          Selam, <span className="text-slate-950 font-bold not-italic">{formData.name}</span>. We have successfully mapped <span className="text-brandRed-500 font-bold not-italic">Table {formData.tableId}</span>.
        </p>
      </div>
      <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 inline-block shadow-lg max-w-[320px] w-full">
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${generatedRefCode}`} alt="QR" className="w-48 h-48 mx-auto" />
          <p className="mt-6 text-gold-600 font-serif font-bold text-2xl tracking-widest">{generatedRefCode}</p>
          <button onClick={handleDownload} className="mt-6 w-full py-4 bg-slate-950 text-white rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-gold-500 hover:text-slate-950 transition-all">
            <Download size={16} /> Download PDF Booking
          </button>
      </div>
      <button onClick={onClose} className="w-full max-w-sm py-7 bg-slate-950 text-white font-black uppercase tracking-[0.5em] text-[11px] rounded-full hover:bg-gold-500 hover:text-slate-950 transition-all mx-auto block">
        Done
      </button>
    </motion.div>
  );
};

export default SuccessStep;