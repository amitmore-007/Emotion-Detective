const express = require('express');
const { analyzeSentiment } = require('../controllers/sentimentController');

const router = express.Router();

// POST /api/sentiment/analyze
router.post('/analyze', analyzeSentiment);

module.exports = router;
