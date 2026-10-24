const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { protect, adminOnly } = require('../middleware/auth');

// GET all services (public)
router.get('/', async (req, res) => {
  try {
    let services = await Service.find({ available: true });
    if (services.length === 0) {
      services = await Service.insertMany([
        {
          name: 'Private Bartender',
          description: 'Professional bartender for private events, parties, and weddings.',
          price: 350,
          duration: 'per event (up to 5 hours)',
          image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600'
        },
        {
          name: 'Cocktail Masterclass',
          description: 'Interactive cocktail-making class for teams or groups.',
          price: 500,
          duration: '2 hours',
          image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600'
        },
        {
          name: 'Mobile Bar Rental',
          description: 'Fully equipped mobile bar setup for your venue.',
          price: 800,
          duration: 'per day',
          image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600'
        },
        {
          name: 'Event Consultation',
          description: 'One-on-one consultation to plan your beverage experience.',
          price: 200,
          duration: '90 minutes',
          image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600'
        }
      ]);
    }
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one (public)
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, description, price, duration, image, available } = req.body;
    if (!name || !description || price == null || !duration) {
      return res.status(400).json({ error: 'name, description, price, duration required' });
    }
    const service = await Service.create({ name, description, price, duration, image, available });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
