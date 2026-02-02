// import React, { useState, useRef, useEffect } from 'react';
// import { MessageCircle, X, Send, Sparkles, Utensils } from 'lucide-react';
// import { ChatMessage, MenuItem } from '../types';
// import { sendMessageToConcierge } from '../services/geminiService';

// interface ChatAssistantProps {
//   menuItems: MenuItem[];
// }

// const ChatAssistant: React.FC<ChatAssistantProps> = ({ menuItems }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     { role: 'model', text: 'Enqwan Dehna Metachihu. I am Sebastian, your personal concierge. May I guide you through the rich spice landscapes of Lalibela today?', timestamp: Date.now() }
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim() || loading) return;

//     const userMessage: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       const menuContext = `
//         Current available items: ${menuItems.filter(i => i.isAvailable).map(i => `${i.name} (£${i.price})`).join(', ')}.
//         Currently sold out: ${menuItems.filter(i => !i.isAvailable).map(i => i.name).join(', ')}.
//       `;
      
//       const history = messages.map(m => ({ role: m.role, text: m.text }));
//       const enhancedMessage = `[Menu Context: ${menuContext}] User: ${userMessage.text}`;
      
//       const responseText = await sendMessageToConcierge(enhancedMessage, history);
      
//       const botMessage: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       console.error(error);
//       const errorMessage: ChatMessage = { role: 'model', text: "I apologize, the connection to our kitchen is momentarily interrupted. Please try again.", timestamp: Date.now() };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className={`fixed bottom-6 right-6 z-40 bg-brandRed-500 text-white p-4 rounded-full shadow-2xl hover:bg-gold-500 hover:text-brandRed-950 transition-all transform hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
//         aria-label="Open Concierge"
//       >
//         <MessageCircle size={28} />
//       </button>

//       <div className={`fixed bottom-6 right-6 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 transform origin-bottom-right overflow-hidden border border-brandRed-950/10 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`} style={{ height: '550px' }}>
        
//         <div className="bg-brandRed-950 p-5 flex justify-between items-center text-white">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-brandRed-950 shadow-inner">
//               <Sparkles size={22} />
//             </div>
//             <div>
//               <h3 className="font-serif font-bold text-lg leading-tight tracking-widest">Sebastian</h3>
//               <div className="flex items-center gap-1">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 <p className="text-[10px] text-gold-400 uppercase tracking-widest font-bold">Lalibela Concierge</p>
//               </div>
//             </div>
//           </div>
//           <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors p-1">
//             <X size={24} />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
//           {messages.map((msg, idx) => (
//             <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//               <div 
//                 className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
//                   msg.role === 'user' 
//                     ? 'bg-brandRed-900 text-white rounded-tr-none' 
//                     : 'bg-white text-brandRed-950 border border-slate-100 rounded-tl-none'
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//           {loading && (
//             <div className="flex justify-start">
//                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
//                  <div className="flex space-x-2">
//                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
//                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
//                  </div>
//                </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         <div className="p-4 bg-white border-t border-slate-100">
//           <div className="flex gap-2 mb-2">
//             <button 
//               onClick={() => setInput('What do you recommend?')}
//               className="text-[10px] bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full hover:bg-gold-500 hover:text-brandRed-950 transition-colors font-black uppercase tracking-tighter"
//             >
//               Recommendations
//             </button>
//             <button 
//               onClick={() => setInput('Tell me about Shiro.')}
//               className="text-[10px] bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full hover:bg-gold-500 hover:text-brandRed-950 transition-colors font-black uppercase tracking-tighter"
//             >
//               About Shiro
//             </button>
//           </div>
//           <div className="flex space-x-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//               placeholder="Ask about spices..."
//               className="flex-1 px-4 py-3 border border-slate-100 rounded-xl focus:outline-none focus:border-gold-500 text-sm text-brandRed-950 bg-slate-50 shadow-inner"
//             />
//             <button 
//               onClick={handleSend}
//               disabled={loading || !input.trim()}
//               className="bg-brandRed-500 text-white p-3 rounded-xl hover:bg-gold-500 hover:text-brandRed-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
//             >
//               <Send size={20} />
//             </button>
//           </div>
//           <p className="text-[10px] text-center text-slate-400 mt-3 font-black uppercase tracking-widest">A Modern Pilgrimage to Tradition</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChatAssistant;