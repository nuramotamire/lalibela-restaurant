import React from 'react';
import { Quote, Star, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const REVIEWS = [
  {
    id: '1',
    text: "The standout for me was the coffee ceremony; with coffee beans roasted right in front of you, served alongside fragrant frankincense. It's a nice multi sensory touch that rounds off the meal well. Every dish was tasty.",
    author: "Chris Lloyd-Jones",
    role: "Local Guide",
    stars: 5,
    date: "2 years ago"
  },
  {
    id: '2',
    text: "Lovely Ethiopian restaurant. Great place for an introduction to Ethiopian cuisine. We then got dessert accompanied by a traditional coffee ceremony - we felt we couldn’t leave without trying coffee from its birthplace.",
    author: "Zubair Shehraz",
    role: "Verified Guest",
    stars: 5,
    date: "2 years ago"
  },
  {
    id: '3',
    text: "Every vegans dream! This platter of vegan dishes was so so tasty and comforting. Such individual tastes to each dish. The staff were so lovely and this place has such a homely and relaxing feel.",
    author: "Tayla",
    role: "Plant-Based Diner",
    stars: 5,
    date: "3 years ago"
  },
  {
    id: '4',
    text: "Wonderful food and friendly staff! Also beautiful interior decor. Highly recommend for anyone looking for an authentic experience in London.",
    author: "Penni Geb",
    role: "Verified Guest",
    stars: 5,
    date: "a year ago"
  },
  {
    id: '5',
    text: "First time having Ethiopian food and wow ... just incredible. Very vegan friendly as we had the veggie platter and a side of okra. Service was great and pricing totally fine.",
    author: "Philip Brady",
    role: "First-time Visitor",
    stars: 5,
    date: "4 years ago"
  },
  {
    id: '6',
    text: "The best ... The flavours, textures and aroma were so well balanced. Not to mention friendly and welcoming staff... The plain fabric screens between tables added an intimate ambience.",
    author: "Laurens Francis",
    role: "Regular Guest",
    stars: 5,
    date: "4 years ago"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-24">
      {/* Decorative Brand Textures */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white opacity-[0.03] pointer-events-none"></div>
      <Quote className="absolute -top-10 -right-10 text-white w-72 h-72 opacity-[0.02] rotate-12" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brandRed-400 uppercase tracking-[0.5em] font-black text-[9px] mb-4 block">Guest Voices</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-5 italic">What Our Guests Say</h2>
            <p className="text-slate-400 text-base font-light italic">Experiences that speak for themselves, straight from Google Maps.</p>
            <div className="w-16 h-px bg-brandRed-500/30 mx-auto mt-6"></div>
          </motion.div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {REVIEWS.map((review, i) => (
            <motion.div 
              key={review.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="break-inside-avoid bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:border-brandRed-500/30 transition-all duration-500 group relative"
            >
              {/* Google Badge Overlay */}
              <div className="absolute top-5 right-6 flex items-center gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-0.5">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} size={7} className="fill-brandRed-400 text-brandRed-400" />
                  ))}
                </div>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                  alt="Google" 
                  className="w-2.5 h-2.5 grayscale brightness-200"
                />
              </div>

              <div className="mb-6 text-brandRed-400 opacity-30 group-hover:opacity-100 transition-opacity">
                <MessageSquare size={18} />
              </div>

              <p className="text-slate-200 italic leading-relaxed mb-8 font-serif text-lg">
                "{review.text}"
              </p>

              <div className="flex items-center justify-between pt-5 border-t border-white/5">
                <div>
                  <p className="font-bold text-white text-[13px] tracking-tight">{review.author}</p>
                  <p className="text-brandRed-400 text-[9px] font-black uppercase tracking-widest mt-0.5">
                    {review.role}
                  </p>
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-white/20">
                  {review.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <a 
            href="https://www.google.com/search?q=Lalibela+Restaurant+London+reviews" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all group"
          >
            Read more on Google <Star size={12} className="group-hover:rotate-12 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;