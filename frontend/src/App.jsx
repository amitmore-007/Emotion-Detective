import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import StoryMode from './components/StoryMode';
import PlaygroundMode from './components/PlaygroundMode';
import AboutPage from './components/AboutPage';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full">
        <Router>
          <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
          <main className="w-full">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/story" element={<StoryMode currentUser={currentUser} />} />
              <Route path="/playground" element={<PlaygroundMode />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
         