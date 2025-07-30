const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['Grant', 'Event', 'Workshop', 'Mentorship'], required: true },
  amount: String,
  deadline: Date,
  location: String,
  description: String,
  eligibility: String,
  category: String,
  applicants: { type: Number, default: 0 },
  featured: Boolean,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  language: { type: String, default: 'en' }, // For multilingual support
});

module.exports = mongoose.model('Opportunity', opportunitySchema);