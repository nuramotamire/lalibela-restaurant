import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, LayoutDashboard, Calendar, Scan, Sparkles, Utensils, LogOut, Menu, Activity, 
  Settings, Users, PieChart, MapPin, CheckCircle2, AlertCircle, Camera, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reservation, MenuItem, MenuCategory, TableZone, ReservationStatus } from '@/types';

// Sub-components
import BookingTable from './BookingTable';
import MarketingHub from './MarketingHub';
import KitchenHub from './KitchenHub';
import { MenuFormModal, MarketingFormModal } from './HubModals';
import { useAdmin } from '@/src/hooks/useAdmin';

interface ReservationListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReservationListModal: React.FC<ReservationListModalProps> = ({ isOpen, onClose }) => {
  // 1. Destructure refresh/fetchAllData from your hook to use in the hubs
  const { isAuthenticated, login, logout, data, updateReservationStatus, refresh: fetchAllData } = useAdmin(isOpen);
  const { reservations, menuItems, marketingPosts } = data;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reservations' | 'scanner' | 'marketing' | 'menu'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | 'All'>('All');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  
  // Scanner Specific States
  const [scannedResult, setScannedResult] = useState<Reservation | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  // Form States
  const [isMenuFormOpen, setIsMenuFormOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [isMarketingFormOpen, setIsMarketingFormOpen] = useState(false);
  const [editingMarketingPost, setEditingMarketingPost] = useState<any>(null);

  // --- LOGIC (HOOKS MOVED TO TOP LEVEL TO PREVENT CRASH) ---

  const dashboardStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todaysReservations = reservations.filter(r => r.date === today);
    return {
      totalCovers: todaysReservations.reduce((acc, res) => acc + (Number(res.guests) || 0), 0),
      totalBookings: todaysReservations.length,
      occupancy: Math.min(100, Math.round((todaysReservations.length / 20) * 100)),
      busyZone: "Main Hall"
    };
  }, [reservations]);

  const filteredReservations = useMemo(() => {
    return reservations.filter(r => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = r.name.toLowerCase().includes(q) || r.referenceCode.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reservations, searchQuery, statusFilter]);

  // Grouped Menu logic moved up here
  const groupedMenu = useMemo(() => {
    return menuItems.reduce((acc, item) => {
      const cat = item.category || 'Uncategorized';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {} as Record<string, MenuItem[]>);
  }, [menuItems]);

  // --- HANDLERS ---

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    console.log(`${label} copied to clipboard`);
  };

  const handleStatusChange = async (id: string, newStatus: ReservationStatus) => {
    try {
      await updateReservationStatus(id, newStatus);
      const targetId = id;
      if (selectedReservation && ((selectedReservation as any)._id === targetId || selectedReservation.id === targetId)) {
        setSelectedReservation({ ...selectedReservation, status: newStatus });
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const confirmCheckIn = (id: string) => {
    handleStatusChange(id, ReservationStatus.CONFIRMED);
    setScannedResult(null);
    setActiveTab('reservations');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(username, password);
    if (!result.success) setError(result.message);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[160] bg-slate-950/98 backdrop-blur-2xl flex items-center justify-center p-0 md:p-8">
      <div className="bg-white w-full max-w-[1600px] h-full max-h-[920px] md:rounded-[3.5rem] shadow-2xl flex overflow-hidden">
        
        {!isAuthenticated ? (
          <div className="w-full h-full flex items-center justify-center bg-slate-950 relative">
             <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none"></div>
             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-sm p-12 text-center">
              <div className="w-20 h-20 bg-gold-500 rounded-3xl mb-8 mx-auto flex items-center justify-center shadow-2xl text-slate-950"><Settings size={32} /></div>
              <h3 className="text-3xl font-serif text-white mb-10 italic">Staff Terminal</h3>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <input type="text" placeholder="Staff ID" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-white text-center outline-none focus:border-gold-500" />
                <input type="password" placeholder="Passkey" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-white text-center outline-none focus:border-gold-500" />
                {error && <p className="text-red-400 text-[10px] font-black uppercase tracking-widest">{error}</p>}
                <button type="submit" className="w-full bg-gold-500 text-slate-950 font-black py-6 rounded-2xl uppercase tracking-[0.4em] text-[11px]">Initialize Access</button>
              </form>
            </motion.div>
            <button onClick={onClose} className="absolute top-10 right-10 text-white/30 hover:text-white"><X size={32}/></button>
          </div>
        ) : (
          <>
            {/* Sidebar */}
            <motion.div animate={{ width: isSidebarOpen ? '320px' : '0px' }} className="bg-slate-950 flex flex-col shrink-0 border-r border-white/5 overflow-hidden relative">
              <div className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-12"><Activity className="text-gold-500" /><h2 className="text-white font-serif font-bold text-2xl italic">Lalibela Terminal</h2></div>
                <nav className="space-y-4 flex-1">
                  {[
                    { id: 'dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
                    { id: 'reservations', icon: <Calendar size={18} />, label: 'Guest List' },
                    { id: 'scanner', icon: <Scan size={18} />, label: 'QR Scanner' },
                    { id: 'menu', icon: <Utensils size={18} />, label: 'Kitchen Hub' },
                    { id: 'marketing', icon: <Sparkles size={18} />, label: 'Marketing Hub' },
                  ].map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-4 p-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                    >
                      {tab.icon} <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
                <button onClick={logout} className="mt-auto pt-8 border-t border-white/5 text-white/20 text-[10px] font-black uppercase tracking-widest hover:text-red-400 flex items-center gap-3"><LogOut size={16} /> Logout</button>
              </div>
            </motion.div>

            {/* Main Surface */}
            <div className="flex-1 bg-slate-50 flex flex-col h-full overflow-hidden">
               <header className="bg-white px-12 py-6 border-b border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-6">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"><Menu size={20} /></button>
                    <h2 className="text-2xl font-serif text-slate-950 font-bold italic pr-4 capitalize">{activeTab.replace('-', ' ')}</h2>
                  </div>
                  <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><X size={24}/></button>
              </header>

              <div className="flex-1 overflow-auto p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'dashboard' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                       <StatCard icon={<Users/>} val={dashboardStats.totalCovers} label="Covers Today" color="blue" />
                       <StatCard icon={<Calendar/>} val={dashboardStats.totalBookings} label="Active Bookings" color="green" />
                       <StatCard icon={<PieChart/>} val={`${dashboardStats.occupancy}%`} label="Floor Load" color="amber" />
                       <StatCard icon={<MapPin/>} val={dashboardStats.busyZone} label="Peak Zone" color="rose" />
                    </motion.div>
                  )}

                  {activeTab === 'scanner' && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[500px]">
                        <div className="w-full max-w-md bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold-500/20">
                                <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-1/2 h-full bg-gold-500 shadow-[0_0_15px_#b89222]" />
                            </div>
                            <div className="w-24 h-24 bg-slate-950 rounded-3xl flex items-center justify-center mx-auto mb-8 text-gold-500 shadow-2xl">
                                <Scan size={40} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-slate-950 mb-4 italic">Ready to Scan</h3>
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-10">Point camera at guest's booking QR code</p>
                            <div className="aspect-square w-full bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex items-center justify-center relative group cursor-pointer hover:border-gold-500 transition-colors">
                                <Camera size={48} className="text-slate-200 group-hover:text-gold-500 transition-colors" />
                            </div>
                        </div>
                     </motion.div>
                  )}

                  {activeTab === 'reservations' && (
                    <BookingTable 
                      filteredReservations={filteredReservations} 
                      searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                      statusFilter={statusFilter} setStatusFilter={setStatusFilter} 
                      selectedReservation={selectedReservation} setSelectedReservation={setSelectedReservation} 
                      handleUpdateStatus={handleStatusChange} confirmCheckIn={confirmCheckIn}
                      copyToClipboard={copyToClipboard}
                    />
                  )}

                  {activeTab === 'menu' && (
                    <KitchenHub 
                      groupedMenuItems={groupedMenu}
                      menuTabFilter={statusFilter as any} 
                      setMenuTabFilter={setStatusFilter as any}
                      MenuCategory={MenuCategory}
                      setEditingMenuItem={setEditingMenuItem}
                      setIsMenuFormOpen={setIsMenuFormOpen}
                      refreshData={fetchAllData}
                    />
                  )}
                                  {/* Inside ReservationListModal.tsx */}
                                  {activeTab === 'marketing' && (
                                    <MarketingHub 
                                      posts={marketingPosts}
                                      // Change the prop name on the LEFT to "setEditingPost"
                                      setEditingPost={setEditingMarketingPost} 
                                      setIsMarketingFormOpen={setIsMarketingFormOpen}
                                      refreshData={fetchAllData}
                                      copyToClipboard={copyToClipboard}
                                    />
                                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals - Note higher Z-index is usually handled in the modal's own CSS/Classes */}
      {/* BOTTOM OF ReservationListModal.tsx */}
<MenuFormModal 
  isOpen={isMenuFormOpen} 
  onClose={() => setIsMenuFormOpen(false)} 
  editingItem={editingMenuItem} 
  MenuCategory={MenuCategory} // CRITICAL: This was missing!
  refreshData={fetchAllData}   // CRITICAL: This was missing!
/>

<MarketingFormModal 
  isOpen={isMarketingFormOpen} 
  onClose={() => setIsMarketingFormOpen(false)} 
  editingPost={editingMarketingPost} 
  // This is the fetch function from your useAdmin hook 
  // that re-syncs the marketingPosts array
  refreshData={fetchAllData} 
/>
    </div>
  );
};

const StatCard = ({ icon, val, label, color }: any) => {
  const colorMap: any = {
    blue: 'bg-blue-50 text-blue-500', green: 'bg-emerald-50 text-emerald-500',
    amber: 'bg-amber-50 text-amber-500', rose: 'bg-rose-50 text-rose-500'
  };
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${colorMap[color] || 'bg-slate-50 text-slate-500'}`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <p className="text-3xl font-serif font-black text-slate-950 leading-none mb-2">{val}</p>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
    </div>
  );
};

export default ReservationListModal;