

export enum MenuCategory {
  ALL = 'All',
  APPETIZERS = 'Starters',
  MAINS_MEAT = 'Meat Mains',
  VEGAN = 'Vegetarian & Vegan',
  COMBOS = 'Signature Combos',
  RED_WINES = 'Red Wines',
  WHITE_WINES = 'White Wines',
  SPIRITS = 'Spirits & Beers',
  BEERS = 'Beers',
  SOFT_DRINKS = 'Soft Drinks',
  HOT_DRINKS = 'Hot Drinks',
  DESSERTS = 'Desserts'
}

export enum TableZone {
  BAR = 'Bar Room',
  VILLAGE = 'Village (Bet)',
  OUTDOOR = 'Outdoor',
  CHURCH = 'Church',
  LALIBELA = 'LALIBELA', 
  GARDEN = 'GARDEN'
}

export enum ReservationStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled',
  NO_SHOW = 'No-show'
}

// RoomAvailability type defined as a record of TableZone to boolean
export type RoomAvailability = Record<TableZone, boolean>;

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number | string;
  category: MenuCategory;
  image?: string;
  isAvailable: boolean;
  chefTip?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Reservation {
  id: string;
  referenceCode: string;
  date: string;
  time: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  tableZone: TableZone;
  tableId: string;
  timestamp: number;
  status: ReservationStatus;
}

export interface BusinessInfo {
  address: string;
  phone: string;
  email: string;
  hours: {
    monFri: string;
    satSun: string;
  };
}

export interface RestaurantEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
}

export interface MarketingPost {
  id: string;
  title: string;
  caption: string;
  hashtags: string;
  image: string;
  status: 'draft' | 'scheduled' | 'live';
}