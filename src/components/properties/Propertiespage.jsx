import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../SearchBar';
import FilterSection from '../FilterSection';
import PropertiesGrid from '../PropertiesGrid';
import { mockProperties } from '../../data/mockData';

const PropertiesPage = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: 'newest',
    type: '',
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
    amenities: []
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        // Get all properties except the first 3 (which are featured)
        const remainingProperties = mockProperties.slice(3);
        setProperties(remainingProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1a2e] border-b border-[#2a2a3a]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00ff9f] to-[#00ffff] text-transparent bg-clip-text mb-4">
            All Properties
          </h1>
          <p className="text-[#b3b3b3] max-w-2xl">
            Browse our complete collection of premium properties featuring cutting-edge technology and futuristic design.
          </p>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8"
      >
        <SearchBar />
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-1/4"
          >
            <FilterSection filters={filters} onFilterChange={handleFilterChange} />
          </motion.div>

          {/* Properties Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:w-3/4"
          >
            <PropertiesGrid properties={properties} loading={loading} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage; 