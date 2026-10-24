const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/bookings  (customer creates a booking)
router.post('/', protect, async (req, res) => {
  try {
    const { serviceId, eventDate, notes } = req.body;
    if (!serviceId || !eventDate) {
      return res.status(400).json({ error: 'serviceId and eventDate required' });
    }

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ error: 'Service not found' });

    const booking = await Booking.create({
      user: req.user._id,
      service: service._id,
      eventDate,
      notes,
      totalPrice: service.price
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings/mine  (customer's own bookings)
router.get('/mine', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('service');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings  (admin: all bookings)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('service').populate('user', 'name email');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/bookings/:id/status (admin)
router.patch('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('service').populate('user', 'name email');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
