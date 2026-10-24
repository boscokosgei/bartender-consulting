const express = require('express');
const router = express.Router();
const Upselling = require('../models/Upselling');

router.get('/', async (req, res) => {
  try {
    let items = await Upselling.find();
    if (items.length === 0) {
      items = await Upselling.insertMany([
        // Front Office
        {
          category: 'front-office',
          title: 'Check-in Upselling Scripts',
          description: 'Train front desk staff to naturally offer room upgrades, late checkout, and packages at check-in.',
          icon: '🛎️',
          features: ['Scripted conversations', 'Objection handling', 'KPI tracking']
        },
        {
          category: 'front-office',
          title: 'Loyalty Program Promotion',
          description: 'Convert walk-ins into loyalty members with compelling value propositions and incentives.',
          icon: '⭐',
          features: ['Sign-up incentives', 'Membership tiers', 'Follow-up cadence']
        },
        {
          category: 'front-office',
          title: 'Concierge Add-On Sales',
          description: 'Upsell tours, transfers, and experiences through your concierge desk.',
          icon: '🗺️',
          features: ['Partner network', 'Commission structures', 'Booking workflow']
        },
        // Food & Beverage
        {
          category: 'food-beverage',
          title: 'Menu Engineering & Placement',
          description: 'Design menu layouts that guide guests toward high-margin items.',
          icon: '📖',
          features: ['Item placement', 'Pricing psychology', 'Visual hierarchy']
        },
        {
          category: 'food-beverage',
          title: 'Cocktail Pairing Program',
          description: 'Create curated cocktail pairings for every course to boost average ticket size.',
          icon: '🍸',
          features: ['Course pairing', 'Server training', 'Seasonal rotation']
        },
        {
          category: 'food-beverage',
          title: 'Server Upselling Playbook',
          description: 'Equip servers with a repeatable framework for suggesting appetizers, desserts, and premium pours.',
          icon: '🍽️',
          features: ['Suggestive selling', 'Timing cues', 'Upsell metrics']
        }
      ]);
    }
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
