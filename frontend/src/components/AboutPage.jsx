import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Calculator, Users, Target, Lightbulb, Heart, ChevronRight, BookOpen, Zap, Sparkles, Eye, Globe, Rocket } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const { isDark } = useTheme(); // Use actual theme context

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({ // Reduced from 15
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1, // Reduced size
      speed: Math.random() * 1.5 + 0.5, // Reduced speed variation
      opacity: Math.random() * 0.4 + 0.2, // Reduced opacity
    }));
    setParticles(newParticles);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    let timeoutId;
    const handleMouseMove = (e) => {
      if (timeoutId) return; // Throttle updates
      timeoutId = setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        timeoutId = null;
      }, 16); // ~60fps max
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: BookOpen,
      gradient: 'from-cyan-400 via-blue-500 to-purple-600',
      theme: 'cosmic'
    },
    {
      id: 'what-is',
      title: 'What is Sentiment Analysis?',
      icon: Brain,
      gradient: 'from-pink-500 via-purple-500 to-indigo-600',
      theme: 'neural'
    },
    {
      id: 'methods',
      title: 'Analysis Methods',
      icon: Calculator,
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      theme: 'tech'
    },
    {
      id: 'applications',
      title: 'Real-World Uses',
      icon: Target,
      gradient: 'from-orange-400 via-red-500 to-pink-600',
      theme: 'dynamic'
    },
    {
      id: 'fun-facts',
      title: 'Fun Facts',
      icon: Lightbulb,
      gradient: 'from-yellow-400 via-orange-500 to-red-600',
      theme: 'energy'
    }
  ];

  // Optimized FloatingParticles with reduced complexity
  const FloatingParticles = React.memo(() => (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${isDark ? 'bg-gradient-to-r from-cyan-400 to-purple-600' : 'bg-gradient-to-r from-blue-400 to-indigo-600'}`}
          style={{
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            x: [particle.x, particle.x + 50, particle.x - 25, particle.x], // Reduced movement range
            y: [particle.y, particle.y - 50, particle.y + 25, particle.y],
          }}
          transition={{
            duration: 8 + particle.speed, // Reduced duration
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  ));

  // Simplified InteractiveCursor for better performance
  const InteractiveCursor = React.memo(() => (
    <motion.div
      className="fixed pointer-events-none z-50 hidden md:block"
      animate={{
        x: mousePosition.x - 10,
        y: mousePosition.y - 10,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={`w-4 h-4 rounded-full ${isDark ? 'bg-gradient-to-r from-cyan-400 to-purple-600' : 'bg-gradient-to-r from-blue-400 to-indigo-600'} opacity-50 blur-sm`} />
    </motion.div>
  ));

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="relative"
          >
            {/* Floating title with 3D effect */}
            <motion.div
              className="relative mb-16 text-center"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <h1 className={`text-8xl font-black leading-tight ${isDark ? 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-transparent' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent'}`}>
                SENTIMENT
                <br />
                <span className="text-6xl">ANALYSIS</span>
                <br />
                <span className="text-4xl font-light">EXPLAINED</span>
              </h1>
              <motion.div
                className={`absolute -inset-4 blur-3xl -z-10 ${isDark ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20' : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'}`}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            {/* Floating description */}
            <motion.div
              className="max-w-4xl mx-auto mb-20 relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-2xl text-gray-300 leading-relaxed text-center relative z-10 p-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 font-semibold">
                  Sentiment Analysis
                </span>{" "}
                is a powerful computational technique that automatically identifies and extracts emotional information from text data. It uses{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400 font-semibold">
                  natural language processing
                </span>{" "}
                and machine learning to determine whether a piece of text expresses positive, negative, or neutral sentiment.
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 blur-2xl -z-10 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>

            {/* Interactive floating elements */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { emoji: '📊', title: 'Data Processing', desc: 'Analyzes millions of text documents automatically', color: 'from-cyan-400 to-blue-600', delay: 0 },
                { emoji: '🧠', title: 'AI Understanding', desc: 'Uses machine learning to understand human emotions', color: 'from-purple-400 to-pink-600', delay: 0.2 },
                { emoji: '📈', title: 'Business Insights', desc: 'Provides actionable insights for decision making', color: 'from-emerald-400 to-teal-600', delay: 0.4 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative group cursor-pointer"
                  initial={{ y: 100, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ delay: item.delay + 0.8, duration: 0.8 }}
                  whileHover={{ 
                    y: -20, 
                    rotateY: 10, 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Glowing background effect */}
                  <motion.div
                    className={`absolute -inset-6 bg-gradient-to-r ${item.color} opacity-30 blur-2xl rounded-full`}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  />
                  
                  {/* Main content */}
                  <div className="relative z-10 text-center p-8">
                    <motion.div
                      className="text-8xl mb-6"
                      animate={{ 
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        delay: index * 2
                      }}
                    >
                      {item.emoji}
                    </motion.div>
                    
                    <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Floating orbs around each element */}
                  <motion.div
                    className={`absolute top-0 right-0 w-4 h-4 bg-gradient-to-r ${item.color} rounded-full`}
                    animate={{
                      x: [0, 30, 0],
                      y: [0, -20, 0],
                      scale: [1, 0.8, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  />
                  <motion.div
                    className={`absolute bottom-0 left-0 w-3 h-3 bg-gradient-to-r ${item.color} rounded-full opacity-60`}
                    animate={{
                      x: [0, -20, 0],
                      y: [0, 20, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.7 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      
      case 'what-is':
        return (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Neural network background */}
            <div className="absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              {/* Animated brain icon */}
              <motion.div
                className="flex justify-center mb-12"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "backOut" }}
              >
                <motion.div
                  className="relative"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Brain className="text-purple-500" size={120} />
                  <motion.div
                    className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>

              <motion.h2
                className="text-6xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                UNDERSTANDING TEXT EMOTIONS
              </motion.h2>

              <motion.p
                className="text-2xl text-gray-300 text-center max-w-4xl mx-auto mb-20 leading-relaxed"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Sentiment analysis is the computational study of <span className="text-cyan-400 font-semibold">opinions, sentiments, and emotions</span> expressed in text. 
                It combines linguistics, computer science, and psychology to automatically determine the{" "}
                <span className="text-pink-400 font-semibold">emotional tone</span> behind words, helping us understand human feelings at scale.
              </motion.p>

              {/* Emotion spectrum visualization */}
              <div className="relative max-w-6xl mx-auto">
                <div className="flex items-center justify-between space-x-8">
                  {/* Positive side */}
                  <motion.div
                    className="flex-1 relative"
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <div className="relative z-10 text-center p-12">
                      <motion.div
                        className="text-9xl mb-8"
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        😊
                      </motion.div>
                      
                      <h3 className="text-4xl font-bold text-green-400 mb-6">POSITIVE SENTIMENT</h3>
                      
                      <div className="space-y-4">
                        {['excellent', 'amazing', 'outstanding', 'brilliant'].map((word, index) => (
                          <motion.div
                            key={word}
                            className="inline-block mx-2 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full text-green-300 font-semibold text-xl border border-green-500/30"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 + index * 0.2 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                          >
                            {word}
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div
                        className="mt-8 p-6 bg-green-900/30 rounded-2xl border border-green-500/30"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.5 }}
                      >
                        <p className="text-green-300 text-lg font-medium">
                          "This product exceeded my expectations! Absolutely fantastic quality and service."
                        </p>
                        <p className="text-green-400 text-sm mt-2 font-bold">Confidence: 95% Positive</p>
                      </motion.div>
                    </div>

                    {/* Floating positive particles */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-3xl rounded-full"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                      transition={{ duration: 6, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Divider with animated line */}
                  <motion.div
                    className="w-px h-80 relative"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-green-500 via-yellow-500 to-red-500" />
                    <motion.div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full"
                      animate={{ y: [0, 320, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>

                  {/* Negative side */}
                  <motion.div
                    className="flex-1 relative"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <div className="relative z-10 text-center p-12">
                      <motion.div
                        className="text-9xl mb-8"
                        animate={{ 
                          rotate: [0, -10, 10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                      >
                        😠
                      </motion.div>
                      
                      <h3 className="text-4xl font-bold text-red-400 mb-6">NEGATIVE SENTIMENT</h3>
                      
                      <div className="space-y-4">
                        {['terrible', 'disappointing', 'awful', 'frustrating'].map((word, index) => (
                          <motion.div
                            key={word}
                            className="inline-block mx-2 px-6 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full text-red-300 font-semibold text-xl border border-red-500/30"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2 + index * 0.2 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                          >
                            {word}
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div
                        className="mt-8 p-6 bg-red-900/30 rounded-2xl border border-red-500/30"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.7 }}
                      >
                        <p className="text-red-300 text-lg font-medium">
                          "Complete waste of money. Poor quality and terrible customer support. Highly disappointed."
                        </p>
                        <p className="text-red-400 text-sm mt-2 font-bold">Confidence: 92% Negative</p>
                      </motion.div>
                    </div>

                    {/* Floating negative particles */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 blur-3xl rounded-full"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
                      transition={{ duration: 6, repeat: Infinity, delay: 3 }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'methods':
        return (
          <motion.div
            initial={{ opacity: 0, rotateX: 90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: -90 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.h2
              className="text-6xl font-black text-center mb-20 bg-gradient-to-r from-emerald-400 to-cyan-600 bg-clip-text text-transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
            >
              SENTIMENT ANALYSIS APPROACHES
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
              {/* Lexicon-Based Method */}
              <motion.div
                className="relative group"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                whileHover={{ scale: 1.02, rotateY: 5 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute -inset-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-2xl rounded-3xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />

                <div className="relative z-10 p-12 text-center">
                  <motion.div
                    className="flex justify-center mb-8"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <BookOpen className="text-blue-400" size={80} />
                  </motion.div>

                  <h3 className="text-4xl font-bold text-blue-400 mb-8">LEXICON-BASED APPROACH</h3>
                  
                  <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                    Uses predefined dictionaries of <span className="text-cyan-400 font-semibold">sentiment words</span> with 
                    assigned polarity scores to analyze text emotions systematically.
                  </p>

                  <div className="space-y-8">
                    {[
                      { step: 1, text: 'Load sentiment lexicon (VADER, TextBlob, etc.)', icon: BookOpen, delay: 0.5 },
                      { step: 2, text: 'Match words in text to lexicon entries', icon: Eye, delay: 0.7 },
                      { step: 3, text: 'Calculate aggregate sentiment scores', icon: Calculator, delay: 0.9 },
                      { step: 4, text: 'Apply rules for negation and amplifiers', icon: Target, delay: 1.1 }
                    ].map((item) => (
                      <motion.div
                        key={item.step}
                        className="flex items-center space-x-6 group/step"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: item.delay }}
                      >
                        <motion.div
                          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          animate={{ y: [-2, 2, -2] }}
                          transition={{ duration: 3, repeat: Infinity, delay: item.step * 0.5 }}
                        >
                          {item.step}
                        </motion.div>
                        
                        <div className="flex-1 flex items-center space-x-4">
                          <item.icon className="text-cyan-400 group-hover/step:text-blue-400 transition-colors" size={24} />
                          <p className="text-gray-300 text-lg group-hover/step:text-white transition-colors">
                            {item.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Additional info box */}
                  <motion.div
                    className="mt-8 p-6 bg-blue-900/30 rounded-2xl border border-blue-500/30"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <p className="text-blue-300 text-sm font-medium">
                      <strong>Pros:</strong> Fast, interpretable, works without training data<br/>
                      <strong>Cons:</strong> Limited by dictionary coverage, struggles with context
                    </p>
                  </motion.div>

                  {/* Floating calculation symbols */}
                  {['+', '-', '×', '÷'].map((symbol, index) => (
                    <motion.div
                      key={symbol}
                      className="absolute text-4xl font-bold text-blue-400/30"
                      style={{
                        left: `${20 + index * 20}%`,
                        top: `${10 + index * 15}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.3, 0.6, 0.3],
                        rotate: [0, 10, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {symbol}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Machine Learning Method */}
              <motion.div
                className="relative group"
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                whileHover={{ scale: 1.02, rotateY: -5 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute -inset-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl rounded-3xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -2, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, delay: 3 }}
                />

                <div className="relative z-10 p-12 text-center">
                  <motion.div
                    className="flex justify-center mb-8 relative"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Brain className="text-purple-400" size={80} />
                    <motion.div
                      className="absolute inset-0 bg-purple-400/30 blur-xl rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  <h3 className="text-4xl font-bold text-purple-400 mb-8">MACHINE LEARNING APPROACH</h3>
                  
                  <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                    Trains algorithms on <span className="text-pink-400 font-semibold">labeled datasets</span> to 
                    automatically learn patterns and features that indicate sentiment.
                  </p>

                  <div className="space-y-8">
                    {[
                      { step: 1, text: 'Collect and preprocess training data', icon: Globe, delay: 0.6 },
                      { step: 2, text: 'Extract features (n-grams, TF-IDF)', icon: Zap, delay: 0.8 },
                      { step: 3, text: 'Train classifier (SVM, Random Forest)', icon: Brain, delay: 1.0 },
                      { step: 4, text: 'Evaluate and fine-tune model', icon: Target, delay: 1.2 }
                    ].map((item) => (
                      <motion.div
                        key={item.step}
                        className="flex items-center space-x-6 group/step"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: item.delay }}
                      >
                        <motion.div
                          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg"
                          whileHover={{ scale: 1.1, rotate: -10 }}
                          animate={{ y: [-2, 2, -2] }}
                          transition={{ duration: 3, repeat: Infinity, delay: (item.step + 3) * 0.5 }}
                        >
                          {item.step}
                        </motion.div>
                        
                        <div className="flex-1 flex items-center space-x-4">
                          <item.icon className="text-pink-400 group-hover/step:text-purple-400 transition-colors" size={24} />
                          <p className="text-gray-300 text-lg group-hover/step:text-white transition-colors">
                            {item.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Additional info box */}
                  <motion.div
                    className="mt-8 p-6 bg-purple-900/30 rounded-2xl border border-purple-500/30"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.7 }}
                  >
                    <p className="text-purple-300 text-sm font-medium">
                      <strong>Pros:</strong> High accuracy, learns from data, handles context<br/>
                      <strong>Cons:</strong> Requires labeled data, computationally intensive
                    </p>
                  </motion.div>

                  {/* Neural network visualization */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-400/50 rounded-full"
                        style={{
                          left: `${15 + i * 15}%`,
                          top: `${20 + (i % 2) * 40}%`,
                        }}
                        animate={{
                          scale: [1, 2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                    
                    {/* Connecting lines between nodes */}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={`line-${i}`}
                        className="absolute h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"
                        style={{
                          left: '20%',
                          right: '20%',
                          top: `${30 + i * 20}%`,
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Deep Learning section */}
            <motion.div
              className="mt-16 max-w-4xl mx-auto text-center"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <h3 className="text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">
                MODERN DEEP LEARNING
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                Advanced techniques like <span className="text-yellow-400 font-semibold">BERT, RoBERTa, and GPT</span> use 
                transformer architectures to understand context, sarcasm, and nuanced emotions with unprecedented accuracy.
              </p>
            </motion.div>
          </motion.div>
        );

      case 'applications':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.h2
              className={`text-6xl font-black text-center mb-20 ${isDark ? 'bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent' : 'bg-gradient-to-r from-orange-600 to-red-700 bg-clip-text text-transparent'}`}
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "backOut" }}
            >
              REAL-WORLD APPLICATIONS
            </motion.h2>

            {/* Hexagonal Grid Layout */}
            <div className="relative max-w-6xl mx-auto">
              {/* Center Hub */}
              <div className="flex justify-center mb-16">
                <motion.div
                  className="relative z-30"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 1, ease: "backOut" }}
                >
                  <motion.div
                    className={`w-56 h-56 rounded-full backdrop-blur-xl border-2 flex flex-col items-center justify-center text-center p-6 shadow-2xl ${
                      isDark 
                        ? 'bg-gradient-to-br from-orange-500/30 to-red-500/30 border-orange-400/50' 
                        : 'bg-gradient-to-br from-orange-400/40 to-red-400/40 border-orange-500/60'
                    }`}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(249, 115, 22, 0.4)", 
                        "0 0 0 20px rgba(249, 115, 22, 0)", 
                        "0 0 0 0 rgba(249, 115, 22, 0.4)"
                      ],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ 
                      boxShadow: { duration: 2, repeat: Infinity },
                      rotate: { duration: 8, repeat: Infinity },
                      scale: { duration: 0.3 }
                    }}
                  >
                    <motion.div 
                      className="text-6xl mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🎯
                    </motion.div>
                    <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
                      SENTIMENT
                    </h3>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                      ANALYSIS
                    </h3>
                    <p className={`text-sm mt-2 ${isDark ? 'text-orange-200' : 'text-orange-800'}`}>
                      Transforming Industries
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              {/* Application Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    emoji: '💬',
                    title: 'Social Media Monitoring',
                    subtitle: 'Brand Intelligence',
                    desc: 'Track brand mentions, analyze customer feedback, and monitor public opinion across Twitter, Facebook, Instagram, and other platforms in real-time.',
                    color: 'from-blue-500 to-cyan-500',
                    stats: '500M+ posts analyzed daily',
                    delay: 0.8
                  },
                  {
                    emoji: '⭐',
                    title: 'Customer Reviews',
                    subtitle: 'E-commerce Insights',
                    desc: 'Automatically categorize product reviews, identify key issues, and help businesses improve their offerings based on customer sentiment.',
                    color: 'from-yellow-500 to-orange-500',
                    stats: '50M+ reviews processed',
                    delay: 1.0
                  },
                  {
                    emoji: '📞',
                    title: 'Customer Support',
                    subtitle: 'Service Optimization',
                    desc: 'Analyze support tickets and chat logs to identify frustrated customers, prioritize urgent issues, and improve service quality.',
                    color: 'from-green-500 to-emerald-500',
                    stats: '10M+ tickets analyzed',
                    delay: 1.2
                  },
                  {
                    emoji: '💹',
                    title: 'Financial Markets',
                    subtitle: 'Trading Intelligence',
                    desc: 'Analyze news articles, earnings calls, and social media to predict stock movements and make informed investment decisions.',
                    color: 'from-purple-500 to-indigo-500',
                    stats: '1M+ financial docs',
                    delay: 1.4
                  },
                  {
                    emoji: '🗳️',
                    title: 'Political Analysis',
                    subtitle: 'Public Opinion',
                    desc: 'Monitor political campaigns, analyze voter sentiment, and track public opinion on policies and candidates during elections.',
                    color: 'from-red-500 to-pink-500',
                    stats: '100M+ political posts',
                    delay: 1.6
                  },
                  {
                    emoji: '🏥',
                    title: 'Healthcare Feedback',
                    subtitle: 'Patient Experience',
                    desc: 'Analyze patient reviews, medical surveys, and feedback forms to improve healthcare services and patient satisfaction.',
                    color: 'from-teal-500 to-cyan-500',
                    stats: '5M+ patient reviews',
                    delay: 1.8
                  }
                ].map((app, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ scale: 0, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ 
                      delay: app.delay, 
                      duration: 0.6, 
                      ease: "backOut",
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <motion.div
                      className="relative cursor-pointer h-full"
                      whileHover={{ 
                        scale: 1.05, 
                        rotateY: 5,
                        z: 20
                      }}
                      animate={{ 
                        y: [-3, 3, -3]
                      }}
                      transition={{ 
                        y: { duration: 4, repeat: Infinity, delay: index * 0.5 },
                        scale: { duration: 0.3 },
                        rotateY: { duration: 0.3 }
                      }}
                    >
                      {/* Enhanced Glow Effect */}
                      <motion.div
                        className={`absolute -inset-4 bg-gradient-to-r ${app.color} opacity-0 group-hover:opacity-30 blur-xl rounded-3xl transition-opacity duration-500`}
                        animate={{ 
                          opacity: [0.1, 0.2, 0.1],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                      />
                      
                      {/* Main Card */}
                      <div className={`relative z-10 h-full p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 group-hover:border-opacity-50 ${
                        isDark 
                          ? `bg-gradient-to-br from-blue-500/10 to-cyan-500/20 border-white/20` 
                          : `bg-gradient-to-br from-blue-500/20 to-cyan-500/30 border-gray-300/30`
                      }`}>
                        
                        {/* Icon with enhanced animation */}
                        <motion.div
                          className="text-center mb-6"
                          whileHover={{ scale: 1.1 }}
                          animate={{ 
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ 
                            rotate: { duration: 6, repeat: Infinity, delay: index * 0.4 },
                            scale: { duration: 3, repeat: Infinity, delay: index * 0.2 }
                          }}
                        >
                          <div className="text-6xl mb-3 filter drop-shadow-lg">
                            {app.emoji}
                          </div>
                          
                          {/* Animated background circle */}
                          <motion.div
                            className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-r ${app.color} opacity-20 rounded-full blur-xl -z-10`}
                            animate={{ 
                              scale: [1, 1.3, 1],
                              rotate: [0, 180, 360]
                            }}
                            transition={{ duration: 8, repeat: Infinity, delay: index * 0.5 }}
                          />
                        </motion.div>
                        
                        {/* Content */}
                        <div className="text-center space-y-4">
                          <div>
                            <h4 className={`text-2xl font-bold mb-1 bg-gradient-to-r ${app.color} bg-clip-text text-transparent`}>
                              {app.title}
                            </h4>
                            <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {app.subtitle}
                            </p>
                          </div>
                          
                          <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {app.desc}
                          </p>
                          
                          {/* Statistics badge */}
                          <motion.div
                            className={`inline-block px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r ${app.color} text-white shadow-lg`}
                            whileHover={{ scale: 1.05 }}
                            animate={{ 
                              boxShadow: [
                                "0 4px 15px rgba(0,0,0,0.1)", 
                                "0 8px 25px rgba(0,0,0,0.15)", 
                                "0 4px 15px rgba(0,0,0,0.1)"
                              ]
                            }}
                            transition={{ 
                              boxShadow: { duration: 2, repeat: Infinity, delay: index * 0.3 }
                            }}
                          >
                            {app.stats}
                          </motion.div>
                        </div>

                        {/* Decorative corner elements */}
                        <motion.div
                          className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-r ${app.color} rounded-full opacity-60`}
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        />
                        
                        <motion.div
                          className={`absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r ${app.color} rounded-full opacity-40`}
                          animate={{ 
                            scale: [1, 1.3, 1],
                            x: [0, 3, 0],
                            y: [0, -3, 0]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Connecting lines animation */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-px h-16 ${isDark ? 'bg-gradient-to-b from-transparent via-orange-400/30 to-transparent' : 'bg-gradient-to-b from-transparent via-orange-600/30 to-transparent'}`}
                  style={{
                    left: `${20 + (i % 4) * 20}%`,
                    top: `${30 + Math.floor(i / 4) * 25}%`,
                    transform: `rotate(${i * 30}deg)`,
                  }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    scaleY: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Floating particles for ambiance */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full opacity-40 ${isDark ? 'bg-orange-400' : 'bg-orange-600'}`}
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        );

      case 'fun-facts':
        return (
          <motion.div
            initial={{ opacity: 0, rotateY: 180 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -180 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Animated title with lightbulb */}
            <div className="relative text-center mb-16">
              <motion.div
                className="inline-flex items-center space-x-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "backOut" }}
              >
                <motion.div
                  className="relative"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Lightbulb className={`${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} size={80} />
                  <motion.div
                    className={`absolute inset-0 blur-2xl rounded-full ${isDark ? 'bg-yellow-400/30' : 'bg-yellow-600/30'}`}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                <motion.h2
                  className={`text-6xl font-black ${isDark ? 'bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent' : 'bg-gradient-to-r from-yellow-600 to-orange-700 bg-clip-text text-transparent'}`}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  FASCINATING<br/>FACTS & STATS!
                </motion.h2>
              </motion.div>
            </div>

            {/* Fixed grid layout for facts */}
            <motion.div className="max-w-7xl mx-auto">
                {[
                  { fact: "📈 Over 90% of Fortune 500 companies use sentiment analysis to monitor their brand reputation and customer satisfaction in real-time!", color: 'from-cyan-400 to-blue-500' },
                  { fact: "🚀 The global sentiment analysis market is expected to reach $15.1 billion by 2027, growing at 15.1% annually!", color: 'from-purple-400 to-pink-500' },
                  { fact: "🌐 Sentiment analysis can now accurately detect emotions in over 100 languages, including Arabic, Chinese, Hindi, and Swahili!", color: 'from-green-400 to-emerald-500' },
                  { fact: "🎭 Detecting sarcasm is still one of the biggest challenges - even humans get it wrong 25% of the time in text!", color: 'from-orange-400 to-red-500' },
                  { fact: "⚡ Modern AI models can process and analyze the sentiment of 1 million tweets in under 30 seconds!", color: 'from-indigo-400 to-purple-500' },
                  { fact: "🧠 Deep learning models like BERT achieve 94% accuracy in sentiment classification, surpassing human performance in some tasks!", color: 'from-teal-400 to-cyan-500' },
                  { fact: "📺 Netflix saves over $1 billion annually by using sentiment analysis of reviews and social media to decide which shows to produce!", color: 'from-yellow-400 to-orange-500' },
                  { fact: "🏆 The first sentiment analysis system was created in 2001, and today it processes over 2.5 quintillion bytes of data daily worldwide!", color: 'from-pink-400 to-red-500' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative group cursor-pointer"
                    initial={{ 
                      scale: 0, 
                      opacity: 0,
                      rotate: 15
                    }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      rotate: 0
                    }}
                    transition={{ 
                      delay: index * 0.15 + 0.5, 
                      duration: 0.6,
                      ease: "backOut"
                    }}
                  >
                    <motion.div
                      className="relative group cursor-pointer"
                      whileHover={{ 
                        scale: 1.05, 
                        rotate: Math.random() * 4 - 2,
                        z: 10
                      }}
                      animate={{ 
                        y: [-2, 2, -2],
                      }}
                      transition={{ 
                        y: { duration: 3, repeat: Infinity, delay: index * 0.3 },
                      }}
                    >
                      {/* Glowing background */}
                      <motion.div
                        className={`absolute -inset-4 bg-gradient-to-r ${item.color} opacity-20 blur-xl rounded-2xl`}
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.2, 0.3, 0.2]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                      />
                      
                      {/* Content container */}
                      <div className={`relative z-10 p-6 rounded-2xl backdrop-blur-xl border ${isDark ? `bg-gradient-to-br from-cyan-400/10 to-blue-500/20 border-white/10` : `bg-gradient-to-br from-cyan-400/20 to-blue-500/30 border-gray-200/50`}`}>
                        <p className={`font-medium text-lg leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                          {item.fact}
                        </p>
                        
                        {/* Decorative elements */}
                        <motion.div
                          className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r ${item.color} rounded-full`}
                          animate={{ 
                            scale: [1, 1.5, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                        />
                        
                        <motion.div
                          className={`absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r ${item.color} rounded-full opacity-60`}
                          animate={{ 
                            scale: [1, 1.3, 1],
                            x: [0, 3, 0],
                            y: [0, -3, 0]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 ${isDark ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-gray-900'} overflow-hidden relative`}>
      {/* Animated background elements */}
      <div className="fixed inset-0">
        {/* Reduced gradient orbs */}
        <motion.div
          className={`absolute top-20 left-20 w-64 h-64 rounded-full blur-2xl ${isDark ? 'bg-gradient-to-r from-purple-500/15 to-pink-500/15' : 'bg-gradient-to-r from-blue-300/25 to-purple-300/25'}`}
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }} // Reduced duration
        />
        
        <motion.div
          className={`absolute bottom-20 right-20 w-48 h-48 rounded-full blur-2xl ${isDark ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15' : 'bg-gradient-to-r from-indigo-300/25 to-cyan-300/25'}`}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -20, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }} // Reduced duration
        />
      </div>

      <FloatingParticles />
      <InteractiveCursor />

      <div className="relative z-10 flex max-w-full">
        {/* Ultra-modern sidebar */}
        <motion.div
          className={`w-80 fixed left-0 top-0 h-screen backdrop-blur-2xl border-r z-40 pt-24 ${isDark ? 'bg-black/40 border-white/10' : 'bg-white/60 border-gray-200'}`}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
        >
          <div className="p-8 h-full flex flex-col">
            {/* Logo area */}
            <motion.div 
              className="mb-12"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className={`text-3xl font-black mb-2 ${isDark ? 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-transparent' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent'}`}>
                SENTIMENT
              </h1>
              <p className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Analysis Guide</p>
            </motion.div>
            
            {/* Navigation */}
            <nav className="flex-1 space-y-3">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full group relative overflow-hidden`}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl`}
                    animate={activeSection === section.id ? { opacity: 0.3 } : { opacity: 0 }}
                  />
                  
                  {/* Active indicator */}
                  <motion.div
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 bg-gradient-to-b ${section.gradient} rounded-full`}
                    animate={activeSection === section.id ? { height: '80%' } : { height: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center space-x-4 p-4 text-left">
                    <motion.div
                      animate={activeSection === section.id ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <section.icon 
                        size={24} 
                        className={`transition-colors ${activeSection === section.id ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900')}`} 
                      />
                    </motion.div>
                    
                    <div className="flex-1">
                      <span className={`font-medium transition-colors block ${activeSection === section.id ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900')}`}>
                        {section.title}
                      </span>
                    </div>
                    
                    <motion.div
                      animate={activeSection === section.id ? { x: 5, opacity: 1 } : { x: 0, opacity: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </nav>

            {/* Bottom decorative element */}
            <motion.div 
              className={`mt-8 p-6 rounded-2xl border ${isDark ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-white/10' : 'bg-gradient-to-br from-blue-100/50 to-purple-100/50 border-gray-200'}`}
              animate={{ 
                boxShadow: isDark ? ["0 0 20px rgba(168, 85, 247, 0.1)", "0 0 30px rgba(168, 85, 247, 0.2)", "0 0 20px rgba(168, 85, 247, 0.1)"] : ["0 0 20px rgba(99, 102, 241, 0.1)", "0 0 30px rgba(99, 102, 241, 0.2)", "0 0 20px rgba(99, 102, 241, 0.1)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-center">
                <Sparkles className={`mx-auto mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} size={24} />
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Explore & Discover</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main content area - Fixed padding to avoid navbar overlap */}
        <div className="flex-1 ml-80 min-h-screen">
          <div className="p-12 pt-32"> {/* Increased top padding for navbar clearance */}
            <AnimatePresence mode="wait">
              <motion.div key={activeSection}>
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;