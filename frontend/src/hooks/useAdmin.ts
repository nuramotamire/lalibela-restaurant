import { useState, useEffect } from 'react';
import api from '../services/api';
import { Reservation, MenuItem, MarketingPost, ReservationStatus } from '@/types';

export const useAdmin = (isOpen: boolean) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    reservations: [] as Reservation[],
    menuItems: [] as MenuItem[],
    marketingPosts: [] as MarketingPost[]
  });

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) setIsAuthenticated(true);
  }, []);

  // Fetch all data when authenticated and modal is open
const fetchAllData = async () => {
    if (!isAuthenticated || !isOpen) return;
    setLoading(true);
    try {
      // Added marketingReq to the concurrent fetch
      const [resReq, menuReq, marketingReq] = await Promise.all([
        api.get('/reservations'),
        api.get('/menu'),
        api.get('/marketing') // Fetch the marketing posts from the route we created
      ]);

      setData({
        reservations: resReq.data,
        menuItems: menuReq.data,
        marketingPosts: marketingReq.data // Update the marketing state here
      });
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllData(); }, [isAuthenticated, isOpen]);

  const login = async (username: string, passkey: string) => {
    try {
      const response = await api.post('/auth/login', { username, password: passkey });
      localStorage.setItem('adminToken', response.data.token);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || "Login Failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

const updateReservationStatus = async (id: string, status: ReservationStatus) => {
  try {
    // Log for debugging
    console.log("Attempting update for ID:", id, "Status:", status);

    if (!id) {
      console.error("No ID provided to updateReservationStatus");
      return;
    }

    // Match your backend route: router.put('/:id', ...)
    const response = await api.put(`/reservations/${id}`, { status });

    if (response.status === 200) {
      setData(prev => ({
        ...prev,
        reservations: prev.reservations.map(r => 
          // Check for both id (frontend) and _id (backend/MongoDB)
          (r.id === id || (r as any)._id === id) ? { ...r, status } : r
        )
      }));
    }
  } catch (err: any) {
    console.error("Update Failed:", err.response?.data || err.message);
  }
};
  return { isAuthenticated, login, logout, data, loading, updateReservationStatus, refresh: fetchAllData };
};