import React, { useState } from 'react';
import ProjectsAPI from '../api/projects-api'; 


export default function AddProjects() {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    img: null,
    link: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('desc', formData.desc);
    dataToSend.append('img', formData.img);
    dataToSend.append('link', formData.link);

    try {
      const newProject = await ProjectsAPI.create(dataToSend);
      console.log('Project created successfully:', newProject);
      setFormData({
        name: '',
        desc: '',
        img: null,
        link: '',
      });
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Add New Project</h2>

        <form onSubmit={handleSubmit}>
          {/* Project Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Project Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter project name"
              required
            />
          </div>

          {/* Project Description */}
          <div className="mb-4">
            <label htmlFor="desc" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              name="desc"
              id="desc"
              value={formData.desc}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter project description"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Project Image */}
          <div className="mb-4">
            <label htmlFor="img" className="block text-gray-700 text-sm font-bold mb-2">Project Image</label>
            <input
              type="file"
              name="img"
              id="img"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Project Link */}
          <div className="mb-4">
            <label htmlFor="link" className="block text-gray-700 text-sm font-bold mb-2">Project Link</label>
            <input
              type="url"
              name="link"
              id="link"
              value={formData.link}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter project URL"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
