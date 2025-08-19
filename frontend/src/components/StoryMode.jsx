import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Sparkles, Brain, Heart, Zap, Star, Crown, Lock } from 'lucide-react';
import SentimentAnalyzer from './SentimentAnalyzer';
import { useTheme } from '../contexts/ThemeContext';

const StoryMode = ({ currentUser }) => {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [userProgress, setUserProgress] = useState({});
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [storyAnimation, setStoryAnimation] = useState('intro');
  const [particleSystem, setParticleSystem] = useState([]);
  const { isDark } = useTheme();

  // Generate magical particles
  useEffect(() => {
    const particles = Array.from({ length: 50 }, (_, i) => ({ // Reduced particles for better performance
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1, // Smaller particles
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.2, // Reduced opacity
      color: Math.random() > 0.5 ? 'purple' : 'blue'
    }));
    setParticleSystem(particles);
  }, [currentChapter]);

  const chapters = [
    {
      id: 1,
      title: "The Enchanted Digital Realm",
      subtitle: "Detective Emma's Mystical Discovery",
      content: "In a realm where emotions flow like rivers of light, Detective Emma discovers a mysterious portal. Each glowing message contains trapped emotions waiting to be freed...",
      character: "emma-happy",
      backgroundGradient: "from-purple-900 via-pink-900 to-indigo-900",
      magicalEffect: "sparkles",
      messages: [
        { text: "I love my car so much!", id: 1, correctAnswer: "positive", difficulty: "easy", reward: "✨" },
        { text: "This homework is terrible.", id: 2, correctAnswer: "negative", difficulty: "easy", reward: "🌟" },
        { text: "The weather is okay today.", id: 3, correctAnswer: "neutral", difficulty: "easy", reward: "💫" },
        { text: "I feel happy about my new job!", id: 12, correctAnswer: "positive", difficulty: "easy", reward: "🎉" }
      ],
      task: "Free the trapped emotions by solving their emotional mysteries!",
      learningGoal: "Become a true Emotion Liberator",
      unlockReward: "🔮 Crystal of Understanding"
    },
    {
      id: 2,
      title: "The Floating Islands of Feelings",
      subtitle: "Journey Through Emotional Landscapes",
      content: "Emma soars through floating islands, each representing different emotional realms. Dark clouds swirl around negative emotions while golden light radiates from positive ones...",
      character: "emma-detective",
      backgroundGradient: "from-cyan-900 via-blue-900 to-purple-900",
      magicalEffect: "floating",
      messages: [
        { text: "I'm absolutely thrilled about this incredible discovery!", id: 4, correctAnswer: "positive", difficulty: "medium", reward: "🌈" },
        { text: "This is the most devastating and heartbreaking news ever!", id: 5, correctAnswer: "negative", difficulty: "medium", reward: "⚡" },
        { text: "The cat is sleeping peacefully on the soft mat.", id: 6, correctAnswer: "neutral", difficulty: "medium", reward: "🌙" },
        { text: "I absolutely despise waiting in these endless, frustrating queues!", id: 7, correctAnswer: "negative", difficulty: "medium", reward: "🔥" },
        { text: "The meeting will start at 3 PM in the conference room.", id: 13, correctAnswer: "neutral", difficulty: "medium", reward: "⭐" }
      ],
      task: "Navigate the emotional islands and restore balance to the realm!",
      learningGoal: "Master the art of emotional navigation",
      unlockReward: "🌊 Compass of Emotions"
    },
    {
      id: 3,
      title: "The Quantum Laboratory of Thoughts",
      subtitle: "Where Science Meets Magic",
      content: "Deep in the quantum realm, Emma discovers an ancient laboratory where thoughts become reality. Two powerful artifacts await: the Crystal of Rules and the Orb of Intelligence...",
      character: "emma-teacher",
      backgroundGradient: "from-emerald-900 via-teal-900 to-cyan-900",
      magicalEffect: "quantum",
      techniques: ["Crystal of Rules", "Orb of Intelligence"],
      task: "Harness the power of both artifacts to become the ultimate Emotion Detective!",
      learningGoal: "Transcend to Grandmaster Detective",
      messages: [
        { text: "While this pizza has some delightful flavors, the service could be better, though overall it's a decent experience.", id: 8, correctAnswer: "neutral", difficulty: "hard", reward: "👑" },
        { text: "Despite the challenging circumstances, I remain cautiously optimistic about the potential outcomes.", id: 9, correctAnswer: "positive", difficulty: "hard", reward: "💎" },
        { text: "The presentation was informative, yet somewhat underwhelming given the high expectations.", id: 10, correctAnswer: "neutral", difficulty: "hard", reward: "💫" },
        { text: "I'm genuinely ecstatic about this phenomenal breakthrough in our research!", id: 11, correctAnswer: "positive", difficulty: "hard", reward: "🌟" },
        { text: "The weather report indicates partly cloudy skies with temperatures around 68 degrees.", id: 14, correctAnswer: "neutral", difficulty: "hard", reward: "🌈" }
      ],
      unlockReward: "👑 Crown of Emotional Mastery"
    }
  ];

  const currentChapterData = chapters.find(ch => ch.id === currentChapter);

  const handleMessageClick = (message) => {
    // Reset analysis state when selecting a new message
    setShowAnalysis(false);
    setSelectedMessage(null);
    
    // Small delay to ensure state is reset before setting new message
    setTimeout(() => {
      setSelectedMessage(message);
      setShowAnalysis(true);
      setStoryAnimation('analysis');
    }, 100);
  };

  const handleAnalysisComplete = (result, isCorrect) => {
    setUserProgress(prev => ({
      ...prev,
      [selectedMessage.id]: { 
        result, 
        isCorrect, 
        completed: true,
        attempts: (prev[selectedMessage.id]?.attempts || 0) + 1,
        timestamp: Date.now(),
        reward: isCorrect ? selectedMessage.reward : null
      }
    }));
  };

  const getChapterProgress = () => {
    if (!currentChapterData.messages) return 100;
    const completedMessages = currentChapterData.messages.filter(msg => 
      userProgress[msg.id]?.completed && userProgress[msg.id]?.isCorrect
    ).length;
    return (completedMessages / currentChapterData.messages.length) * 100;
  };

  const isChapterUnlocked = (chapterId) => {
    if (chapterId === 1) return true;
    const prevChapter = chapters.find(ch => ch.id === chapterId - 1);
    if (!prevChapter?.messages) return true;
    
    const prevCompleted = prevChapter.messages.filter(msg => 
      userProgress[msg.id]?.completed && userProgress[msg.id]?.isCorrect
    ).length;
    return prevCompleted === prevChapter.messages.length;
  };

  // Add function to get individual chapter completion status
  const getChapterCompletionStatus = (chapterId) => {
    const chapter = chapters.find(ch => ch.id === chapterId);
    if (!chapter?.messages) return 0;
    
    const completedMessages = chapter.messages.filter(msg => 
      userProgress[msg.id]?.completed && userProgress[msg.id]?.isCorrect
    ).length;
    return (completedMessages / chapter.messages.length) * 100;
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden overflow-y-auto">
      {/* Fixed Background Container */}
      <div className={`fixed inset-0 bg-gradient-to-br ${currentChapterData.backgroundGradient} -z-10`}>
        {/* Reduced Animated Particles */}
        {particleSystem.slice(0, 20).map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full pointer-events-none ${
              particle.color === 'purple' 
                ? 'bg-purple-400/60' 
                : 'bg-blue-400/60'
            }`}
            style={{
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
            animate={{
              x: [particle.x, particle.x + 30, particle.x - 15, particle.x],
              y: [particle.y, particle.y + 20, particle.y - 10, particle.y],
              scale: [1, 1.1, 1],
              opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
            }}
            transition={{
              duration: particle.speed * 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Simplified Mystical Aura Effects */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              `radial-gradient(circle at 20% 20%, rgba(167, 139, 250, 0.2) 0%, transparent 50%)`,
              `radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)`,
              `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)`,
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Chapter Selection Portal - Fixed Position */}
      <div className="fixed top-28 left-4 z-40">
        <motion.div
          className="flex flex-col space-y-4"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {chapters.map((chapter) => {
            const chapterProgress = getChapterCompletionStatus(chapter.id);
            const isUnlocked = isChapterUnlocked(chapter.id);
            
            return (
              <motion.button
                key={chapter.id}
                onClick={() => isUnlocked && setCurrentChapter(chapter.id)}
                className={`w-16 h-16 rounded-full border-2 backdrop-blur-xl transition-all relative ${
                  currentChapter === chapter.id
                    ? 'bg-yellow-400 border-yellow-300 shadow-yellow-400/50 shadow-2xl scale-110'
                    : isUnlocked
                    ? 'bg-white/20 border-white/30 hover:bg-white/30 hover:scale-105'
                    : 'bg-gray-500/20 border-gray-400/30 cursor-not-allowed'
                }`}
                whileHover={isUnlocked ? { scale: 1.1 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
              >
                <span className="text-2xl">
                  {!isUnlocked ? (
                    <Lock className="w-6 h-6 text-gray-400 mx-auto" />
                  ) : currentChapter === chapter.id ? (
                    <Star className="w-6 h-6 text-white mx-auto" />
                  ) : chapterProgress === 100 ? (
                    <Crown className="w-6 h-6 text-yellow-400 mx-auto" />
                  ) : (
                    <span className="text-white font-bold">{chapter.id}</span>
                  )}
                </span>
                
                {/* Progress Ring - Updated to show individual chapter progress */}
                {isUnlocked && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from 0deg, rgba(34, 197, 94, 0.8) ${chapterProgress}%, transparent 0%)`,
                      WebkitMask: 'radial-gradient(circle, transparent 45%, black 46%, black 54%, transparent 55%)',
                      mask: 'radial-gradient(circle, transparent 45%, black 46%, black 54%, transparent 55%)'
                    }}
                  />
                )}
                
                {/* Completion indicator */}
                {chapterProgress === 100 && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                  >
                    <CheckCircle className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Main Scrollable Content */}
      <div className="relative z-10 pt-24 px-4 pb-12 ml-0 lg:ml-20">
        <div className="max-w-7xl mx-auto">
          {/* Enchanted Chapter Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            key={currentChapter}
          >
            {/* ...existing header code... */}
            <motion.div
              className="relative inline-block mb-6"
              animate={{
                y: [0, -10, 0],
                rotateZ: [0, 2, -2, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Magical Portal Effect */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: `conic-gradient(from 0deg, rgba(167, 139, 250, 0.5), rgba(236, 72, 153, 0.5), rgba(59, 130, 246, 0.5), rgba(167, 139, 250, 0.5))`,
                  filter: 'blur(20px)'
                }}
              />
              
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center shadow-2xl border-4 border-white/30">
                <motion.span
                  className="text-6xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                >
                  🕵️‍♀️
                </motion.span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl text-white mb-4 font-bold"
              style={{
                textShadow: '0 0 20px rgba(167, 139, 250, 0.8)'
              }}
            >
              {currentChapterData.title}
            </motion.h1>
            
            <motion.p
              className="text-xl text-purple-200 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {currentChapterData.subtitle}
            </motion.p>

            {/* Progress Bar - Updated to show current chapter progress only */}
            <motion.div
              className="relative max-w-2xl mx-auto h-6 mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-sm"></div>
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${getChapterProgress()}%` }}
                transition={{ duration: 1.5, delay: 1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                />
              </motion.div>
              
              {/* Progress Stars - Based on current chapter messages */}
              {currentChapterData.messages && Array.from({ length: currentChapterData.messages.length }, (_, i) => (
                <motion.div
                  key={i}
                  className={`absolute top-1/2 w-3 h-3 rounded-full ${
                    (getChapterProgress() / (100 / currentChapterData.messages.length)) > i ? 'bg-yellow-400' : 'bg-white/30'
                  }`}
                  style={{ 
                    left: `${(i + 1) * (100 / (currentChapterData.messages.length + 1))}%`, 
                    transform: 'translateY(-50%)' 
                  }}
                  animate={
                    (getChapterProgress() / (100 / currentChapterData.messages.length)) > i 
                      ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }
                      : {}
                  }
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ))}
            </motion.div>

            <p className="text-white/80">
              {Math.round(getChapterProgress())}% of emotions liberated in Chapter {currentChapter}
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Story Content */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.div
                className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                {/* Story Content */}
                <motion.div
                  className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.p
                    className="text-lg text-white leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 2 }}
                  >
                    {currentChapterData.content}
                  </motion.p>
                </motion.div>

                {/* Quest Brief */}
                <motion.div
                  className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 mb-6 border border-blue-400/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center mb-3">
                    <Zap className="text-yellow-400 mr-2" size={24} />
                    <h3 className="font-bold text-white text-xl">Sacred Quest</h3>
                  </div>
                  <p className="text-purple-100 mb-4">{currentChapterData.task}</p>
                  <div className="flex items-center">
                    <Brain className="text-cyan-400 mr-2" size={20} />
                    <span className="text-cyan-200 text-sm">{currentChapterData.learningGoal}</span>
                  </div>
                </motion.div>

                {/* Messages */}
                {currentChapterData.messages && (
                  <div className="space-y-4">
                    <div className="flex items-center mb-4">
                      <Heart className="text-red-400 mr-3" size={24} />
                      <h3 className="font-bold text-white text-xl">Emotional Artifacts</h3>
                      <div className="ml-auto flex items-center space-x-2">
                        <span className="text-sm text-white/70">
                          {currentChapterData.messages.filter(msg => 
                            userProgress[msg.id]?.completed && userProgress[msg.id]?.isCorrect
                          ).length} / {currentChapterData.messages.length} Completed
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {currentChapterData.messages.map((message, index) => {
                        const progress = userProgress[message.id];
                        const isCompleted = progress?.completed && progress?.isCorrect;
                        
                        return (
                          <motion.div
                            key={message.id}
                            className="relative group"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 + index * 0.2 }}
                          >
                            <motion.div
                              className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 backdrop-blur-sm ${
                                isCompleted
                                  ? 'bg-emerald-500/20 border-emerald-400 shadow-emerald-400/30' 
                                  : progress?.completed
                                  ? 'bg-rose-500/20 border-rose-400 shadow-rose-400/30'
                                  : 'bg-white/10 border-white/30 hover:border-cyan-400 hover:bg-cyan-500/20'
                              } shadow-lg hover:shadow-xl`}
                              whileHover={{ 
                                scale: 1.02, 
                                y: -4
                              }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleMessageClick(message)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="text-white text-lg font-medium leading-relaxed mb-3">
                                    "{message.text}"
                                  </p>
                                  
                                  <div className="flex items-center space-x-3">
                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                                        message.difficulty === 'easy' ? 'bg-emerald-500' :
                                        message.difficulty === 'medium' ? 'bg-amber-500' :
                                        message.difficulty === 'hard' ? 'bg-red-500' : 
                                        'bg-purple-500'
                                      }`}
                                    >
                                      {message.difficulty.toUpperCase()}
                                    </span>
                                    
                                    {isCompleted && (
                                      <div className="flex items-center space-x-2">
                                        <span className="text-2xl">{message.reward}</span>
                                        <span className="text-emerald-300 font-bold text-xs">EARNED!</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="ml-4">
                                  {isCompleted ? (
                                    <CheckCircle className="text-emerald-400" size={32} />
                                  ) : progress?.completed ? (
                                    <AlertCircle className="text-rose-400" size={32} />
                                  ) : (
                                    <div className="w-8 h-8 border-2 border-cyan-400/50 border-t-cyan-400 rounded-full animate-spin" />
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Analysis Portal */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-6 shadow-2xl min-h-[500px] relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
              >
                <AnimatePresence mode="wait">
                  {showAnalysis && selectedMessage ? (
                    <motion.div
                      key={`analysis-${selectedMessage.id}`} // Unique key for each message
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    >
                      <SentimentAnalyzer
                        text={selectedMessage.text}
                        correctAnswer={selectedMessage.correctAnswer}
                        onAnalysisComplete={handleAnalysisComplete}
                        showBothMethods={currentChapter >= 3}
                        key={`sentiment-${selectedMessage.id}`} // Ensure component remounts for each message
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="waiting"
                      className="text-center py-16 h-full flex flex-col justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <motion.div
                        className="text-6xl mb-6"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        🔮
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4">
                        Mystical Analysis Portal
                      </h3>
                      
                      <p className="text-purple-200 text-lg max-w-md mx-auto leading-relaxed mb-6">
                        Touch an emotional artifact to unveil its hidden feelings. 
                        The portal awaits your magical analysis...
                      </p>
                      
                      <div className="flex justify-center space-x-4">
                        {['💫', '🌟', '✨'].map((emoji, i) => (
                          <motion.div
                            key={i}
                            className="text-xl"
                            animate={{
                              y: [0, -10, 0],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                          >
                            {emoji}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>

          {/* Chapter Completion Celebration - Updated condition */}
          <AnimatePresence>
            {getChapterProgress() >= 100 && (
              <motion.div
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="relative bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-12 text-center max-w-lg mx-4 shadow-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 1, type: "spring" }}
                >
                  <motion.div
                    className="text-6xl mb-6 mt-10 z-[9999] z-[10000] "
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: 3
                    }}
                  >
                    {currentChapterData.unlockReward}
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold text-white mb-4">Chapter {currentChapter} Mastered!</h2>
                  <p className="text-white mb-6 text-lg">
                    You've successfully liberated all emotions in this chapter and earned the {currentChapterData.unlockReward}
                  </p>
                  
                  <div className="flex flex-col space-y-3">
                    <motion.button
                      onClick={() => {
                        setShowAnalysis(false);
                        // Clear selected message to reset analysis portal
                        setSelectedMessage(null);
                        // Auto-advance to next chapter if available
                        if (currentChapter < chapters.length) {
                          setTimeout(() => {
                            setCurrentChapter(currentChapter + 1);
                          }, 100);
                        }
                      }}
                      className="bg-white text-orange-500 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currentChapter < chapters.length ? 'Continue to Next Chapter' : 'Complete Journey'}
                    </motion.button>
                    
                    <motion.button
                      onClick={() => {
                        setShowAnalysis(false);
                        setSelectedMessage(null);
                      }}
                      className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-xl font-medium hover:bg-white/10 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Stay in Chapter {currentChapter}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default StoryMode;
