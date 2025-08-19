const storyData = {
  1: {
    id: 1,
    title: "The Enchanted Digital Realm",
    subtitle: "Detective Emma's Mystical Discovery",
    content: "In a realm where emotions flow like rivers of light, Detective Emma discovers a mysterious portal. Each glowing message contains trapped emotions waiting to be freed...",
    character: "emma-happy",
    backgroundGradient: "from-purple-900 via-pink-900 to-indigo-900",
    magicalEffect: "sparkles",
    messages: [
      { text: "I love my car so much!", id: 1, correctAnswer: "positive", difficulty: "easy", reward: "✨" },
      { text: "This homework is terrible.", id: 2, correctAnswer: "negative", difficulty: "easy", reward: "🌟" },
      { text: "The weather is okay today.", id: 3, correctAnswer: "neutral", difficulty: "easy", reward: "💫" },
      { text: "I feel happy about my new job!", id: 12, correctAnswer: "positive", difficulty: "easy", reward: "🎉" }
    ],
    task: "Free the trapped emotions by solving their emotional mysteries!",
    learningGoal: "Become a true Emotion Liberator",
    unlockReward: "🔮 Crystal of Understanding"
  },
  2: {
    id: 2,
    title: "The Floating Islands of Feelings",
    subtitle: "Journey Through Emotional Landscapes",
    content: "Emma soars through floating islands, each representing different emotional realms. Dark clouds swirl around negative emotions while golden light radiates from positive ones...",
    character: "emma-detective",
    backgroundGradient: "from-cyan-900 via-blue-900 to-purple-900",
    magicalEffect: "floating",
    messages: [
      { text: "I'm absolutely thrilled about this incredible discovery!", id: 4, correctAnswer: "positive", difficulty: "medium", reward: "🌈" },
      { text: "This is the most devastating and heartbreaking news ever!", id: 5, correctAnswer: "negative", difficulty: "medium", reward: "⚡" },
      { text: "The cat is sleeping peacefully on the soft mat.", id: 6, correctAnswer: "neutral", difficulty: "medium", reward: "🌙" },
      { text: "I absolutely despise waiting in these endless, frustrating queues!", id: 7, correctAnswer: "negative", difficulty: "medium", reward: "🔥" },
      { text: "The meeting will start at 3 PM in the conference room.", id: 13, correctAnswer: "neutral", difficulty: "medium", reward: "⭐" }
    ],
    task: "Navigate the emotional islands and restore balance to the realm!",
    learningGoal: "Master the art of emotional navigation",
    unlockReward: "🌊 Compass of Emotions"
  },
  3: {
    id: 3,
    title: "The Quantum Laboratory of Thoughts",
    subtitle: "Where Science Meets Magic",
    content: "Deep in the quantum realm, Emma discovers an ancient laboratory where thoughts become reality. Two powerful artifacts await: the Crystal of Rules and the Orb of Intelligence...",
    character: "emma-teacher",
    backgroundGradient: "from-emerald-900 via-teal-900 to-cyan-900",
    magicalEffect: "quantum",
    techniques: ["Crystal of Rules", "Orb of Intelligence"],
    task: "Harness the power of both artifacts to become the ultimate Emotion Detective!",
    learningGoal: "Transcend to Grandmaster Detective",
    messages: [
      { text: "While this pizza has some delightful flavors, the service could be better, though overall it's a decent experience.", id: 8, correctAnswer: "neutral", difficulty: "hard", reward: "👑" },
      { text: "Despite the challenging circumstances, I remain cautiously optimistic about the potential outcomes.", id: 9, correctAnswer: "positive", difficulty: "hard", reward: "💎" },
      { text: "The presentation was informative, yet somewhat underwhelming given the high expectations.", id: 10, correctAnswer: "neutral", difficulty: "hard", reward: "💫" },
      { text: "I'm genuinely ecstatic about this phenomenal breakthrough in our research!", id: 11, correctAnswer: "positive", difficulty: "hard", reward: "🌟" },
      { text: "The weather report indicates partly cloudy skies with temperatures around 68 degrees.", id: 14, correctAnswer: "neutral", difficulty: "hard", reward: "🌈" }
    ],
    unlockReward: "👑 Crown of Emotional Mastery"
  }
};

const getStoryChapter = (req, res) => {
  try {
    const chapter = parseInt(req.params.chapter);
    
    if (!chapter || chapter < 1 || chapter > Object.keys(storyData).length) {
      return res.status(400).json({ error: 'Invalid chapter number' });
    }
    
    const chapterData = storyData[chapter];
    res.json(chapterData);
  } catch (error) {
    console.error('Error fetching story chapter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllChapters = (req, res) => {
  try {
    res.json({
      totalChapters: Object.keys(storyData).length,
      chapters: storyData
    });
  } catch (error) {
    console.error('Error fetching all chapters:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getStoryChapter,
  getAllChapters
};
