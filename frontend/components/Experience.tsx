
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Utensils, ShoppingBag, Clock, Music, Calendar } from 'lucide-react';
import { RestaurantEvent } from '../types';

interface ExperienceProps {
  events: RestaurantEvent[];
}

const Experience: React.FC<ExperienceProps> = ({ events }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut" as const
      }
    })
  };

  const experiences = [
    { 
      icon: <Leaf size={32} />, 
      title: "Vegetarian, Vegan & Gluten-Free Friendly", 
      text: "Our menu caters to all dietary needs, offering a wide selection of vegetarian, vegan, and gluten-free dishes without compromising on flavor." 
    },
    { 
      icon: <Utensils size={32} />, 
      title: "Ethiopian Cuisine", 
      text: "Discover the rich and diverse flavors of African and Ethiopian cuisine, with traditional dishes that bring the heart of Ethiopia to your table." 
    },
    { 
      icon: <ShoppingBag size={32} />, 
      title: "Takeout & Table Service", 
      text: "Enjoy Lalibela at home with our takeout service or experience full table service in our culturally immersive dining space." 
    },
    { 
      icon: <Clock size={32} />, 
      title: "Lunch, Dinner, & After-Hours", 
      text: "Whether you’re stopping by for a quick lunch, a leisurely dinner, or a late-night meal, Lalibela serves authentic Ethiopian flavors throughout the day." 
    }
  ];

  return (
    <section id="experience" className="py-24 bg-white overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-brandRed-500 uppercase tracking-[0.5em] font-black text-[10px] mb-4">The Experience</h2>
          <h3 className="text-4xl md:text-6xl font-serif text-brandRed-950 italic">Every Detail Matters</h3>
          <div className="w-24 h-[1px] bg-brandRed-500/20 mx-auto mt-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {experiences.map((item, i) => (
            <motion.div 
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={cardVariants}
              className="text-center p-10 rounded-[2rem] border border-brandRed-50 hover:border-brandRed-500/20 hover:shadow-2xl transition-all duration-500 group bg-white flex flex-col items-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brandRed-50 text-brandRed-500 mb-8 group-hover:bg-brandRed-500 group-hover:text-white transition-all duration-500 shadow-sm">
                {item.icon}
              </div>
              <h4 className="text-xl font-serif font-bold mb-4 text-brandRed-950 group-hover:text-brandRed-500 transition-colors leading-tight">
                {item.title}
              </h4>
              <p className="text-brandRed-900/60 leading-relaxed text-sm font-light">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Events Feature */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-brandRed-950 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12">
            <Music size={150} />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center lg:justify-start gap-3 text-brandRed-400 mb-6"
              >
                <Calendar size={20} />
                <span className="uppercase tracking-[0.4em] font-black text-[10px]">Live at Lalibela</span>
              </motion.div>
              <motion.h4 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif mb-6 italic"
              >
                Cultural Moments.
              </motion.h4>
              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/60 leading-relaxed font-light text-lg"
              >
                From traditional Eskista dance performances to contemporary jazz, we host regular cultural events that bring the vibrant spirit of Ethiopia to life.
              </motion.p>
            </div>
            
            <div className="grid gap-4 w-full lg:w-auto">
              {events.map((event, i) => (
                <motion.div 
                  key={event.id} 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group min-w-[320px] max-w-md"
                >
                  <span className="text-brandRed-400 font-black text-[9px] uppercase tracking-[0.3em] block mb-2">{event.date}</span>
                  <h5 className="font-serif text-2xl mb-3 group-hover:text-brandRed-400 transition-colors">{event.title}</h5>
                  <p className="text-sm text-white/40 font-light leading-relaxed">{event.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
