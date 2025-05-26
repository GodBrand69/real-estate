import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { 
  Home, 
  MapPin, 
  DollarSign, 
  BedDouble, 
  Bath, 
  Maximize2,
  Building2,
  Image as ImageIcon,
  Phone,
  Plus,
  X
} from 'lucide-react';
import { mockProperties } from '../data/mockData';

const AddProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    propertyType: 'house',
    features: [],
    amenities: [],
    images: [],
    contactInfo: '',
  });

  const [newFeature, setNewFeature] = useState('');
  const [newAmenity, setNewAmenity] = useState({ icon: '', label: '' });
  const [previewImages, setPreviewImages] = useState([]);

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'mansion', label: 'Mansion' },
    { value: 'loft', label: 'Loft' },
    { value: 'studio', label: 'Studio' },
    { value: 'villa', label: 'Villa' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevState => ({
      ...prevState,
      images: files
    }));

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addAmenity = () => {
    if (newAmenity.icon && newAmenity.label) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, { ...newAmenity }]
      }));
      setNewAmenity({ icon: '', label: '' });
    }
  };

  const removeAmenity = (index) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get existing properties from localStorage or use mockData
    const existingProperties = JSON.parse(localStorage.getItem('properties')) || mockProperties;
    
    // Convert images to base64 strings
    const convertImageToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    try {
      // Convert all images to base64
      const imagePromises = formData.images.map(file => convertImageToBase64(file));
      const base64Images = await Promise.all(imagePromises);
      
      // Create new property object
      const newProperty = {
        id: existingProperties.length + 1, // Generate new ID
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        location: formData.location,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        type: formData.propertyType,
        features: formData.features,
        amenities: formData.amenities,
        image: base64Images[0] || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // Use first image or default
        images: base64Images,
        contactInfo: formData.contactInfo
      };

      // Add new property to the list
      const updatedProperties = [...existingProperties, newProperty];
      
      // Save to localStorage
      localStorage.setItem('properties', JSON.stringify(updatedProperties));

      toast.success('Property added successfully!');
      navigate('/properties');
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error('Failed to save property. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#00ff9f] to-[#00ffff] bg-clip-text text-transparent">
            Add New Property
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-[#1a1a2e] p-6 rounded-lg border border-[#2a2a3a] shadow-[0_0_15px_rgba(0,255,159,0.1)]">
              <h2 className="text-xl font-semibold text-[#00ff9f] mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-lg text-white focus:outline-none focus:border-[#00ff9f] focus:ring-1 focus:ring-[#00ff9f]"
                      placeholder="Enter property title"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-lg text-white focus:outline-none focus:border-[#00ff9f] focus:ring-1 focus:ring-[#00ff9f]"
                      placeholder="Enter property location"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-lg text-white focus:outline-none focus:border-[#00ff9f] focus:ring-1 focus:ring-[#00ff9f]"
                      placeholder="Enter property price"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Property Type</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-lg text-white focus:outline-none focus:border-[#00ff9f] focus:ring-1 focus:ring-[#00ff9f]"
                    >
                      {propertyTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-[#1a1a2e] p-6 rounded-lg border border-[#2a2a3a] shadow-[0_0_15px_rgba(0,255,159,0.1)]">
              <h2 className="text-xl font-semibold text-[#00ff9f] mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bedrooms</label>
                  <div className="relative">
                    <BedDouble className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-lg text-white focus:outline-none focus:border-[#00ff9f] focus:ring-1 focus:ring-[#00ff9f]"
                      placeholder="Number of bedrooms"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bathrooms</label>
                  <div className="relative">
                    <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-lg text-white focus:outline-none focus:border-[#00ff9f] focus:ring-1 focus:ring-[#00ff9f]"
                      placeholder="Number of bathrooms"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Area (sq ft)</label>
                  <div className="relative">
                    <Maximize2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-lg text-white focus:outline-none focus:border-[#00ff9f] focus:ring-1 focus:ring-[#00ff9f]"
                      placeholder="Property area"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-lg text-white focus:outline-none focus:border-[#00ff9f] focus:ring-1 focus:ring-[#00ff9f]"
                  placeholder="Enter property description"
                />
              </div>
            </div>

            {/* Features */}
            <div className="bg-[#1a1a2e] p-6 rounded-lg border border-[#2a2a3a] shadow-[0_0_15px_rgba(0,255,159,0.1)]">
              <h2 className="text-xl font-semibold text-[#00ff9f] mb-4">Features</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 px-4 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-lg text-white focus:outline-none focus:border-[#00ff9f] focus:ring-1 focus:ring-[#00ff9f]"
                  placeholder="Add a feature"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-[#00ff9f] text-[#0a0a0f] rounded-lg hover:bg-[#00ff9f]/90 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 bg-[#2a2a3a] rounded-full text-white"
                  >
                    <span>{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-[#1a1a2e] p-6 rounded-lg border border-[#2a2a3a] shadow-[0_0_15px_rgba(0,255,159,0.1)]">
              <h2 className="text-xl font-semibold text-[#00ff9f] mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={newAmenity.icon}
                  onChange={(e) => setNewAmenity(prev => ({ ...prev, icon: e.target.value }))}
                  className="px-4 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-lg text-white focus:outline-none focus:border-[#00ff9f] focus:ring-1 focus:ring-[#00ff9f]"
                  placeholder="Amenity icon (e.g., Wifi)"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAmenity.label}
                    onChange={(e) => setNewAmenity(prev => ({ ...prev, label: e.target.value }))}
                    className="flex-1 px-4 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-lg text-white focus:outline-none focus:border-[#00ff9f] focus:ring-1 focus:ring-[#00ff9f]"
                    placeholder="Amenity label"
                  />
                  <button
                    type="button"
                    onClick={addAmenity}
                    className="px-4 py-2 bg-[#00ff9f] text-[#0a0a0f] rounded-lg hover:bg-[#00ff9f]/90 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#2a2a3a] rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#00ff9f]">{amenity.icon}</span>
                      <span className="text-white">{amenity.label}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="bg-[#1a1a2e] p-6 rounded-lg border border-[#2a2a3a] shadow-[0_0_15px_rgba(0,255,159,0.1)]">
              <h2 className="text-xl font-semibold text-[#00ff9f] mb-4">Images</h2>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-lg text-white hover:bg-[#3a3a4a] cursor-pointer transition-colors"
                >
                  <ImageIcon className="w-5 h-5" />
                  <span>Choose Images</span>
                </label>
              </div>
              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-[#1a1a2e] p-6 rounded-lg border border-[#2a2a3a] shadow-[0_0_15px_rgba(0,255,159,0.1)]">
              <h2 className="text-xl font-semibold text-[#00ff9f] mb-4">Contact Information</h2>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-[#2a2a3a] border border-[#3a3a4a] rounded-lg text-white focus:outline-none focus:border-[#00ff9f] focus:ring-1 focus:ring-[#00ff9f]"
                  placeholder="Enter contact information"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#00ff9f] to-[#00ffff] text-[#0a0a0f] rounded-lg font-medium hover:shadow-[0_0_15px_rgba(0,255,159,0.5)] transition-all duration-300"
              >
                Add Property
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProperty; 