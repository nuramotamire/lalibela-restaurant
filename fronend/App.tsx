import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// API Service
import api from './src/services/api';

// Component Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import MenuSection from './components/MenuSection';
import Experience from './components/Experience';
import DiningRooms from './components/DiningRooms';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import VisitUs from './components/VisitUs';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import PromotionSection from './components/PromotionSection';
import ReservationListModal from './components/Admin/ReservationModal/ReservationListModal';

// Types
import { 
  Reservation, MenuItem, MenuCategory, BusinessInfo, 
  RestaurantEvent, ReservationStatus, MarketingPost, 
  RoomAvailability, TableZone 
} from './types';

// Fallback / Static Data
const INITIAL_BUSINESS_INFO: BusinessInfo = {
  address: '137 Fortess Road, London NW5 2HR England',
  phone: '+44 20 7284 0600',
  email: 'info@lalibela-restaurant.com',
  hours: { monFri: '5:00 PM - 11:00 PM', satSun: '12:00 PM - 11:00 PM' }
};

const INITIAL_EVENTS: RestaurantEvent[] = [
  { id: 'e1', title: 'Traditional Dance Performance', date: 'Every Weekend', description: 'Experience the vibrant Eskista dance with your meal.' }
];

const App: React.FC = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // LIVE STATE
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [marketingPosts, setMarketingPosts] = useState<MarketingPost[]>([]);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(INITIAL_BUSINESS_INFO);
  const [events] = useState<RestaurantEvent[]>(INITIAL_EVENTS);
  
  const [roomAvailability] = useState<RoomAvailability>({
    [TableZone.BAR]: true,
    [TableZone.VILLAGE]: true,
    [TableZone.OUTDOOR]: true,
    [TableZone.CHURCH]: true,
  });

  // --- FETCH REAL DATA FROM DATABASE ---
  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        setLoading(true);
        // Concurrent fetch for performance
        const [menuRes, marketingRes] = await Promise.all([
          api.get('/menu'),
          api.get('/marketing')
        ]);
        
        setMenuItems(menuRes.data);
        setMarketingPosts(marketingRes.data);
      } catch (err) {
        console.error("Error fetching live site data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicData();
  }, []);

  // --- HANDLERS ---
  const handleOpenReservation = () => setIsReservationOpen(true);
  
  const handleAddReservation = (reservation: Reservation) => {
    setReservations(prev => [...prev, reservation]);
  };

  const handleUpdateReservationStatus = (id: string, status: ReservationStatus) => {
    setReservations(prev => prev.map(res => 
      ((res as any)._id === id || res.id === id) ? { ...res, status } : res
    ));
  };

  const handleUpdateMenu = (newItems: MenuItem[]) => setMenuItems(newItems);
  const handleUpdateBusinessInfo = (newInfo: BusinessInfo) => setBusinessInfo(newInfo);
  const handleUpdateMarketingPosts = (newPosts: MarketingPost[]) => setMarketingPosts(newPosts);

  return (
    <Router>
      <div className="font-sans antialiased text-brandRed-950 bg-white selection:bg-brandRed-100">
        <Navbar onReserve={handleOpenReservation} />

        <Routes>
          {/* Main Website Route */}
          <Route path="/" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero onReserve={handleOpenReservation} />
              <Philosophy />
              
              {/* Marketing Section: Only show if posts exist or if loading */}
              {marketingPosts.length > 0 && (
                <PromotionSection posts={marketingPosts} />
              )}
              
              <MenuSection items={menuItems} />
              <Experience events={events} />
              <DiningRooms />
              <Gallery />
              <Testimonials />
              <VisitUs onReserve={handleOpenReservation} businessInfo={businessInfo} />
            </motion.div>
          } />

          {/* Admin / Staff Portal Route */}
          <Route path="/admin" element={
            <ReservationListModal 
              isOpen={true} 
              onClose={() => window.location.href = '/'} 
              reservations={reservations}
              menuItems={menuItems}
              businessInfo={businessInfo}
              marketingPosts={marketingPosts}
              onUpdateMenu={handleUpdateMenu}
              onUpdateBusinessInfo={handleUpdateBusinessInfo}
              onUpdateReservationStatus={handleUpdateReservationStatus}
              onUpdateMarketingPosts={handleUpdateMarketingPosts}
            />
          } />

          {/* Dedicated Menu Route */}
          <Route path="/menu" element={
            <div className="pt-20">
              <MenuSection items={menuItems} />
            </div>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <Footer />
        
        {/* Global Reservation Overlay */}
        <ReservationModal 
          isOpen={isReservationOpen} 
          onClose={() => setIsReservationOpen(false)}
          onSubmit={handleAddReservation}
          reservations={reservations}
          roomAvailability={roomAvailability}
        />
      </div>
    </Router>
  );
};

export default App;