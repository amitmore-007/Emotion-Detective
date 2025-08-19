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

// Routes - Place API routes before static file serving
app.use('/api', routes);

// Root route with comprehensive API information
app.get('/', (req, res) => {
  const uptime = process.uptime();
  const uptimeFormatted = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`;
  
  res.status(200).json({
    success: true,
    message: 'Emotion Detective API is running!',
    version: '1.0.0',
    environment: config.nodeEnv,
    uptime: uptimeFormatted,
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      sentiment: {
        analyze: '/api/sentiment/analyze',
        description: 'POST - Analyze sentiment of text'
      },
      story: {
        chapters: '/api/story/chapters',
        description: 'GET - Retrieve story chapters'
      }
    },
    usage: {
      example: 'POST /api/sentiment/analyze with {"text": "I love this!", "method": "both"}',
      cors: 'CORS enabled for allowed origins',
      contentType: 'application/json'
    },
    status: 'Backend is operational and ready to serve requests'
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler for API routes only
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found'
  });
});

const PORT = config.port;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Emotion Detective API running on port ${PORT}`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`🔗 CORS Origins:`, config.corsOrigin);
});

// Handle server errors gracefully
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.log('💡 Solutions:');
    console.log('   1. Stop the existing process using that port');
    console.log('   2. Change the PORT in your .env file');
    console.log('   3. Kill the process: npx kill-port 5000');
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n🔄 Received SIGINT, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

