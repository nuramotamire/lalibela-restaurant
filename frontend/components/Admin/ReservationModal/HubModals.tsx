import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Camera, Loader2 } from 'lucide-react';
import { MenuItem, MarketingPost } from '@/types';
import api from '@/src/services/api';

// --- MENU FORM MODAL ---

interface MenuFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: MenuItem | null;
  refreshData: () => void;
  MenuCategory: any;
}

export const MenuFormModal: React.FC<MenuFormModalProps> = ({ 
  isOpen, 
  onClose, 
  editingItem, 
  refreshData, 
  MenuCategory 
}) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setImagePreview(editingItem?.image || null);
    }
  }, [editingItem, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      name: formData.get('name'),
      price: formData.get('price'),
      category: formData.get('category'),
      description: formData.get('description'),
      image: imagePreview,
    };

    try {
      const id = (editingItem as any)?._id || editingItem?.id;
      if (editingItem && id) {
        await api.put(`/menu/${id}`, payload);
      } else {
        await api.post('/menu', payload);
      }
      refreshData();
      onClose();
    } catch (err) {
      console.error("Save Error:", err);
      alert("Error saving menu item");
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = MenuCategory ? Object.values(MenuCategory).filter((c: any) => c !== 'All') : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-xl rounded-[3.5rem] overflow-hidden shadow-2xl">
            <header className="px-10 py-8 border-b border-slate-100 flex justify-between items-center">
              <h4 className="text-2xl font-serif font-bold italic">{editingItem ? 'Modify Dish' : 'New Creation'}</h4>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-950"><X size={24}/></button>
            </header>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Dish Visual</label>
                <div className="relative group aspect-video bg-slate-50 rounded-[2rem] overflow-hidden border-2 border-dashed border-slate-100 hover:border-gold-500 transition-all">
                  {imagePreview ? (
                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300">
                      <Camera size={32} />
                      <span className="text-[10px] font-black uppercase mt-2">Upload Photo</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Name</label>
                  <input name="name" required defaultValue={editingItem?.name} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-gold-500 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Price (£)</label>
                  <input name="price" type="number" step="0.01" required defaultValue={editingItem?.price} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-gold-500 font-bold" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Category</label>
                <select name="category" defaultValue={editingItem?.category} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-gold-500 appearance-none font-bold">
                  {categoryOptions.map((cat: any) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Description</label>
                <textarea name="description" rows={3} required defaultValue={editingItem?.description} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-gold-500 resize-none font-medium text-sm" />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-gold-500 hover:text-slate-950 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} 
                {editingItem ? 'Update Dish' : 'Confirm & Post'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


// --- MARKETING FORM MODAL ---

interface MarketingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingPost: MarketingPost | null;
  refreshData: () => void;
}

export const MarketingFormModal: React.FC<MarketingFormModalProps> = ({ 
  isOpen, 
  onClose, 
  editingPost, 
  refreshData 
}) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Sync image preview when modal opens
  useEffect(() => {
    if (isOpen) {
      setImagePreview(editingPost?.image || null);
    }
  }, [editingPost, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      title: formData.get('title'),
      status: formData.get('status'),
      caption: formData.get('caption'),
      image: imagePreview, // Now included for the backend
    };

    try {
      const id = (editingPost as any)?._id || editingPost?.id;
      if (editingPost && id) {
        await api.put(`/marketing/${id}`, payload);
      } else {
        await api.post('/marketing', payload);
      }
      refreshData();
      onClose();
    } catch (err) {
      console.error("Marketing Save Error:", err);
      alert("Error saving marketing post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-xl rounded-[3rem] overflow-hidden shadow-2xl">
            <header className="px-10 py-8 border-b border-slate-100 flex justify-between items-center">
              <h4 className="text-2xl font-serif font-bold italic">{editingPost ? 'Edit Asset' : 'Create Campaign Asset'}</h4>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-950 transition-all"><X size={24}/></button>
            </header>
            <form onSubmit={handleSubmit} className="p-10 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              
              {/* IMAGE SECTION */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Campaign Visual</label>
                <div className="relative group aspect-video bg-slate-50 rounded-[2rem] overflow-hidden border-2 border-dashed border-slate-100 hover:border-gold-500 transition-all">
                  {imagePreview ? (
                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300">
                      <Camera size={32} />
                      <span className="text-[10px] font-black uppercase mt-2">Upload Asset</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Asset Title</label>
                <input name="title" required defaultValue={editingPost?.title} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-gold-500 transition-all font-bold" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Status</label>
                <select name="status" defaultValue={editingPost?.status || 'draft'} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-gold-500 appearance-none font-bold">
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="live">Live</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Caption</label>
                <textarea name="caption" rows={4} required defaultValue={editingPost?.caption} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-gold-500 transition-all resize-none font-medium text-sm leading-relaxed" />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-gold-500 hover:text-slate-950 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} 
                {editingPost ? 'Update Asset' : 'Deploy Asset'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};