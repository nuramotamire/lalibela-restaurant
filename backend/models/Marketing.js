const mongoose = require('mongoose');

const MarketingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  caption: { type: String, required: true },
  status: { type: String, enum: ['draft', 'scheduled', 'live'], default: 'draft' },
  image: { type: String }, // Stores Cloudinary URL or Base64
  hashtags: { type: String, default: '#LalibelaTerminal' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Marketing', MarketingSchema);