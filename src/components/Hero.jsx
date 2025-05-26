import React from 'react';
import { motion } from 'framer-motion';
import { Building, DollarSign, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import heroImage from '../assets/hero.jpg';

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = (searchParams) => {
    const queryString = new URLSearchParams(searchParams).toString();
    navigate(`/properties?${queryString}`);
  };

  return (
    <section className="relative min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      
      {/* Animated Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff9f] rounded-full mix-blend-screen opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ffff] rounded-full mix-blend-screen opacity-20 animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-[#00ff9f] to-[#00ffff] bg-clip-text text-transparent">
                Future of Real Estate
              </span>
              <br />
              <span className="text-white">Starts Here</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-[#b3b3b3] mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Experience the next generation of property hunting with our AI-powered platform. Find your dream home in the digital age.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/properties">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#00ff9f] to-[#00ffff] text-[#0a0a0f] rounded-lg font-medium hover:shadow-[0_0_20px_rgba(0,255,159,0.3)] transition-all duration-300"
                >
                  Explore Properties
                </motion.button>
              </Link>
              
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-12 max-w-xl mx-auto lg:mx-0"
            >
              {[
                { icon: Building, value: '10K+', label: 'Properties' },
                { icon: MapPin, value: '50+', label: 'Locations' },
                { icon: DollarSign, value: '5K+', label: 'Deals Closed' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-6 h-6 text-[#00ff9f] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-[#b3b3b3]">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Building Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-[#00ff9f]/20">
              <img
                src={heroImage}
                alt="Cyberpunk Real Estate"
                className="w-full h-full object-cover"
              />
              {/* Enhanced cyberpunk overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-[#00ff9f]/5 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00ff9f]/10 to-transparent"></div>
              
              {/* Animated scan lines */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,255,159,0.05)_50%,transparent_100%)] bg-[length:100%_8px] animate-scan"></div>
              
              {/* Holographic property overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-[#00ff9f]/30 rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff9f]/10 to-transparent"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,rgba(0,255,159,0.1)_50%,transparent_100%)] animate-pulse"></div>
              </div>
              
              {/* Search Bar Overlay */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-xl px-4">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;