import React from 'react';
import { motion } from 'framer-motion';

const CharacterAnimation = ({ character = 'emma-happy' }) => {
  const getCharacterEmoji = () => {
    switch (character) {
      case 'emma-happy': return '🕵️‍♀️';
      case 'emma-detective': return '🔍';
      case 'emma-teacher': return '👩‍🏫';
      case 'emma-excited': return '🤩';
      default: return '🕵️‍♀️';
    }
  };

  const getCharacterColor = () => {
    switch (character) {
      case 'emma-happy': return 'from-pink-400 to-purple-500';
      case 'emma-detective': return 'from-blue-400 to-indigo-500';
      case 'emma-teacher': return 'from-green-400 to-teal-500';
      case 'emma-excited': return 'from-yellow-400 to-orange-500';
      default: return 'from-pink-400 to-purple-500';
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <motion.div
        className={`w-32 h-32 rounded-full bg-gradient-to-br ${getCharacterColor()} flex items-center justify-center shadow-xl`}
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="text-6xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {getCharacterEmoji()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CharacterAnimation;
