const express = require('express');
const router = express.Router();
// Import all functions from the correctly named file
const { 
  createReservation, 
  getReservations, 
  deleteReservation, 
  updateReservationStatus 
} = require('../controllers/reservationController'); 
const { protect } = require('../middleware/authMiddleware');

router.post('/', createReservation); 
router.get('/', protect, getReservations); 
router.delete('/:id', protect, deleteReservation); 

// This route handles the Cancel / No-Show buttons
router.put('/:id', protect, updateReservationStatus); 

module.exports = router;