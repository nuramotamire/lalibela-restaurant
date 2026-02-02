import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Edit2, CheckCircle2, 
  AlertCircle, Utensils, Trash2, Inbox 
} from 'lucide-react';
import { MenuItem, MenuCategory } from '@/types';
import api from '@/src/services/api';

interface KitchenHubProps {
  groupedMenuItems?: Record<string, MenuItem[]>;
  menuTabFilter: MenuCategory | 'All';
  setMenuTabFilter: (c: MenuCategory | 'All') => void;
  MenuCategory: any;
  // Make sure these two are named exactly like this:
  setEditingMenuItem: (item: MenuItem | null) => void;
  setIsMenuFormOpen: (isOpen: boolean) => void;
  refreshData: () => void; 
}

const KitchenHub: React.FC<KitchenHubProps> = ({
  groupedMenuItems = {}, // Defaulting to empty object
  menuTabFilter, 
  setMenuTabFilter, 
  MenuCategory, 
  setEditingMenuItem, 
  setIsMenuFormOpen, 
  refreshData
}) => {
  
  const formatPrice = (price: any) => {
    const num = Number(price);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  const handleToggle = async (item: MenuItem) => {
    try {
      // Use item._id or item.id depending on your MongoDB schema mapping
      const id = (item as any)._id || item.id;
      await api.put(`/menu/${id}`, { 
        isAvailable: !item.isAvailable 
      });
      refreshData();
    } catch (err) {
      console.error("Toggle error:", err);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (item: MenuItem) => {
    const id = (item as any)._id || item.id;
    if (window.confirm("Admin Action: Permanently delete this dish?")) {
      try {
        await api.delete(`/menu/${id}`);
        refreshData();
      } catch (err) {
        alert("Delete failed. Ensure you are logged in as admin.");
      }
    }
  };

  // Convert to entries safely
  const categories = Object.entries(groupedMenuItems);

  return (
    <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
      {/* HEADER SECTION */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-500 text-slate-950 flex items-center justify-center shadow-lg">
              <Utensils size={24} />
            </div>
            <div>
              <h3 className="text-3xl font-serif text-slate-950 italic font-bold">Kitchen Hub</h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Inventory Control</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={menuTabFilter} 
            onChange={(e) => setMenuTabFilter(e.target.value as any)} 
            className="px-6 py-4 bg-slate-50 border rounded-2xl font-black text-[10px] uppercase tracking-widest outline-none"
          >
            <option value="All">All Categories</option>
            {MenuCategory && Object.values(MenuCategory).filter(c => c !== 'All').map((cat: any) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button 
            onClick={() => { setEditingMenuItem(null); setIsMenuFormOpen(true); }} 
            className="px-8 py-5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl hover:bg-gold-500 hover:text-slate-950 transition-all"
          >
            <Plus size={18} /> New Dish
          </button>
        </div>
      </div>

      {/* ITEMS GRID WITH EMPTY STATE CHECK */}
      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
            <Inbox size={40} />
          </div>
          <h4 className="text-xl font-serif italic text-slate-950">No Menu Items Found</h4>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Start by adding your first culinary masterpiece</p>
        </div>
      ) : (
        categories.map(([category, items]) => (
          <div key={category} className="space-y-8">
            <div className="flex items-center gap-6 px-4">
              <h4 className="text-2xl font-serif font-black text-slate-950 italic">{category}</h4>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {items.map((item) => (
                <motion.div layout key={item.id || (item as any)._id} className="bg-white rounded-[2.5rem] border overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-2xl">
                  <div className="aspect-[5/4] relative overflow-hidden bg-slate-100">
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
                      className={`w-full h-full object-cover transition-all duration-1000 ${!item.isAvailable && 'grayscale brightness-50'}`} 
                      alt={item.name}
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button 
                        onClick={() => handleDelete(item)}
                        className="p-3 bg-white/90 text-rose-500 rounded-full shadow-lg hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                       <div className="bg-white/95 px-4 py-1.5 rounded-full shadow-lg">
                         <span className="text-[10px] font-black">£{formatPrice(item.price)}</span>
                       </div>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <h4 className="text-lg font-serif font-bold text-slate-950 italic mb-2">{item.name}</h4>
                    <p className="text-[11px] text-slate-400 font-medium line-clamp-2 italic mb-6">{item.description}</p>
                    
                    <div className="mt-auto pt-6 border-t flex gap-3">
                      <button 
                        onClick={() => { setEditingMenuItem(item); setIsMenuFormOpen(true); }} 
                        className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-950 hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <Edit2 size={14} /> <span className="text-[9px] font-black uppercase">Edit</span>
                      </button>
                      
                      <button 
                        onClick={() => handleToggle(item)} 
                        className={`flex-1 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 ${item.isAvailable ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}
                      >
                        {item.isAvailable ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                        <span className="text-[9px] font-black uppercase">{item.isAvailable ? 'In Stock' : 'Sold Out'}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))
      )}
    </motion.div>
  );
};

export default KitchenHub;