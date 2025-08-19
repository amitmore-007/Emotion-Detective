# The Emotion Detective 🕵️‍♀️

An interactive web application that teaches 6th-grade students about Sentiment Analysis through storytelling and hands-on activities.

## Features

- **Interactive Story Mode**: Follow Detective Emma's adventure to learn sentiment analysis concepts
- **Playground Mode**: Experiment with real sentiment analysis tools
- **Dual Analysis Methods**: Compare rule-based and AI-powered approaches
- **Engaging UI**: Beautiful animations and responsive design
- **Educational Content**: Age-appropriate explanations and examples

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express
- **Analysis**: Natural Language Processing libraries (Sentiment, Natural, Compromise)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with required variables (see `.env.example`)

4. Start the server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with `VITE_API_URL=http://localhost:5000`

4. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:3000

## How to Use

1. **Start with the Story**: Begin with Detective Emma's adventure to learn the basics
2. **Practice in Playground**: Try your own text and see both analysis methods
3. **Learn More**: Visit the About page for deeper understanding

## Educational Goals

- Understand what sentiment analysis is and why it's important
- Learn the difference between rule-based and AI-powered approaches
- Practice identifying emotions in text
- Explore real-world applications of sentiment analysis

## Deployment

For production deployment:

1. Build the frontend:
```bash
cd frontend && npm run build
```

2. Deploy backend to your preferred platform (Heroku, Railway, etc.)
3. Deploy frontend to Netlify, Vercel, or similar
4. Update API endpoints in production

### Deployment on Render

#### Option 1: Using render.yaml (Recommended)
1. Connect your GitHub repository to Render
2. Render will automatically detect the `render.yaml` file
3. Set the following environment variables in Render dashboard:
   - Backend: `NODE_ENV=production`
   - Frontend: `VITE_API_URL=https://your-backend-service.onrender.com`

#### Option 2: Manual Setup
1. **Backend Service:**
   - Create a new Web Service
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables:
     - `NODE_ENV=production`
     - `FRONTEND_URL=https://your-frontend-service.onrender.com`

2. **Frontend Service:**
   - Create a new Static Site
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Environment Variables:
     - `VITE_API_URL=https://your-backend-service.onrender.com`

### Important Notes
- Update CORS origins in backend config with your actual Render URLs
- The backend includes a `/health` endpoint for health checks
- Make sure to set all required environment variables in Render dashboard

## Contributing

Feel free to contribute by:
- Adding more story chapters
- Improving the UI/UX
- Adding more analysis methods
- Creating additional exercises


