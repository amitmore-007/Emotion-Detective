const storyData = {
  1: {
    title: "Meet Detective Emma",
    content: "Hi! I'm Emma, a young detective who solves mysteries using emotions! Today, I received mysterious messages and I need your help to understand how people are feeling.",
    character: "emma",
    messages: [
      "I love this new game!",
      "This homework is terrible.",
      "The weather is okay today."
    ],
    task: "Help me identify if these messages show positive, negative, or neutral feelings!"
  },
  2: {
    title: "The Case of the Missing Smile",
    content: "Someone stole all the smiles from our town! I found these clues. Can you help me analyze them?",
    character: "emma",
    messages: [
      "I'm so happy we found the treasure!",
      "This is the worst day ever!",
      "The cat is sleeping on the mat.",
      "I hate when it rains on my birthday!"
    ],
    task: "Analyze these clues to help solve the mystery!"
  },
  3: {
    title: "Learning the Detective's Secret",
    content: "Let me teach you my secret techniques! There are different ways to detect emotions in text.",
    character: "emma",
    techniques: ["Rule-Based Detection", "AI-Powered Analysis"],
    task: "Try both methods and see the difference!"
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
