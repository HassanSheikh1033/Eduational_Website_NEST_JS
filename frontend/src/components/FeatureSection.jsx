import React from "react";
import { features } from "../constants";

const FeatureSection = () => {
  return (
    <div className="relative py-16 lg:py-24 overflow-hidden">
      {/* Subtle Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              opacity: 0,
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
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Education
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Where I Honed My Skills and Knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-6 flex items-center">
                <div
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  Learn More
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

export default FeatureSection;
