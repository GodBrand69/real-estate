import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';

const FilterSection = ({ onFilterChange, initialFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: initialFilters.priceRange || '',
    propertyType: initialFilters.propertyType || '',
    bedrooms: initialFilters.bedrooms || '',
    bathrooms: initialFilters.bathrooms || '',
    amenities: initialFilters.amenities || [],
    sortBy: initialFilters.sortBy || 'newest'
  });

  const propertyTypes = ['All', 'Apartment', 'House', 'Villa', 'Penthouse', 'Loft', 'Studio', 'Condo', 'Townhouse', 'Mansion'];
  const priceRanges = [
    { label: 'All', value: '' },
    { label: 'Under $1M', value: '0-1000000' },
    { label: '$1M - $2M', value: '1000000-2000000' },
    { label: '$2M - $3M', value: '2000000-3000000' },
    { label: '$3M - $4M', value: '3000000-4000000' },
    { label: '$4M+', value: '4000000-999999999' }
  ];
  const bedroomOptions = ['All', '1', '2', '3', '4', '5+'];
  const bathroomOptions = ['All', '1', '2', '3', '4', '5+'];
  const amenities = ['Smart Home', 'Pool', 'Garden', 'Security', 'Gym', 'Parking', 'Workspace', 'City View', 'Concierge'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAmenityToggle = (amenity) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    
    const newFilters = { ...filters, amenities: newAmenities };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      priceRange: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      amenities: [],
      sortBy: 'newest'
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const getPriceRangeLabel = (value) => {
    const range = priceRanges.find(r => r.value === value);
    return range ? range.label : 'All';
  };

  return (
    <div className="bg-[#1a1a2e] rounded-xl border border-[#2a2a3a] overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-[#2a2a3a]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#00ff9f]" />
          <h3 className="text-lg font-medium text-white">Filters</h3>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="px-3 py-1.5 text-sm text-[#b3b3b3] hover:text-[#00ff9f] transition-colors"
          >
            Clear All
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-[#00ff9f] hover:bg-[#2a2a3a] rounded-lg transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Filter Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-4 space-y-6"
          >
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-[#00ff9f] mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full bg-[#2a2a3a] border border-[#00ff9f]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ff9f] focus:ring-1 focus:ring-[#00ff9f]/20"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-[#00ff9f] mb-2">
                Property Type
              </label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFilterChange('propertyType', type === 'All' ? '' : type)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      filters.propertyType === (type === 'All' ? '' : type)
                        ? 'bg-[#00ff9f] text-[#0a0a0f]'
                        : 'bg-[#2a2a3a] text-[#b3b3b3] hover:bg-[#3a3a4a]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-[#00ff9f] mb-2">
                Price Range
              </label>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => handleFilterChange('priceRange', range.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      filters.priceRange === range.value
                        ? 'bg-[#00ff9f] text-[#0a0a0f]'
                        : 'bg-[#2a2a3a] text-[#b3b3b3] hover:bg-[#3a3a4a]'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#00ff9f] mb-2">
                  Bedrooms
                </label>
                <div className="flex flex-wrap gap-2">
                  {bedroomOptions.map((beds) => (
                    <button
                      key={beds}
                      onClick={() => handleFilterChange('bedrooms', beds === 'All' ? '' : beds)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        filters.bedrooms === (beds === 'All' ? '' : beds)
                          ? 'bg-[#00ff9f] text-[#0a0a0f]'
                          : 'bg-[#2a2a3a] text-[#b3b3b3] hover:bg-[#3a3a4a]'
                      }`}
                    >
                      {beds}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#00ff9f] mb-2">
                  Bathrooms
                </label>
                <div className="flex flex-wrap gap-2">
                  {bathroomOptions.map((baths) => (
                    <button
                      key={baths}
                      onClick={() => handleFilterChange('bathrooms', baths === 'All' ? '' : baths)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        filters.bathrooms === (baths === 'All' ? '' : baths)
                          ? 'bg-[#00ff9f] text-[#0a0a0f]'
                          : 'bg-[#2a2a3a] text-[#b3b3b3] hover:bg-[#3a3a4a]'
                      }`}
                    >
                      {baths}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-[#00ff9f] mb-2">
                Amenities
              </label>
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      filters.amenities.includes(amenity)
                        ? 'bg-[#00ff9f] text-[#0a0a0f]'
                        : 'bg-[#2a2a3a] text-[#b3b3b3] hover:bg-[#3a3a4a]'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterSection;