require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.NODE_ENV === 'production' 
    ? [
        process.env.FRONTEND_URL,
        'https://emotion-detective-1.onrender.com', // Replace with your actual frontend URL
        /\.onrender\.com$/, // Allow all onrender.com subdomains
      ]
    : [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173'
      ],
  
  // Sentiment analysis configuration
  sentiment: {
    positiveThreshold: 0.1,
    negativeThreshold: -0.1,
    confidenceMultiplier: 10
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },
  
  groqApiKey: process.env.GROQ_API_KEY,
  groqApiUrl: process.env.GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions'
};

module.exports = config;
