const mongoose = require('mongoose');

const upsellingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // 'front-office' | 'food-beverage'
  icon: { type: String, default: '💡' },
  features: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Upselling', upsellingSchema);
