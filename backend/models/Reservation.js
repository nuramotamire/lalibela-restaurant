const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  referenceCode: { type: String, unique: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  tableZone: { 
    type: String, 
    enum: ['Bar Room', 'Village (Bet)', 'Outdoor', 'Church'],
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Confirmed', 'Cancelled', 'No-show', 'Pending'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);