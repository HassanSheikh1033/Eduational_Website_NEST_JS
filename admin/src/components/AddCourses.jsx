import React, { useState } from 'react';
import CoursesAPI from '../api/courses';
import FileUploadsAPI from '../api/fileUpload-api';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

export default function AddCourses() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [slides, setSlides] = useState([]);
  const [image, setImage] = useState(null);

  const handleSlideUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      file,
      name: '',
    }));
    setSlides([...slides, ...uploadedFiles]);
  };

  const removeSlide = (index) => {
    const updatedSlides = slides.filter((_, idx) => idx !== index);
    setSlides(updatedSlides);
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSlideNameChange = (index, newName) => {
    const updatedSlides = slides.map((slide, idx) =>
      idx === index ? { ...slide, name: newName } : slide
    );
    setSlides(updatedSlides);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Upload the image
      let imageUrl = '';
      if (image) {
        const response = await FileUploadsAPI.uploadSingle(image);
        imageUrl = response.imgPath;
      }

      const response = await FileUploadsAPI.uploadMultiple(slides.map(slide => slide.file));
      console.log('Slide upload response:', response);

      const slideData = response.slidePaths.map((url, index) => ({
        title: slides[index].name, // Map to title instead of name
        file: url, // Map the file path to the file property
      }));

      // 3. Prepare course data with URLs and names
      const courseData = {
        name: title,
        desc,
        img: imageUrl,
        slides: slideData,
      };

      console.log("Course Data:", courseData);

      // 4. Create the course
      const createdCourse = await CoursesAPI.create(courseData);
      toast.success(`Course "${createdCourse.name}" created successfully!`); // Success notification
      resetForm();
    } catch (err) {
      console.error('Error creating course:', err.response?.data || err.message);
      toast.error(`Error: ${err.response?.data?.message || err.message}`); // Error notification
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
                  <li key={index} className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="mr-4">{slide.file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeSlide(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter slide name"
                      value={slide.name}
                      onChange={(e) => handleSlideNameChange(index, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Upload Thumbnail</label>
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

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
    </div>
  );
}
