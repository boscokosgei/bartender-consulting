const express = require('express');
const router = express.Router();
const Solution = require('../models/Solution');

router.get('/', async (req, res) => {
  try {
    let solutions = await Solution.find();
    if (solutions.length === 0) {
      solutions = await Solution.insertMany([
        {
          title: 'Menu Development',
          description: 'Custom cocktail menus designed for your venue, season, and target audience.',
          icon: '📋',
          features: ['Signature cocktails', 'Seasonal rotations', 'Cost optimization']
        },
        {
          title: 'Staff Training',
          description: 'Hands-on training for your bar team on technique, speed, and hospitality.',
          icon: '🎓',
          features: ['Mixology basics', 'Speed & efficiency', 'Customer service']
        },
        {
          title: 'Bar Operations',
          description: 'Optimize your bar workflow, inventory, and profitability.',
          icon: '📊',
          features: ['Inventory systems', 'Cost control', 'Workflow design']
        },
        {
          title: 'Beverage Program',
          description: 'Full beverage program strategy from concept to execution.',
          icon: '🍾',
          features: ['Concept design', 'Supplier sourcing', 'Brand alignment']
        }
      ]);
    }
    res.json(solutions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
