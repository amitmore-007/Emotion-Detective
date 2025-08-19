import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, RotateCcw, BookOpen, TrendingUp, MessageCircle } from 'lucide-react';
import SentimentAnalyzer from './SentimentAnalyzer';
import { useTheme } from '../contexts/ThemeContext';

const PlaygroundMode = () => {
  const [currentText, setCurrentText] = useState('');
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const { isDark } = useTheme();

  const exampleTexts = [
    "I absolutely love this amazing weather today!",
    "This movie was terrible and boring.",
    "The book is on the table.",
    "I'm so excited about my birthday party!",
    "I hate waiting in long lines.",
    "The temperature is 75 degrees.",
    "This is the best day of my life!",
    "I'm really disappointed with the results."
  ];

  const handleAnalyze = () => {
    if (currentText.trim()) {
      setShowComparison(true);
    }
  };

  const handleExampleClick = (text) => {
    setCurrentText(text);
    setShowComparison(false);
  };

  const resetPlayground = () => {
    setCurrentText('');
    setShowComparison(false);
    setAnalysisHistory([]);
  };

  const addToHistory = (text, results) => {
    setAnalysisHistory(prev => [...prev.slice(-4), { text, results, timestamp: Date.now() }]);
  };

  return (
    <div className={`min-h-screen w-full pt-20 relative overflow-hidden transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${
              isDark ? 'bg-cyan-400/20' : 'bg-blue-500/25'
            }`}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`title-font text-4xl mb-4 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Sentiment Analysis Playground
          </h1>
          <p className={`text-xl ${
            isDark ? 'text-purple-200' : 'text-indigo-600'
          }`}>
            Experiment with your own text and see how different methods analyze emotions!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <motion.div
            className={`p-6 rounded-3xl backdrop-blur-xl border ${
              isDark 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white/80 border-gray-200 shadow-lg'
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              <MessageCircle className={`mr-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              Input Text
            </h2>

            <div className="space-y-4">
              <textarea
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                placeholder="Type your text here to analyze its sentiment..."
                className={`w-full h-32 p-4 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  isDark 
                    ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                    : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                }`}
                maxLength={500}
              />

              <div className="flex space-x-2">
                <button
                  onClick={handleAnalyze}
                  disabled={!currentText.trim()}
                  className="btn-primary flex items-center space-x-2 flex-1"
                >
                  <Send size={20} />
                  <span>Analyze</span>
                </button>
                <button
                  onClick={resetPlayground}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                    isDark 
                      ? 'bg-white/10 text-white hover:bg-white/20' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>

            {/* Example Texts */}
            <div className="mt-6">
              <h3 className={`font-semibold mb-3 flex items-center ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <BookOpen className="mr-2" size={18} />
                Try These Examples:
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {exampleTexts.map((text, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(text)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                      isDark 
                        ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400 text-gray-300' 
                        : 'bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 text-gray-700'
                    }`}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Analysis Panel */}
          <motion.div
            className={`lg:col-span-2 p-6 rounded-3xl backdrop-blur-xl border ${
              isDark 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white/80 border-gray-200 shadow-lg'
            }`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {showComparison && currentText ? (
              <SentimentAnalyzer
                text={currentText}
                showBothMethods={true}
                onAnalysisComplete={(results, isCorrect) => {
                  addToHistory(currentText, results);
                }}
              />
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4">🔬</div>
                <h3 className={`text-2xl font-semibold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Ready to Experiment!
                </h3>
                <p className={`max-w-md mx-auto ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Enter your own text or click on an example to see how different 
                  sentiment analysis methods work. Compare rule-based and AI-powered approaches!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Analysis History */}
        {analysisHistory.length > 0 && (
          <motion.div
            className={`mt-8 p-6 rounded-3xl backdrop-blur-xl border ${
              isDark 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white/80 border-gray-200 shadow-lg'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className={`text-2xl font-bold mb-6 flex items-center ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              <TrendingUp className={`mr-2 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              Analysis History
            </h2>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {analysisHistory.slice().reverse().map((item, index) => (
                <div key={item.timestamp} className={`p-3 rounded-lg ${
                  isDark ? 'bg-white/5' : 'bg-gray-50'
                }`}>
                  <p className={`text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-800'
                  }`}>
                    "{item.text.substring(0, 50)}{item.text.length > 50 ? '...' : ''}"
                  </p>
                  <div className="flex space-x-4 text-xs">
                    {item.results.ruleBased && (
                      <span className={`px-2 py-1 rounded ${
                        item.results.ruleBased.sentiment === 'positive' 
                          ? isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-800'
                          : item.results.ruleBased.sentiment === 'negative' 
                          ? isDark ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-800'
                          : isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-800'
                      }`}>
                        Rule: {item.results.ruleBased.sentiment}
                      </span>
                    )}
                    {item.results.aiBased && (
                      <span className={`px-2 py-1 rounded ${
                        item.results.aiBased.sentiment === 'positive' 
                          ? isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-800'
                          : item.results.aiBased.sentiment === 'negative' 
                          ? isDark ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-800'
                          : isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-800'
                      }`}>
                        AI: {item.results.aiBased.sentiment}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PlaygroundMode;
