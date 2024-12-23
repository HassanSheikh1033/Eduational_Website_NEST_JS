import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectsAPI from "../api/projectsApi";
import { MoonLoader } from 'react-spinners';
import { FaExternalLinkAlt, FaCalendarAlt } from "react-icons/fa";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await ProjectsAPI.getAll();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
    hidden: { y: 50, opacity: 0 },
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

  if (loading) {
    return (
      <div className='flex items-center min-h-screen justify-center'>
        <MoonLoader color='#3b82f6' size={60} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">{error}</div>;
  }

  return (
    <div className="min-h-screen  py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">
            Innovative{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Exploring creativity through code, design, and problem-solving
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={`http://localhost:3000/${project.img.replace(/\\/g, '/')}`}
                  alt={project.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.desc}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    View Project
                  </motion.a>

                  <div className="flex items-center text-gray-500 text-sm">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Projects;
