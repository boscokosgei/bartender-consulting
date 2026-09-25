const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '🍸' },
  features: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Solution', solutionSchema);
