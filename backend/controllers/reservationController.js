const Reservation = require('../models/Reservation');
const crypto = require('crypto');

exports.createReservation = async (req, res) => {
  try {
    const refCode = `LAB-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const reservation = await Reservation.create({
      ...req.body,
      referenceCode: refCode
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin only: Update status or Delete (as requested, delete is admin only)
exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
};

// Add this to your controller file

exports.updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // We search by the MongoDB _id and only update the status field
    const updated = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true } // 'new: true' returns the updated document
    );

    if (!updated) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};