import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { mockProperties } from '../../data/mockData';
import { Calendar, Phone, Mail, MapPin, Home, Bath, Ruler, ChevronLeft, ChevronRight } from 'lucide-react';
import ScheduleViewing from './ScheduleViewing';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  
  // Get properties from localStorage or use mockData
  const storedProperties = JSON.parse(localStorage.getItem('properties')) || mockProperties;
  const property = storedProperties.find(p => p.id === parseInt(id));

  // Custom arrow components for the carousel
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
    );
  };

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => (
      <div className="w-2 h-2 bg-white/50 rounded-full mt-4" />
    ),
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <h1 className="text-2xl text-white">Property not found</h1>
      </div>
    );
  }

  // Check if property has multiple images
  const hasMultipleImages = property.images && property.images.length > 1;

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff9f] rounded-full mix-blend-screen opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ffff] rounded-full mix-blend-screen opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a2e] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,255,159,0.1)] border border-[#2a2a3a] backdrop-blur-lg"
        >
          {/* Hero Image or Carousel */}
          <div className="relative h-[500px] bg-[#2a2a3a]">
            {hasMultipleImages ? (
              <Slider {...settings}>
                {property.images.map((image, index) => (
                  <div key={index} className="relative h-[500px]">
                    <img
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="h-full">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#00ff9f] to-[#00ffff] text-[#0a0a0f] px-6 py-3 rounded-full text-lg font-semibold shadow-[0_0_15px_rgba(0,255,159,0.5)]">
              ${property.price.toLocaleString()}
            </div>
          </div>

          {/* Property Details */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold bg-gradient-to-r from-[#00ff9f] to-[#00ffff] bg-clip-text text-transparent mb-2"
                >
                  {property.title}
                </motion.h1>
                <p className="text-[#b3b3b3] text-lg mb-4">{property.location}</p>
                <div className="flex flex-wrap items-center gap-4 text-[#b3b3b3]">
                  <div className="flex items-center gap-2 bg-[#2a2a3a] px-4 py-2 rounded-lg">
                    <MapPin className="w-4 h-4 text-[#00ff9f]" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#2a2a3a] px-4 py-2 rounded-lg">
                    <Phone className="w-4 h-4 text-[#00ff9f]" />
                    <span>{property.contactInfo || '+1 (555) 123-4567'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#2a2a3a] px-4 py-2 rounded-lg">
                    <Mail className="w-4 h-4 text-[#00ff9f]" />
                    <span>contact@buildestate.com</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsScheduleModalOpen(true)}
                className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-[#00ff9f] to-[#00ffff] text-[#0a0a0f] rounded-lg font-medium hover:shadow-[0_0_15px_rgba(0,255,159,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Schedule Viewing
              </motion.button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-[#2a2a3a] p-4 rounded-lg text-center border border-[#3a3a4a] hover:border-[#00ff9f] transition-colors"
              >
                <Home className="w-6 h-6 text-[#00ff9f] mx-auto mb-2" />
                <p className="text-[#b3b3b3]">Bedrooms</p>
                <p className="text-white text-xl font-semibold">{property.bedrooms}</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-[#2a2a3a] p-4 rounded-lg text-center border border-[#3a3a4a] hover:border-[#00ff9f] transition-colors"
              >
                <Bath className="w-6 h-6 text-[#00ff9f] mx-auto mb-2" />
                <p className="text-[#b3b3b3]">Bathrooms</p>
                <p className="text-white text-xl font-semibold">{property.bathrooms}</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-[#2a2a3a] p-4 rounded-lg text-center border border-[#3a3a4a] hover:border-[#00ff9f] transition-colors"
              >
                <Ruler className="w-6 h-6 text-[#00ff9f] mx-auto mb-2" />
                <p className="text-[#b3b3b3]">Area</p>
                <p className="text-white text-xl font-semibold">{property.area} sqft</p>
              </motion.div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#00ff9f] to-[#00ffff] bg-clip-text text-transparent mb-4">Description</h2>
              <p className="text-[#b3b3b3] leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#00ff9f] to-[#00ffff] bg-clip-text text-transparent mb-4">Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#2a2a3a] p-3 rounded-lg text-white border border-[#3a3a4a] hover:border-[#00ff9f] transition-colors"
                  >
                    {feature}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#00ff9f] to-[#00ffff] bg-clip-text text-transparent mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#2a2a3a] p-3 rounded-lg flex items-center gap-2 border border-[#3a3a4a] hover:border-[#00ff9f] transition-colors"
                  >
                    <span className="text-[#00ff9f]">{amenity.icon}</span>
                    <span className="text-white">{amenity.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Schedule Viewing Modal */}
      {isScheduleModalOpen && (
        <ScheduleViewing
          propertyId={property.id}
          propertyTitle={property.title}
          propertyLocation={property.location}
          propertyImage={property.image}
          onClose={() => setIsScheduleModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PropertyDetails; 