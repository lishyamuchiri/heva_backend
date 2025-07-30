const express = require('express');
const Opportunity = require('../models/Opportunity');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, language } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (language) filter.language = language;
    const opportunities = await Opportunity.find(filter).populate('createdBy', 'name organization');
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch opportunities' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, type, amount, deadline, location, description, eligibility, category, featured, language } = req.body;
    const opportunity = new Opportunity({
      title, type, amount, deadline, location, description, eligibility, category, featured, language,
      createdBy: req.user.id,
    });
    await opportunity.save();
    res.status(201).json(opportunity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create opportunity' });
  }
});

router.put('/:id/apply', authMiddleware, async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) return res.status(404).json({ error: 'Opportunity not found' });
    opportunity.applicants += 1;
    await opportunity.save();
    res.json(opportunity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to apply' });
  }
});

module.exports = router;