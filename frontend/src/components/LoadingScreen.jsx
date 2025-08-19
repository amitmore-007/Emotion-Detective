import React from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Smile, Frown } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="relative mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Search size={80} className="text-yellow-400 mx-auto" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart size={20} className="text-red-400" />
          </motion.div>
        </motion.div>

        <motion.h1
          className="title-font text-4xl text-white mb-4 glow-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          The Emotion Detective
        </motion.h1>

        <motion.p
          className="text-purple-200 text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Loading your adventure...
        </motion.p>

        <div className="flex justify-center space-x-4">
          {[Smile, Heart, Frown].map((Icon, index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 0.6, 
                repeat: Infinity, 
                delay: index * 0.2 
              }}
            >
              <Icon size={30} className="text-purple-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
