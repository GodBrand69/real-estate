import React from 'react';
import { motion } from 'framer-motion';
import { mockProperties } from '../data/mockData';
import PropertyCard from './properties/PropertyCard';

const FeaturedProperties = () => {
  // Get first 3 properties
  const featuredProperties = mockProperties.slice(0, 3);

  return (
    <div className="bg-[#0a0a0f] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00ff9f] to-[#00ffff] text-transparent bg-clip-text">
            Featured Properties
          </h2>
          <p className="text-[#b3b3b3] mt-2">
            Discover our most exclusive and sought-after properties
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties; 