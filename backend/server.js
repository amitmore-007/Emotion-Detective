const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

const app = express();

// Enhanced CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (Array.isArray(config.corsOrigin)) {
      // Check if origin is in allowed origins array
      const isAllowed = config.corsOrigin.some(allowedOrigin => {
        if (typeof allowedOrigin === 'string') {
          return origin === allowedOrigin;
        }
        if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return false;
      });
      
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      callback(null, config.corsOrigin === origin);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// Root route - Add this before your API routes
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Emotion Detective API is running!',
    version: '1.0.0',
    environment: config.nodeEnv,
    endpoints: {
      health: '/health',
      sentiment: '/api/sentiment/analyze',
      story: '/api/story/chapters'
    },
    documentation: 'Visit /health for health check'
  });
});

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = config.port;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Emotion Detective API running on port ${PORT}`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`🔗 CORS Origins:`, config.corsOrigin);
});

