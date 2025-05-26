import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import PropertiesGrid from '../components/PropertiesGrid';
import { mockProperties } from '../data/mockData';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: 'newest',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [],
    location: searchParams.get('location') || ''
  });

  // Fetch properties on mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Get properties from localStorage or use mockData
        const storedProperties = JSON.parse(localStorage.getItem('properties'));
        const allProperties = storedProperties || mockProperties;
        
        // If using mockData, store it in localStorage for the first time
        if (!storedProperties) {
          localStorage.setItem('properties', JSON.stringify(mockProperties));
        }

        setProperties(allProperties);
        setFilteredProperties(allProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Update filters when URL search params change
  useEffect(() => {
    const location = searchParams.get('location');
    if (location) {
      setFilters(prev => ({
        ...prev,
        location
      }));
    }
  }, [searchParams]);

  const applyFilters = useCallback(() => {
    let result = [...properties];

    // Apply location filter
    if (filters.location) {
      result = result.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply property type filter
    if (filters.propertyType) {
      result = result.filter(property =>
        property.type.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(property =>
        property.price >= min && property.price <= max
      );
    }

    // Apply bedrooms filter
    if (filters.bedrooms) {
      const minBeds = parseInt(filters.bedrooms);
      result = result.filter(property =>
        property.bedrooms >= minBeds
      );
    }

    // Apply bathrooms filter
    if (filters.bathrooms) {
      const minBaths = parseInt(filters.bathrooms);
      result = result.filter(property =>
        property.bathrooms >= minBaths
      );
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      result = result.filter(property =>
        filters.amenities.every(amenity =>
          property.features.includes(amenity)
        )
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.features.length - a.features.length);
        break;
      default: // 'newest'
        result.sort((a, b) => b.id - a.id);
    }

    setFilteredProperties(result);
  }, [filters, properties]);

  const handleSearch = (searchParams) => {
    setSearchParams({ location: searchParams.location });
    setFilters(prev => ({
      ...prev,
      location: searchParams.location
    }));
    applyFilters();
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
    applyFilters();
  };

  return (
    <div className="min-h-screen pt-10 bg-[#0a0a0f]">
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
        <SearchBar onSearch={handleSearch} />
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
            <PropertiesGrid properties={filteredProperties} loading={loading} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Properties;