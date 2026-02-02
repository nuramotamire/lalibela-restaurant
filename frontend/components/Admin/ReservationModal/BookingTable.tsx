import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, User, Mail, Smartphone, 
  Clock, Sofa, ChevronRight, X, UserCheck, Copy 
} from 'lucide-react';
import { Reservation, ReservationStatus } from '@/types';

interface BookingTableProps {
  filteredReservations: Reservation[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: ReservationStatus | 'All';
  setStatusFilter: (s: ReservationStatus | 'All') => void;
  selectedReservation: Reservation | null;
  setSelectedReservation: (r: Reservation | null) => void;
  handleUpdateStatus: (id: string, status: ReservationStatus) => void;
  confirmCheckIn: (id: string) => void;
  copyToClipboard: (text: string, label: string) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({
  filteredReservations, searchQuery, setSearchQuery, statusFilter, setStatusFilter,
  selectedReservation, setSelectedReservation, handleUpdateStatus, confirmCheckIn, copyToClipboard
}) => {
  
  const statusStyles = {
    [ReservationStatus.CONFIRMED]: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    [ReservationStatus.CANCELLED]: 'bg-rose-50 text-rose-600 border-rose-100',
    [ReservationStatus.NO_SHOW]: 'bg-amber-50 text-amber-600 border-amber-100',
    [ReservationStatus.PENDING]: 'bg-slate-50 text-slate-400 border-slate-100',
  };

  // Helper to safely extract MongoDB _id or standard id
  const getResId = (res: any) => res?._id || res?.id || '';

  return (
    <motion.div key="reservations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
      {/* SEARCH & FILTERS */}
      <div className="flex flex-col md:flex-row gap-6 mb-8 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-96">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Name, Email, Code..."
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-3xl outline-none focus:border-gold-500 transition-all text-sm font-medium shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-2 p-1.5 bg-slate-200/50 backdrop-blur rounded-[2rem] border border-white/50 overflow-x-auto no-scrollbar">
          {['All', ...Object.values(ReservationStatus)].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={`px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                statusFilter === status ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex gap-8 relative">
        {/* TABLE LIST */}
        <div className="flex-1 bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-auto flex-1 no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Reference</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Guest</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Timeline</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Status</th>
                  <th className="p-8 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredReservations.map((res) => {
                  const resId = getResId(res);
                  const isSelected = getResId(selectedReservation) === resId;

                  return (
                    <motion.tr 
                      key={resId} 
                      onClick={() => setSelectedReservation(res)}
                      className={`group cursor-pointer transition-all hover:bg-gold-50/30 ${isSelected ? 'bg-gold-50/50' : ''}`}
                    >
                      <td className="p-8">
                        <span className="text-gold-600 font-serif font-black text-xl tracking-tighter uppercase">{res.referenceCode}</span>
                      </td>
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center"><User size={16} /></div>
                          <div>
                            <p className="text-sm font-bold text-slate-950 italic">{res.name}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{res.guests} Guests</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="flex items-center gap-2 text-slate-950 font-black text-xs">
                          <Clock size={12} className="text-slate-300" /> {res.time}
                          <span className="mx-2 text-slate-200">|</span>
                          <Sofa size={12} className="text-gold-500" /> Table {res.tableId}
                        </div>
                      </td>
                      <td className="p-8">
                        <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${statusStyles[res.status] || statusStyles[ReservationStatus.PENDING]}`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="p-8 text-right">
                        <ChevronRight size={18} className="text-slate-200 group-hover:text-gold-500 transition-colors inline" />
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SIDE DETAIL PANEL */}
        <AnimatePresence>
          {selectedReservation && (
            <motion.div 
              initial={{ x: 400, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 400, opacity: 0 }}
              className="w-[450px] bg-white rounded-[3rem] border border-slate-200 shadow-2xl flex flex-col shrink-0 z-20"
            >
              <div className="bg-slate-950 p-10 text-white relative rounded-t-[3rem]">
                <button onClick={() => setSelectedReservation(null)} className="absolute top-8 right-8 text-white/20 hover:text-white"><X size={24}/></button>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gold-500 mb-2">Reservation Details</p>
                <h3 className="text-3xl font-serif font-bold italic leading-tight">{selectedReservation.name}</h3>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar">
                <div className="grid grid-cols-2 gap-4">
                  <DetailBox label="Schedule" value={selectedReservation.time} sub={selectedReservation.date} icon={<Clock size={14}/>} />
                  <DetailBox label="Covers" value={`${selectedReservation.guests} People`} sub="Standard Seating" icon={<User size={14}/>} />
                </div>

                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <p className="text-[9px] font-black uppercase text-slate-400 mb-4 tracking-widest">Contact Information</p>
                  <div className="space-y-4">
                    <ContactRow icon={<Mail size={14}/>} val={selectedReservation.email} label="Email" onCopy={() => copyToClipboard(selectedReservation.email, 'Email')} />
                    <ContactRow icon={<Smartphone size={14}/>} val={selectedReservation.phone} label="Phone" onCopy={() => copyToClipboard(selectedReservation.phone, 'Phone')} />
                  </div>
                </div>

                <div className="p-8 bg-gold-50/30 rounded-[2.5rem] border border-gold-100">
                  <p className="text-[9px] font-black uppercase text-gold-600 mb-2 tracking-widest">Guest Notes</p>
                  <p className="text-sm italic font-medium text-slate-700 leading-relaxed">
                    {selectedReservation.notes ? `"${selectedReservation.notes}"` : "No special requests."}
                  </p>
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="p-10 border-t bg-slate-50/50 rounded-b-[3rem] space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      handleUpdateStatus(getResId(selectedReservation), ReservationStatus.CANCELLED); 
                    }} 
                    className="py-4 bg-white text-rose-600 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-rose-100 hover:bg-rose-600 hover:text-white transition-all"
                  >
                    Cancel Booking
                  </button>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      handleUpdateStatus(getResId(selectedReservation), ReservationStatus.NO_SHOW); 
                    }} 
                    className="py-4 bg-white text-amber-600 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-amber-100 hover:bg-amber-600 hover:text-white transition-all"
                  >
                    Mark No-Show
                  </button>
                </div>
                <button 
                  onClick={() => confirmCheckIn(getResId(selectedReservation))}
                  disabled={selectedReservation.status === ReservationStatus.CONFIRMED}
                  className="w-full py-6 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-gold-500 hover:text-slate-950 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  <UserCheck size={18} /> 
                  {selectedReservation.status === ReservationStatus.CONFIRMED ? 'Already Checked In' : 'Confirm Check-In'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// HELPER COMPONENTS
const DetailBox = ({ label, value, sub, icon }: any) => (
  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm">
    <div className="flex items-center gap-2 mb-2 text-slate-400">{icon} <span className="text-[8px] font-black uppercase tracking-widest">{label}</span></div>
    <p className="text-lg font-black text-slate-950 leading-none">{value}</p>
    <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{sub}</p>
  </div>
);

const ContactRow = ({ icon, val, label, onCopy }: any) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-3">
      <div className="text-gold-500">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[8px] font-black uppercase text-slate-300">{label}</span>
        <span className="text-xs font-bold text-slate-700">{val}</span>
      </div>
    </div>
    <button onClick={onCopy} className="text-slate-200 hover:text-gold-500 transition-colors"><Copy size={14}/></button>
  </div>
);

export default BookingTable;