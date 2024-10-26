import React from 'react';
import { FaCode, FaCamera, FaBook, FaGamepad, FaBriefcase } from "react-icons/fa";

export default function About() {
  const about = {
    name: "Hassan Farooq",
    title: "Full Stack Developer",
    description:
      "I'm passionate about creating efficient, scalable web applications with a focus on performance and user experience. Experienced in building full-stack solutions using the latest technology, I'm always eager to learn and push the boundaries of what's possible.",
    profileImage: "https://via.placeholder.com/200", // Replace with your photo URL
    skills: ["JavaScript", "React", "Node.js", "Tailwind CSS", "MongoDB", "Express.js"],
    experience: [
      {
        role: "Senior Developer",
        company: "Tech Solutions Inc.",
        years: "2020 - Present",
      },
      {
        role: "Front-End Developer",
        company: "Creative Studios",
        years: "2018 - 2020",
      },
    ],
    hobbies: [
      { name: "Photography", icon: <FaCamera /> },
      { name: "Traveling", icon: <FaGamepad /> },
      { name: "Reading", icon: <FaBook /> },
      { name: "Gaming", icon: <FaGamepad /> },
    ],
  };

  
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      {/* Header Section */}
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-xl transition-transform duration-300 hover:scale-110">
          <img
            src={about.profileImage}
            alt={about.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500 via-transparent to-transparent opacity-60" />
        </div>
        <h1 className="text-5xl font-bold text-gray-800">{about.name}</h1>
        <p className="text-2xl text-gray-600 font-medium">{about.title}</p>
      </div>

      {/* Redesigned About Description Section with Glassmorphism */}
      <div className="relative p-8 rounded-lg shadow-lg bg-white/40 backdrop-blur-md border border-white/20">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded-full shadow-lg text-white">
          <FaCode size={30} />
        </div>
        <p className="text-lg text-gray-700 leading-relaxed text-center px-4">
          {about.description}
        </p>
      </div>

      {/* Skills Section */}
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Skills</h2>
        <ul className="flex flex-wrap gap-4">
          {about.skills.map((skill, index) => (
            <li
              key={index}
              className="bg-gradient-to-r from-blue-400 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-transform duration-200 hover:scale-105"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Experience Section */}
      <div className="bg-gradient-to-r from-blue-600 to-pink-500 text-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-semibold mb-4">Experience</h2>
        <ul className="space-y-4">
          {about.experience.map((job, index) => (
            <li key={index} className="flex flex-col">
              <span className="text-lg font-bold">{job.role}</span>
              <span className="text-gray-300">{job.company}</span>
              <span className="text-sm text-gray-400">{job.years}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hobbies Section */}
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Hobbies & Interests</h2>
        <ul className="flex flex-wrap gap-6">
          {about.hobbies.map((hobby, index) => (
            <li
              key={index}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-400 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-transform duration-200 hover:scale-105"
            >
              <span className="text-lg">{hobby.icon}</span>
              <span>{hobby.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
