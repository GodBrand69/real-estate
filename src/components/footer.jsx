import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
// import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0f] border-t border-[#2a2a3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center space-x-3 group">
            
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00ff9f] to-[#00ffff] bg-clip-text text-transparent group-hover:from-[#00ffff] group-hover:to-[#00ff9f] transition-all duration-300">
              Real Estate
            </span>
          </Link>
            <p className="mt-4 text-[#b3b3b3] max-w-md">
              Experience the future of real estate with our AI-powered platform. Find your dream property in the digital age.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="text-[#b3b3b3] hover:text-[#00ff9f] transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#b3b3b3] hover:text-[#00ff9f] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#b3b3b3] hover:text-[#00ff9f] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-[#1a1a2e] text-[#00ff9f] rounded-lg hover:bg-[#2a2a3a] transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#2a2a3a] text-center text-[#b3b3b3]">
          <p>&copy; {new Date().getFullYear()} Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;