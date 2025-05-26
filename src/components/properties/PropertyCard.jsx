import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Heart, Share2, ArrowRight } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const {
    id,
    title,
    location,
    price,
    image,
    bedrooms,
    bathrooms,
    area,
    type,
    features
  } = property;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#1a1a2e] rounded-2xl overflow-hidden border border-[#2a2a3a] hover:border-[#00ff9f] transition-colors group flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-[#00ff9f] text-[#0a0a0f] rounded-full text-sm font-medium">
            {type}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="text-2xl font-bold text-white">
            ${price.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00ff9f] transition-colors line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center text-[#b3b3b3] mb-4">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-[#b3b3b3]">
              <Bed className="w-4 h-4 mr-1 flex-shrink-0" />
              <span>{bedrooms} Beds</span>
            </div>
            <div className="flex items-center text-[#b3b3b3]">
              <Bath className="w-4 h-4 mr-1 flex-shrink-0" />
              <span>{bathrooms} Baths</span>
            </div>
            <div className="flex items-center text-[#b3b3b3]">
              <Square className="w-4 h-4 mr-1 flex-shrink-0" />
              <span>{area} sqft</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#2a2a3a] text-[#00ff9f] rounded-full text-sm line-clamp-1"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <Link
          to={`/properties/${id}`}
          className="block w-full py-3 bg-gradient-to-r from-[#00ff9f] to-[#00ffff] text-[#0a0a0f] rounded-lg font-medium text-center hover:shadow-[0_0_15px_rgba(0,255,159,0.3)] transition-all mt-auto"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default PropertyCard; 