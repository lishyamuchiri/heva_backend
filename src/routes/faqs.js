// routes/faqs.js
const authMiddleware = require('../middleware/auth');
const express = require('express');
const redis = require('redis');
const FAQ = require('../models/FAQ');

const router = express.Router();

// Redis client setup (singleton pattern recommended)
let redisClient;
(async () => {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  });
  redisClient.on('error', (err) => console.error('Redis Error:', err));
  await redisClient.connect();
})();

// Helper function for cache invalidation
const invalidateCache = async (category = 'all', language = 'en') => {
  const patterns = [
    `faqs:${category}:${language}`,
    'faqs:all:*' // Invalidate all language variants if needed
  ];
  await Promise.all(patterns.map(pattern => redisClient.del(pattern)));
};

router.get('/', async (req, res) => {
  try {
    const { category = 'all', language = 'en' } = req.query;
    const cacheKey = `faqs:${category}:${language}`;
    
    // Check cache
    const cachedFAQs = await redisClient.get(cacheKey);
    if (cachedFAQs) return res.json(JSON.parse(cachedFAQs));
    
    // Query database
    const filter = {};
    if (category !== 'all') filter.category = category;
    if (language !== 'en') filter.language = language;
    
    const faqs = await FAQ.find(filter);
    
    // Cache results (1 hour TTL)
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(faqs));
    res.json(faqs);
  } catch (error) {
    console.error('GET FAQs Error:', error);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { question, answer, category = 'general', language = 'en' } = req.body;
    
    // Validate required fields
    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required' });
    }

    const faq = new FAQ({ question, answer, category, language });
    await faq.save();
    
    // Invalidate relevant cache
    await invalidateCache(category, language);
    res.status(201).json(faq);
  } catch (error) {
    console.error('POST FAQ Error:', error);
    res.status(400).json({ error: 'Failed to create FAQ' });
  }
});

module.exports = router;