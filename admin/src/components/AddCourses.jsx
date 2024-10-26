import React, { useState } from 'react';
import apiCourse from '../api/courses';

export default function AddCourses() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [slides, setSlides] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSlideUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setSlides([...slides, ...uploadedFiles]);
  };

  const removeSlide = (index) => {
    const updatedSlides = slides.filter((_, idx) => idx !== index);
    setSlides(updatedSlides);
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = new FormData();
    courseData.append('name', title);
    courseData.append('desc', desc);
    if (image) courseData.append('img', image);
    slides.forEach((slide) => {
      courseData.append('slides', slide);
    });

    try {
      const createdCourse = await apiCourse.createCourse(courseData);
      setSuccess(`Course "${createdCourse.name}" created successfully!`);
      setError(null);
      resetForm();
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDesc('');
    setSlides([]);
    setImage(null);
  };

  return (
   
    <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Course</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Course Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter course description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        {/* Slide Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Upload Slides (PDFs)</label>
          <input
            type="file"
            onChange={handleSlideUpload}
            accept=".pdf"
            className="w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            multiple
          />
          {slides.length > 0 && (
            <div className="mt-4">
              <h3 className="text-gray-700 font-semibold mb-2">Uploaded Slides:</h3>
              <ul>
                {slides.map((slide, index) => (
                  <li key={index} className="flex justify-between items-center mb-2">
                    <span>{slide.name}</span>
                    <button
                      type="button"
                      onClick={() => removeSlide(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-800 transition duration-300"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
   
  );
}
