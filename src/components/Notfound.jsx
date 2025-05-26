import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-9xl font-bold bg-gradient-to-r from-[#00ff9f] to-[#00ffff] bg-clip-text text-transparent mb-8 drop-shadow-[0_0_15px_rgba(0,255,159,0.5)]"
        >
          404
        </motion.div>
        
        <h1 className="text-4xl font-bold text-white mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for seems to have moved or doesn't exist. 
          Let's get you back on track!
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center px-6 py-3 bg-[#2a2a3a] text-white rounded-lg hover:bg-[#3a3a4a] transition-colors border border-[#3a3a4a]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </motion.button>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-[#00ff9f] to-[#00ffff] text-[#0a0a0f] rounded-lg font-medium hover:shadow-[0_0_15px_rgba(0,255,159,0.5)] transition-all duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}