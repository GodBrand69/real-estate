import React from 'react';
import { motion } from 'framer-motion';
import { Home, Shield, TrendingUp, Clock, Users, Star } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Premium Properties",
      description: "Discover our curated collection of luxury homes and apartments in prime locations."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Transactions",
      description: "Your security is our priority with encrypted and protected property transactions."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Investment Opportunities",
      description: "Access exclusive real estate investment opportunities with high potential returns."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Our dedicated team is available round the clock to assist you with any queries."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Agents",
      description: "Work with experienced real estate professionals who understand your needs."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Verified Listings",
      description: "All our property listings are thoroughly verified for authenticity and accuracy."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#00ff9f] to-[#00ffff] text-transparent bg-clip-text mb-4">
            Why Choose Us
          </h2>
          <p className="text-[#b3b3b3] max-w-2xl mx-auto">
            Experience the future of real estate with our innovative platform, designed to make your property journey seamless and successful.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[#1a1a2e] p-8 rounded-lg border border-[#2a2a3a] hover:border-[#00ff9f] transition-all duration-300"
            >
              <div className="text-[#00ff9f] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-[#b3b3b3]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;