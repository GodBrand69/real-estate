import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useState({
    location: '',
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchParams);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#1a1a2e]/90 backdrop-blur-lg p-4 rounded-xl border border-[#00ff9f]/20 shadow-[0_0_20px_rgba(0,255,159,0.2)]"
      >
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#00ff9f]" />
            <input
              type="text"
              value={searchParams.location}
              onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
              onKeyPress={handleKeyPress}
              placeholder="Enter location..."
              className="w-full pl-10 pr-4 py-3 bg-[#2a2a3a] border border-[#00ff9f]/20 rounded-lg text-white placeholder-[#b3b3b3] focus:outline-none focus:border-[#00ff9f] focus:ring-1 focus:ring-[#00ff9f]/20 transition-all"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#00ff9f] to-[#00ffff] text-[#0a0a0f] rounded-lg font-medium hover:shadow-[0_0_15px_rgba(0,255,159,0.3)] transition-all"
          >
            <Search className="w-5 h-5" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SearchBar; 