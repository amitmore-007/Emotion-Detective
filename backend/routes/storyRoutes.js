const express = require('express');
const { getStoryChapter, getAllChapters } = require('../controllers/storyController');

const router = express.Router();

// GET /api/story/chapters - Get all chapters
router.get('/chapters', getAllChapters);

// GET /api/story/:chapter - Get specific chapter
router.get('/:chapter', getStoryChapter);

module.exports = router;
