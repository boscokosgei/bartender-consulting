const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

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

router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
