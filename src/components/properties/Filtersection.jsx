import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@mui/material';

const FilterSection = ({ filters, onFilterChange }) => {
  const handleChange = (name, value) => {
    onFilterChange({ [name]: value });
  };

  return (
    <div className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3a]">
      <h2 className="text-xl font-semibold text-white mb-6">Filters</h2>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-[#b3b3b3] mb-2">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value)}
          className="w-full bg-[#2a2a3a] text-white rounded-lg p-2 border border-[#3a3a4a] focus:border-[#00ff9f] focus:outline-none"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="area-low">Area: Low to High</option>
          <option value="area-high">Area: High to Low</option>
        </select>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <label className="block text-[#b3b3b3] mb-2">Property Type</label>
        <select
          value={filters.type}
          onChange={(e) => handleChange('type', e.target.value)}
          className="w-full bg-[#2a2a3a] text-white rounded-lg p-2 border border-[#3a3a4a] focus:border-[#00ff9f] focus:outline-none"
        >
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="penthouse">Penthouse</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-[#b3b3b3] mb-2">Price Range</label>
        <Slider
          value={filters.priceRange || [0, 5000000]}
          onChange={(_, value) => handleChange('priceRange', value)}
          valueLabelDisplay="auto"
          min={0}
          max={5000000}
          step={100000}
          valueLabelFormat={(value) => `$${value.toLocaleString()}`}
          sx={{
            color: '#00ff9f',
            '& .MuiSlider-thumb': {
              backgroundColor: '#00ff9f',
            },
            '& .MuiSlider-track': {
              backgroundColor: '#00ff9f',
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#2a2a3a',
            },
          }}
        />
      </div>

      {/* Bedrooms */}
      <div className="mb-6">
        <label className="block text-[#b3b3b3] mb-2">Bedrooms</label>
        <select
          value={filters.bedrooms}
          onChange={(e) => handleChange('bedrooms', e.target.value)}
          className="w-full bg-[#2a2a3a] text-white rounded-lg p-2 border border-[#3a3a4a] focus:border-[#00ff9f] focus:outline-none"
        >
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>

      {/* Bathrooms */}
      <div className="mb-6">
        <label className="block text-[#b3b3b3] mb-2">Bathrooms</label>
        <select
          value={filters.bathrooms}
          onChange={(e) => handleChange('bathrooms', e.target.value)}
          className="w-full bg-[#2a2a3a] text-white rounded-lg p-2 border border-[#3a3a4a] focus:border-[#00ff9f] focus:outline-none"
        >
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-[#b3b3b3] mb-2">Amenities</label>
        <div className="space-y-2">
          {['Pool', 'Gym', 'Parking', 'Security', 'Garden'].map((amenity) => (
            <label key={amenity} className="flex items-center text-white">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={(e) => {
                  const newAmenities = e.target.checked
                    ? [...filters.amenities, amenity]
                    : filters.amenities.filter((a) => a !== amenity);
                  handleChange('amenities', newAmenities);
                }}
                className="mr-2 rounded border-[#3a3a4a] bg-[#2a2a3a] text-[#00ff9f] focus:ring-[#00ff9f]"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection; 