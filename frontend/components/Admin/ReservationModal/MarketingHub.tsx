import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Copy, Sparkles, Inbox } from 'lucide-react';
import { MarketingPost } from '@/types';
import api from '@/src/services/api';

interface MarketingHubProps {
  posts?: MarketingPost[]; 
  refreshData: () => void; 
  setEditingPost: (post: MarketingPost | null) => void;
  setIsMarketingFormOpen: (isOpen: boolean) => void;
  copyToClipboard?: (text: string, label?: string) => void;
}

const MarketingHub: React.FC<MarketingHubProps> = ({
  posts = [], 
  refreshData, 
  setEditingPost, 
  setIsMarketingFormOpen, 
  copyToClipboard = (text) => navigator.clipboard.writeText(text)
}) => {

  const handleDelete = async (post: MarketingPost) => {
    const id = (post as any)._id || post.id;
    
    // Admin-only action: No credit card data is involved here
    if (window.confirm("Admin Action: Permanently delete this marketing asset? This cannot be undone.")) {
      try {
        await api.delete(`/marketing/${id}`); 
        refreshData(); 
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Delete failed. Check server logs or admin permissions.");
      }
    }
  };

  // Helper for status badge colors
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'scheduled': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <motion.div 
      key="marketing" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="space-y-10"
    >
      {/* HEADER SECTION */}
      <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-gold-500 rounded-[1.5rem] flex items-center justify-center text-slate-950 shadow-lg shadow-gold-500/20">
            <Sparkles size={28} />
          </div>
          <div>
            <h3 className="text-3xl font-serif text-slate-950 italic font-bold mb-1">Promotion Studio</h3>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Storytelling & Seasonal Assets</p>
          </div>
        </div>
        <button 
          onClick={() => { setEditingPost(null); setIsMarketingFormOpen(true); }}
          className="px-8 py-5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl hover:bg-gold-500 hover:text-slate-950 transition-all whitespace-nowrap"
        >
          <Plus size={16} /> New Asset
        </button>
      </div>

      {/* ASSETS GRID */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3.5rem] border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
            <Inbox size={40} />
          </div>
          <h4 className="text-xl font-serif italic text-slate-950">No Assets Found</h4>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Create your first promotional post</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => {
            const postId = (post as any)._id || post.id;
            return (
              <div key={postId} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                  <img 
                    src={post.image || '/img/placeholder-promo.jpg'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    alt={post.title} 
                  />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-6 right-6 backdrop-blur text-[8px] font-black uppercase px-4 py-2 rounded-full shadow-lg border ${getStatusStyle(post.status || 'draft')}`}>
                    {post.status}
                  </div>
                  
                  {/* Admin Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => { setEditingPost(post); setIsMarketingFormOpen(true); }} 
                      className="p-5 bg-white text-slate-950 rounded-full hover:scale-110 transition-transform shadow-xl"
                    >
                      <Edit2 size={24} />
                    </button>
                    <button 
                      onClick={() => handleDelete(post)} 
                      className="p-5 bg-rose-500 text-white rounded-full hover:scale-110 transition-transform shadow-xl"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>

                <div className="p-10 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-2xl font-serif font-bold text-slate-950 mb-4 italic leading-tight line-clamp-1">{post.title}</h4>
                    <p className="text-sm text-slate-400 font-light italic leading-relaxed line-clamp-3 mb-8">{post.caption}</p>
                  </div>
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="text-[10px] font-bold text-gold-600 truncate mr-4 italic">
                      {post.hashtags || '#LalibelaTerminal'}
                    </div>
                    <button 
                      onClick={() => copyToClipboard(post.caption)} 
                      className="p-3 bg-slate-50 text-slate-300 hover:text-gold-600 rounded-xl transition-all shadow-sm"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default MarketingHub;