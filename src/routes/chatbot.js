
const express = require('express');
const authMiddleware = require('../middleware/auth');
const Message = require('../models/Message');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { message, room, language } = req.body;
    // Placeholder: Integrate with AI service (e.g., Gemini)
    const botResponse = `AI Response to: ${message}`; // Replace with actual AI call
    const userMessage = new Message({
      room: room || 'general',
      user: req.user.id,
      text: message,
      language,
    });
    await userMessage.save();
    res.json({ response: botResponse, message: userMessage });
  } catch (error) {
    res.status(500).json({ error: 'Chatbot error' });
  }
});

module.exports = router;