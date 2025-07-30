const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  timestamp: { type: Date, default: Date.now },
  language: { type: String, default: 'en' }, // For multilingual support
});

module.exports = mongoose.model('Message', messageSchema);