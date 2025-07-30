const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: String,
  language: { type: String, default: 'en' }, // For multilingual support
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FAQ', faqSchema);
