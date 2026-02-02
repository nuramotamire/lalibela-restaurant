
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassWater, Home, Trees, Church as ChurchIcon, Sparkles, Coffee, ChevronRight, Info } from 'lucide-react';

const DiningRooms: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState('bar');

  const rooms = [
    {
      id: 'bar',
      title: 'Bar Room',
      subtitle: 'Modern Social Vibrancy',
      description: 'The Bar room is a lively, vibrant space inspired by Ethiopia’s modern social scene. Ethiopians love to gather, share stories, and enjoy good company with drinks and small bites.',
      story: 'In Ethiopian culture, gatherings often take place around drinks like t’ej, a traditional honey wine that has been enjoyed for centuries, and talla, a home-brewed beer made from barley. Historically, these drinks have been central to celebrations, weddings, and festivals, symbolizing the joy and unity of a shared moment.',
      image: '/img/bar1.jpeg',
      icon: <GlassWater size={20} />,
      menu: [
        { name: 'Ethiopian Coffee Ceremony', price: '£3.95' },
        { name: 'White Wine', price: '£3.95' },
        { name: 'Champagne', price: '£3.95' },
        { name: 'Tej', price: '£3.95' }
      ]
    },
    {
      id: 'village',
      title: 'Village (Bet)',
      subtitle: 'Heart of Hospitality',
      description: 'Bet means “home” in Amharic, and this room is designed to make you feel just that—at home. The cozy atmosphere, traditional furniture, and warm lighting bring the Ethiopian spirit of hospitality to life.',
      story: 'In Ethiopian culture, gursha—the act of feeding someone else by hand—is a gesture of love and friendship. In Bet, you’ll feel like family, where meals are served in the most intimate and welcoming manner. The walls are adorned with Ethiopian art, celebrating the deep-rooted traditions of unity and hospitality.',
      image: '/img/village_room.jpg',
      icon: <Home size={20} />
    },
    {
      id: 'outdoor',
      title: 'Outdoor',
      subtitle: 'Paradise Garden',
      description: 'The Paradise Garden is a lush and vibrant space, designed to evoke the beauty of Ethiopia’s natural landscapes, from the green highlands to the vast valleys.',
      story: 'Ethiopia is known for its breathtaking scenery, often described as “paradise on earth.” Sometimes called the “Water Tower of Africa” because of its many rivers and lakes, this natural abundance inspired our garden—a place to escape and experience the bounty of the land.',
      image: '/img/outdoor_room.jpg',
      icon: <Trees size={20} />
    },
    {
      id: 'church',
      title: 'Church',
      subtitle: 'Sacred Rock-Hewn Serenity',
      description: 'Modeled after the spiritual heart of Ethiopian culture, the Church room is serene and peaceful, with stunning traditional décor reminiscent of Ethiopia’s rock-hewn churches.',
      story: 'Ethiopia is one of the world’s oldest Christian nations. The Church Room celebrates our rich spiritual heritage, particularly Lalibela—the town famous for its monolithic rock churches. The intricate cross motifs and soft candle lighting evoke the mystical and spiritual aura of these ancient sites.',
      image: '/img/church_room.jpg',
      icon: <ChurchIcon size={20} />
    }
  ];

  const currentRoom = rooms.find(r => r.id === activeRoom) || rooms[0];

  return (
    <section id="environments" className="py-24 bg-white scroll-mt-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brandRed-500 uppercase tracking-[0.5em] font-black text-[10px] mb-4 block underline underline-offset-8 decoration-brandRed-500/20">Our Sanctums</span>
            <h2 className="text-4xl md:text-6xl font-serif text-brandRed-950 mb-6 italic leading-tight">Explore Our Dining Rooms</h2>
            <p className="text-brandRed-900/60 font-light text-lg italic">Each room at Lalibela tells a different chapter of our cultural journey.</p>
          </motion.div>
        </div>

        {/* Room Navigator Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <div className="flex p-2 bg-brandRed-50 rounded-[2rem] border border-brandRed-100 shadow-sm overflow-x-auto no-scrollbar">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-500 whitespace-nowrap group ${
                  activeRoom === room.id 
                    ? 'bg-brandRed-500 text-white shadow-lg scale-105' 
                    : 'text-brandRed-900 hover:bg-brandRed-100'
                }`}
              >
                <div className={`${activeRoom === room.id ? 'text-white' : 'text-brandRed-400'} transition-colors`}>
                  {room.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">{room.title}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Content Panel */}
        <div className="relative min-h-[700px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoom}
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20"
            >
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 relative group"
              >
                <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl border border-brandRed-50">
                  <motion.img
                    src={currentRoom.image}
                    alt={currentRoom.title}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brandRed-950/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-12 left-12">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brandRed-100/50 mb-2 block">Atmosphere</span>
                    <h4 className="text-4xl font-serif text-white italic">{currentRoom.subtitle}</h4>
                  </div>
                </div>
                {/* Visual Accent */}
                <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-brandRed-100 rounded-full blur-3xl opacity-50"></div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="lg:w-1/2 flex flex-col justify-center py-6"
              >
                <div className="mb-10">
                  <h3 className="text-4xl md:text-5xl font-serif text-brandRed-950 mb-6 font-bold">{currentRoom.title}</h3>
                  <p className="text-brandRed-900/70 text-lg font-light leading-relaxed mb-8">
                    {currentRoom.description}
                  </p>
                </div>

                {/* Cultural Story Block */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  className="bg-offWhite p-10 rounded-[3rem] border border-brandRed-100 relative overflow-hidden group mb-10 shadow-sm"
                >
                  <Sparkles size={120} className="absolute -top-10 -right-10 text-brandRed-500/5 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-[1px] bg-brandRed-500"></div>
                      <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brandRed-500">Cultural Story</span>
                    </div>
                    <p className="text-brandRed-950 font-serif italic text-xl leading-relaxed">
                      "{currentRoom.story}"
                    </p>
                  </div>
                </motion.div>

                {/* Specific Bar Menu */}
                {currentRoom.menu && (
                  <div className="pt-4 border-t border-brandRed-100">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-brandRed-400 mb-8 flex items-center gap-3">
                      <Coffee size={14} /> Room Highlights
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {currentRoom.menu.map((item, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex justify-between items-end border-b border-brandRed-50 pb-2 group cursor-default"
                        >
                          <span className="text-sm font-bold text-brandRed-900 group-hover:text-brandRed-500 transition-colors">{item.name}</span>
                          <span className="text-xs font-black text-brandRed-500 bg-brandRed-50 px-2 py-1 rounded-lg">{item.price}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {!currentRoom.menu && (
                  <div className="flex items-center gap-4 text-brandRed-500/30">
                    <Info size={18} />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em]">Full Table Service Available</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DiningRooms;
