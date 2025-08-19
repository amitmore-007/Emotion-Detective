const express = require('express');
const sentimentRoutes = require('./sentimentRoutes');
const storyRoutes = require('./storyRoutes');

const router = express.Router();

// Mount routes
router.use('/sentiment', sentimentRoutes);
router.use('/story', storyRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Emotion Detective API is running!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
