const express = require('express');
const sentimentRoutes = require('./sentimentRoutes');
const storyRoutes = require('./storyRoutes');

const router = express.Router();

// API status endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Emotion Detective API',
    version: '1.0.0',
    availableEndpoints: [
      'GET /api/story/chapters',
      'GET /api/story/:chapter',
      'POST /api/sentiment/analyze'
    ]
  });
});

// Mount route modules
router.use('/sentiment', sentimentRoutes);
router.use('/story', storyRoutes);

module.exports = router;
