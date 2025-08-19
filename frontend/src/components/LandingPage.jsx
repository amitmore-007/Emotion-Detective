import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, Search, Sparkles, Heart, Smile, Brain, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const LandingPage = () => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen w-full pt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Elements */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 ${isDark ? 'bg-purple-400/30' : 'bg-blue-400/30'} rounded-full`}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative mb-8 inline-block"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Search size={120} className="text-yellow-400 mx-auto filter drop-shadow-lg" />
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart size={30} className="text-red-400" />
            </motion.div>
          </motion.div>

          <h1 className={`title-font text-6xl md:text-8xl mb-6 glow-text ${isDark ? 'text-white' : 'text-gray-800'}`}>
            The Emotion Detective
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
            Join Detective Emma on an amazing adventure to discover the secrets of 
            <span className={`font-semibold ${isDark ? 'text-yellow-300' : 'text-blue-600'}`}> Sentiment Analysis</span>! 
            Learn how computers understand human emotions through fun stories and interactive games.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link to="/story">
              <motion.button
                className="btn-primary text-xl px-8 py-4 flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen size={24} />
                <span>Start the Adventure</span>
                <Sparkles size={20} />
              </motion.button>
            </Link>

            <Link to="/playground">
              <motion.button
                className={`text-xl px-8 py-4 flex items-center space-x-3 rounded-xl font-medium transition-all ${
                  isDark 
                    ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayCircle size={24} />
                <span>Try the Playground</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {[
            {
              icon: BookOpen,
              title: "Interactive Stories",
              description: "Follow Detective Emma's adventures and solve emotion mysteries!",
              color: "from-blue-500 to-purple-600"
            },
            {
              icon: PlayCircle,
              title: "Hands-on Learning",
              description: "Experiment with real sentiment analysis tools and see how they work!",
              color: "from-green-500 to-blue-500"
            },
            {
              icon: Smile,
              title: "Fun Exercises",
              description: "Practice identifying emotions in text with engaging mini-games!",
              color: "from-pink-500 to-red-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className={`p-8 text-center rounded-3xl backdrop-blur-xl border transition-all hover:scale-105 ${
                isDark 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                  : 'bg-white/80 border-gray-200 hover:bg-white'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                <feature.icon size={32} className="text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{feature.title}</h3>
              <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* What You'll Learn Section */}
        <motion.div
          className={`p-12 text-center mb-16 rounded-3xl backdrop-blur-xl border ${
            isDark 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/80 border-gray-200'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2 className={`title-font text-4xl mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>What You'll Discover</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[
              "🕵️ How Detective Emma uses technology to read emotions",
              "🧠 The difference between Rule-Based and AI-Powered analysis",
              "💭 Why understanding emotions in text is important",
              "🎯 How to identify positive, negative, and neutral feelings",
              "⚡ Real-world applications of sentiment analysis",
              "🎮 Fun ways to practice your new detective skills"
            ].map((item, index) => (
              <motion.p
                key={index}
                className={`text-lg flex items-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                {item}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <h2 className={`title-font text-4xl mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>Ready to Become an Emotion Detective?</h2>
          <Link to="/story">
            <motion.button
              className="btn-primary text-2xl px-12 py-6"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ boxShadow: ['0 0 20px rgba(99, 102, 241, 0.5)', '0 0 30px rgba(99, 102, 241, 0.8)', '0 0 20px rgba(99, 102, 241, 0.5)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Start Your Journey Now! 🚀
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
