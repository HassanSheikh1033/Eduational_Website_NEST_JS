import React from "react";
import { testimonials } from "../constants";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="relative py-16 lg:py-24 overflow-hidden">
      {/* Subtle Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              opacity: 0.2,
              left: Math.random() * window.innerWidth,
              top: Math.random() * window.innerHeight
            }}
            className="absolute w-2 h-2 bg-blue-200 rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">
            Client{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Reviews
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear what our clients say about their transformative experiences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              
              <div className="relative z-10">
                <FaQuoteLeft className="text-blue-500 text-3xl mb-4 opacity-50" />
                
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  {testimonial.text}
                </p>
                
                <FaQuoteRight className="text-blue-500 text-3xl ml-auto opacity-50" />
                
                <div className="flex items-center mt-6">
                  <img
                    className="w-16 h-16 rounded-full border-4 border-blue-100 mr-6 object-cover"
                    src={testimonial.image}
                    alt={testimonial.user}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {testimonial.user}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
    </div>
  );
};

export default Testimonials;
