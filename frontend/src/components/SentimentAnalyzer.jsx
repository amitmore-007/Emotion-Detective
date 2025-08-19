import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Calculator, CheckCircle, XCircle, RotateCcw, Sparkles, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { apiCall } from '../config/api';

const SentimentAnalyzer = ({ 
  text, 
  correctAnswer, 
  onAnalysisComplete, 
  showBothMethods = false 
}) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('rule');
  const [userGuess, setUserGuess] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [animationStage, setAnimationStage] = useState('guess');
  const { isDark } = useTheme();

  // Reset component state when text changes (new message selected)
  useEffect(() => {
    setAnalysis(null);
    setUserGuess(null);
    setShowResult(false);
    setAnimationStage('guess');
    setLoading(false);
  }, [text]);

  const analyzeSentiment = async (method = 'both') => {
    setLoading(true);
    try {
      const result = await apiCall('/api/sentiment/analyze', {
        method: 'POST',
        body: JSON.stringify({ text, method }),
      });
      
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      // Fallback mock analysis for development
      const mockAnalysis = {
        ruleBased: {
          sentiment: 'neutral',
          score: 0,
          confidence: 0.7,
          positiveWords: [],
          negativeWords: [],
          explanation: 'Mock analysis for development'
        }
      };
      if (showBothMethods) {
        mockAnalysis.aiBased = {
          sentiment: 'neutral',
          confidence: 0.75,
          explanation: 'Mock AI analysis for development'
        };
      }
      setAnalysis(mockAnalysis);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (text && !analysis) {
      analyzeSentiment(showBothMethods ? 'both' : selectedMethod);
    }
  }, [text, selectedMethod, showBothMethods]);

  const handleGuess = (guess) => {
    setUserGuess(guess);
    setShowResult(true);
    setAnimationStage('result');
    
    // Use rule-based analysis result as the primary method for correctness
    const primaryResult = selectedMethod === 'ai' ? analysis.aiBased : analysis.ruleBased;
    const isCorrect = guess === (correctAnswer || primaryResult?.sentiment);
    
    setTimeout(() => {
      onAnalysisComplete && onAnalysisComplete(analysis, isCorrect);
    }, 1000);
  };

  const resetAnalysis = () => {
    setUserGuess(null);
    setShowResult(false);
    setAnalysis(null);
    setAnimationStage('guess');
    setLoading(false);
    
    // Trigger new analysis
    if (text) {
      analyzeSentiment(showBothMethods ? 'both' : selectedMethod);
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return isDark ? 'from-green-400 to-emerald-600' : 'from-green-500 to-green-600';
      case 'negative': return isDark ? 'from-red-400 to-rose-600' : 'from-red-500 to-red-600';
      case 'neutral': return isDark ? 'from-gray-400 to-slate-600' : 'from-gray-500 to-gray-600';
      default: return isDark ? 'from-gray-400 to-slate-600' : 'from-gray-500 to-gray-600';
    }
  };

  const getSentimentEmoji = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😢';
      case 'neutral': return '😐';
      default: return '🤔';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        key={text} // Reset animation when text changes
      >
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="text-yellow-400 mr-2" size={32} />
          <h2 className={`text-3xl font-bold glow-text ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Emotion Analysis Lab
          </h2>
          <Sparkles className="text-yellow-400 ml-2" size={32} />
        </div>
        <motion.div
          className={`rounded-2xl p-6 border ${
            isDark 
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-white/20' 
              : 'bg-gradient-to-r from-blue-100/80 to-purple-100/80 border-blue-300/50'
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <p className={`text-xl font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
            "{text}"
          </p>
        </motion.div>
      </motion.div>

      {/* Method Selection */}
      {showBothMethods && (
        <motion.div
          className="flex space-x-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          key={`method-${text}`} // Reset when text changes
        >
          {[
            { id: 'rule', name: 'Rule-Based', icon: Calculator, color: 'from-blue-500 to-cyan-500' },
            { id: 'ai', name: 'AI-Powered', icon: Brain, color: 'from-purple-500 to-pink-500' }
          ].map(({ id, name, icon: Icon, color }) => (
            <motion.button
              key={id}
              onClick={() => {
                setSelectedMethod(id);
                // Reset analysis when method changes
                setAnalysis(null);
                setUserGuess(null);
                setShowResult(false);
                setAnimationStage('guess');
              }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all font-medium ${
                selectedMethod === id 
                  ? `bg-gradient-to-r ${color} text-white shadow-lg` 
                  : isDark
                  ? 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={20} />
              <span>{name}</span>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Analysis Results */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="loading"
          >
            <motion.div
              className={`w-16 h-16 border-4 rounded-full mx-auto mb-6 ${
                isDark 
                  ? 'border-white/20 border-t-white' 
                  : 'border-gray-300 border-t-gray-800'
              }`}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p
              className={`text-xl ${isDark ? 'text-white' : 'text-gray-800'}`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Detective Emma is analyzing the emotions...
            </motion.p>
          </motion.div>
        ) : analysis ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
            key={`analysis-${text}-${selectedMethod}`} // Unique key for each text and method
          >
            {/* User Guess Section */}
            {!showResult && (
              <motion.div
                className="text-center space-y-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  What emotion do you detect in this message?
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {['positive', 'negative', 'neutral'].map((sentiment) => (
                    <motion.button
                      key={sentiment}
                      onClick={() => handleGuess(sentiment)}
                      className={`group relative p-6 rounded-2xl font-bold text-white bg-gradient-to-br ${getSentimentColor(sentiment)} shadow-lg hover:shadow-xl transition-all overflow-hidden`}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + (sentiment === 'positive' ? 0 : sentiment === 'negative' ? 0.1 : 0.2) }}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 flex flex-col items-center space-y-3">
                        <motion.span
                          className="text-4xl"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                        >
                          {getSentimentEmoji(sentiment)}
                        </motion.span>
                        <span className="text-lg capitalize">{sentiment}</span>
                      </div>
                      
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-4 border-white/50 opacity-0 group-hover:opacity-100"
                        initial={false}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Results Display */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* User Result */}
                <motion.div
                  className={`relative p-6 rounded-2xl border-2 overflow-hidden ${
                    userGuess === (correctAnswer || (selectedMethod === 'ai' ? analysis.aiBased?.sentiment : analysis.ruleBased?.sentiment))
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400' 
                      : 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-400'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                  
                  <div className="relative z-10 flex items-center justify-center space-x-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      {userGuess === (correctAnswer || (selectedMethod === 'ai' ? analysis.aiBased?.sentiment : analysis.ruleBased?.sentiment)) ? (
                        <CheckCircle className="text-green-400" size={48} />
                      ) : (
                        <XCircle className="text-red-400" size={48} />
                      )}
                    </motion.div>
                    
                    <div className="text-center">
                      <motion.h3
                        className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {userGuess === (correctAnswer || (selectedMethod === 'ai' ? analysis.aiBased?.sentiment : analysis.ruleBased?.sentiment)) ? '🎉 Excellent Detective Work!' : '🤔 Not Quite Right'}
                      </motion.h3>
                      <motion.p
                        className={isDark ? 'text-white/90' : 'text-gray-700'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        Your guess: <span className={`font-bold capitalize ${isDark ? 'text-yellow-300' : 'text-yellow-600'}`}>{userGuess}</span>
                        {userGuess !== (correctAnswer || (selectedMethod === 'ai' ? analysis.aiBased?.sentiment : analysis.ruleBased?.sentiment)) && (
                          <span> | Correct answer: <span className={`font-bold capitalize ${isDark ? 'text-green-300' : 'text-green-600'}`}>{correctAnswer || (selectedMethod === 'ai' ? analysis.aiBased?.sentiment : analysis.ruleBased?.sentiment)}</span></span>
                        )}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>

                {/* AI Analysis Results */}
                <div className="grid gap-6">
                  {analysis.ruleBased && (
                    <AnalysisCard
                      title="Rule-Based Analysis"
                      icon={Calculator}
                      sentiment={analysis.ruleBased.sentiment}
                      details={{
                        'Score': analysis.ruleBased.score,
                        'Positive Words': analysis.ruleBased.positiveWords,
                        'Negative Words': analysis.ruleBased.negativeWords,
                        'Confidence': `${Math.round(analysis.ruleBased.confidence * 100)}%`
                      }}
                      explanation={analysis.ruleBased.explanation}
                      gradientFrom="from-blue-500"
                      gradientTo="to-cyan-500"
                      isDark={isDark}
                    />
                  )}

                  {analysis.aiBased && (
                    <AnalysisCard
                      title="AI-Powered Analysis"
                      icon={Brain}
                      sentiment={analysis.aiBased.sentiment}
                      details={{
                        'Confidence': `${Math.round((analysis.aiBased.confidence || 0) * 100)}%`,
                        'Intensity': analysis.aiBased.emotionalIntensity || 'medium',
                        'Reasoning': analysis.aiBased.reasoning || 'AI analysis complete'
                      }}
                      explanation={analysis.aiBased.explanation}
                      gradientFrom="from-purple-500"
                      gradientTo="to-pink-500"
                      isDark={isDark}
                    />
                  )}
                </div>

                <div className="text-center">
                  <motion.button
                    onClick={resetAnalysis}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium flex items-center space-x-2 mx-auto hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <RotateCcw size={20} />
                    <span>Analyze Another Message</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const AnalysisCard = ({ title, icon: Icon, sentiment, details, explanation, gradientFrom, gradientTo, isDark }) => {
  return (
    <motion.div
      className={`backdrop-blur-xl border rounded-2xl p-6 shadow-xl ${
        isDark 
          ? 'bg-white/10 border-white/20' 
          : 'bg-white/90 border-gray-200'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex items-center space-x-3 mb-6 p-3 rounded-xl bg-gradient-to-r ${gradientFrom} ${gradientTo}/20`}>
        <div className={`p-2 rounded-lg bg-gradient-to-r ${gradientFrom} ${gradientTo}`}>
          <Icon className="text-white" size={24} />
        </div>
        <h3 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
      </div>
      
      <motion.div
        className={`inline-flex items-center space-x-3 px-4 py-3 rounded-xl mb-6 bg-gradient-to-r ${
          sentiment === 'positive' ? 'from-green-500/20 to-emerald-500/20 border border-green-400/50' :
          sentiment === 'negative' ? 'from-red-500/20 to-rose-500/20 border border-red-400/50' :
          'from-gray-500/20 to-slate-500/20 border border-gray-400/50'
        }`}
        whileHover={{ scale: 1.05 }}
      >
        <motion.span
          className="text-3xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {sentiment === 'positive' ? '😊' : sentiment === 'negative' ? '😢' : '😐'}
        </motion.span>
        <span className="font-bold text-white text-lg capitalize">{sentiment}</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {Object.entries(details).map(([key, value]) => (
          <motion.div
            key={key}
            className={`rounded-lg p-3 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}
            whileHover={{ bg: 'white/10' }}
          >
            <span className={`text-sm block ${isDark ? 'text-white/70' : 'text-gray-600'}`}>{key}:</span>
            <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{value}</span>
          </motion.div>
        ))}
      </div>

      {explanation && (
        <motion.p
          className={`text-sm italic rounded-lg p-3 ${
            isDark 
              ? 'text-white/80 bg-white/5' 
              : 'text-gray-700 bg-gray-50'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {explanation}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SentimentAnalyzer;

