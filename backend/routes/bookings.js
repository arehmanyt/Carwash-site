const express = require('express');
const Booking = require('../models/Booking');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// PUBLIC — Create a booking
router.post('/', async (req, res) => {
  try {
    const { name, phone, service, branch, date, time } = req.body;
    if (!name || !phone || !service || !branch || !date || !time)
      return res.status(400).json({ message: 'All fields are required.' });

    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ADMIN — Get all bookings with optional filters
router.get('/', protect, async (req, res) => {
  try {
    const filter = {};
    if (req.query.branch && req.query.branch !== 'All') filter.branch = req.query.branch;
    if (req.query.status && req.query.status !== 'All') filter.status = req.query.status;
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN — Get single booking
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN — Update booking (status, notes, etc.)
router.patch('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ADMIN — Delete booking
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });
    res.json({ message: 'Booking deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
