import React from "react";
import { motion } from "framer-motion";
import { platformLinks, communityLinks } from "../constants";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const socialLinks = [
    { Icon: FaLinkedin, href: "https://linkedin.com/in/hassanfq", color: "text-blue-600 hover:text-blue-800" },
    { Icon: FaGithub, href: "https://github.com/hassanxheikh1033", color: "text-gray-800 hover:text-black" },
    { Icon: FaXTwitter, href: "https://twitter.com/hassanfq", color: "text-black hover:text-gray-700" },
    { Icon: FaInstagram, href: "https://instagram.com/hassanwebdev", color: "text-pink-600 hover:text-pink-800" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <footer className="relative py-16 bg-gray-50 text-gray-800 overflow-hidden">
      {/* Subtle Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              opacity: [0, 0.1, 0],
              scale: [0.5, 1, 0.5],
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="absolute w-1 h-1 bg-blue-200 rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">
            Let's{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Connect
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with my latest projects, learnings, and professional journey
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-gray-900">About</h3>
            <ul className="space-y-3">
              {platformLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 10, color: "#3b82f6" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    {link.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Community</h3>
            <ul className="space-y-3">
              {communityLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 10, color: "#3b82f6" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    {link.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Follow Me</h3>
            <div className="flex space-x-6">
              {socialLinks.map(({ Icon, href, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${color} transition-all duration-300`}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={28} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600"
        >
          {new Date().getFullYear()} Hassan Farooq. All rights reserved.
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
    </footer>
  );
};

export default Footer;
