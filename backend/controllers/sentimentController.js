const Sentiment = require('sentiment');
const nlp = require('compromise');

const sentiment = new Sentiment();

// Enhanced word lists for more robust sentiment analysis
const positiveWords = [
  'love', 'adore', 'amazing', 'awesome', 'wonderful', 'fantastic', 'great', 'excellent', 
  'brilliant', 'perfect', 'beautiful', 'good', 'nice', 'happy', 'excited', 'thrilled',
  'delighted', 'pleased', 'satisfied', 'content', 'joyful', 'cheerful', 'glad', 'elated',
  'ecstatic', 'overjoyed', 'blissful', 'euphoric', 'optimistic', 'hopeful', 'confident',
  'proud', 'grateful', 'thankful', 'blessed', 'lucky', 'fortunate', 'superb', 'marvelous',
  'spectacular', 'incredible', 'outstanding', 'remarkable', 'impressive', 'extraordinary',
  'phenomenal', 'magnificent', 'splendid', 'divine', 'heavenly', 'paradise', 'ideal',
  'best', 'top', 'premium', 'superior', 'first-class', 'high-quality', 'fancy', 'luxury',
  'treasure', 'gem', 'jewel', 'precious', 'valuable', 'worthwhile', 'beneficial', 'helpful',
  'useful', 'effective', 'successful', 'victorious', 'triumphant', 'winning', 'champion',
  'cool', 'fun', 'entertaining', 'enjoyable', 'pleasant', 'delightful', 'charming',
  'adorable', 'cute', 'sweet', 'lovely', 'gorgeous', 'stunning', 'attractive', 'appealing'
];

const negativeWords = [
  'hate', 'despise', 'loathe', 'detest', 'abhor', 'terrible', 'awful', 'horrible', 'dreadful',
  'disgusting', 'revolting', 'repulsive', 'nasty', 'gross', 'bad', 'poor', 'worst', 'inferior',
  'pathetic', 'useless', 'worthless', 'pointless', 'meaningless', 'hopeless', 'helpless',
  'sad', 'unhappy', 'miserable', 'depressed', 'devastated', 'heartbroken', 'disappointed',
  'frustrated', 'annoyed', 'irritated', 'angry', 'furious', 'enraged', 'outraged', 'livid',
  'mad', 'upset', 'bothered', 'troubled', 'worried', 'anxious', 'stressed', 'overwhelmed',
  'exhausted', 'tired', 'weary', 'drained', 'burnt out', 'fed up', 'sick', 'ill', 'unwell',
  'hurt', 'pain', 'suffering', 'agony', 'torture', 'nightmare', 'disaster', 'catastrophe',
  'crisis', 'problem', 'issue', 'trouble', 'difficulty', 'struggle', 'challenge', 'obstacle',
  'boring', 'dull', 'tedious', 'monotonous', 'tiresome', 'uninteresting', 'bland', 'plain',
  'ugly', 'hideous', 'repugnant', 'offensive', 'disgusting', 'revolting', 'appalling',
  'shocking', 'disturbing', 'alarming', 'frightening', 'scary', 'terrifying', 'horrifying'
];

const neutralWords = [
  'is', 'are', 'was', 'were', 'the', 'a', 'an', 'this', 'that', 'these', 'those',
  'table', 'chair', 'book', 'car', 'house', 'weather', 'temperature', 'time', 'day',
  'okay', 'fine', 'normal', 'regular', 'standard', 'typical', 'average', 'medium',
  'neutral', 'balanced', 'even', 'steady', 'stable', 'consistent', 'uniform'
];

// Enhanced rule-based sentiment analysis
function ruleBased(text) {
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;
  let foundWords = { positive: [], negative: [], neutral: [] };
  
  words.forEach(word => {
    // Remove punctuation
    const cleanWord = word.replace(/[^\w]/g, '');
    
    if (positiveWords.includes(cleanWord)) {
      score += 1;
      positiveCount++;
      foundWords.positive.push(cleanWord);
    } else if (negativeWords.includes(cleanWord)) {
      score -= 1;
      negativeCount++;
      foundWords.negative.push(cleanWord);
    } else if (neutralWords.includes(cleanWord)) {
      neutralCount++;
      foundWords.neutral.push(cleanWord);
    }
  });
  
  let sentiment = 'neutral';
  if (score > 0) sentiment = 'positive';
  else if (score < 0) sentiment = 'negative';
  
  const confidence = Math.min(Math.abs(score) / Math.max(words.length * 0.3, 1), 1);
  
  return {
    sentiment,
    score,
    positiveWords: positiveCount,
    negativeWords: negativeCount,
    neutralWords: neutralCount,
    foundWords,
    confidence,
    explanation: `Found ${positiveCount} positive, ${negativeCount} negative, and ${neutralCount} neutral words.`
  };
}

// Enhanced ML-based sentiment analysis
function mlBased(text) {
  const result = sentiment.analyze(text);
  let sentimentLabel = 'neutral';
  
  // More nuanced scoring
  if (result.score > 0) sentimentLabel = 'positive';
  else if (result.score < 0) sentimentLabel = 'negative';
  
  const confidence = Math.min(Math.abs(result.comparative) * 5, 1);
  
  return {
    sentiment: sentimentLabel,
    score: result.score,
    comparative: result.comparative,
    positive: result.positive,
    negative: result.negative,
    confidence,
    explanation: `ML model analyzed ${result.tokens.length} tokens with comparative score of ${result.comparative.toFixed(3)}.`
  };
}

// Groq AI-based sentiment analysis
async function groqAiBased(text) {
  try {
    const response = await fetch(process.env.GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are an expert sentiment analyzer. Analyze the given text and respond with ONLY a JSON object containing: {"sentiment": "positive|negative|neutral", "confidence": 0.0-1.0, "reasoning": "brief explanation", "emotional_intensity": "low|medium|high"}'
          },
          {
            role: 'user',
            content: `Analyze the sentiment of this text: "${text}"`
          }
        ],
        temperature: 0.1,
        max_tokens: 150
      })
    });

    const data = await response.json();
    const aiResponse = JSON.parse(data.choices[0].message.content);
    
    return {
      sentiment: aiResponse.sentiment,
      confidence: aiResponse.confidence,
      reasoning: aiResponse.reasoning,
      emotionalIntensity: aiResponse.emotional_intensity,
      explanation: `AI analysis: ${aiResponse.reasoning}`
    };
  } catch (error) {
    console.error('Groq AI analysis failed:', error);
    return {
      sentiment: 'neutral',
      confidence: 0,
      reasoning: 'AI analysis unavailable',
      emotionalIntensity: 'low',
      explanation: 'AI analysis failed, using fallback.'
    };
  }
}

const analyzeSentiment = async (req, res) => {
  try {
    const { text, method = 'both' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const result = {};
    
    if (method === 'rule' || method === 'both') {
      result.ruleBased = ruleBased(text);
    }
    
    if (method === 'ai' || method === 'both') {
      result.aiBased = await groqAiBased(text);
    }
    
    // Enhanced metadata extraction
    const doc = nlp(text);
    const emotions = doc.match('#Emotion').out('array');
    const adjectives = doc.match('#Adjective').out('array');
    
    result.metadata = {
      wordCount: text.split(/\s+/).length,
      emotions: emotions,
      adjectives: adjectives,
      timestamp: new Date().toISOString(),
      textLength: text.length
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  analyzeSentiment
};
