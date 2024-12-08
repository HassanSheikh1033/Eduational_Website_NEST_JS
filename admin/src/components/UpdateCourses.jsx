import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import CoursesAPI from '../api/courses';
import FileUploadsAPI from '../api/fileUpload-api';

export default function UpdateCourse() {
  const { id } = useParams(); 
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [slides, setSlides] = useState([]);
  const [image, setImage] = useState(null);

  // Fetch the course data when the component mounts
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await CoursesAPI.getById(id);
        setTitle(course.name);
        setDesc(course.desc);
        setSlides(course.slides.map(slide => ({ file: slide.file, name: slide.title })));
      } catch (err) {
        toast.error('Failed to fetch course details.');
        console.error(err);
      }
    };

    fetchCourse();
  }, [id]);

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
        let imageUrl = '';
        if (image) {
            const response = await FileUploadsAPI.uploadSingle(image);
            imageUrl = response.imgPath;
        }

        // Separate new slides (ones that are files) from old slides (already uploaded URLs)
        const newSlides = slides.filter(slide => slide.file instanceof File);
        const existingSlides = slides.filter(slide => !(slide.file instanceof File));

        // Upload only new slide files
        const slideUploadResponse = await FileUploadsAPI.uploadMultiple(newSlides.map(slide => slide.file));
        const newSlideData = slideUploadResponse.slidePaths.map((url, index) => ({
            title: newSlides[index].name || "Untitled Slide", // Ensure each new slide has a title
            file: url,
        }));

        // Combine old slides and newly uploaded slides with valid structures
        const combinedSlides = [
            ...existingSlides.map(slide => ({ title: slide.name || "Untitled Slide", file: slide.file })),
            ...newSlideData,
        ];

        // Prepare update data
        const updateData = {
            name: title,
            desc,
            ...(imageUrl && { img: imageUrl }),
            slides: combinedSlides,
        };

        const updatedCourse = await CoursesAPI.update(id, updateData);

        toast.success(`Course "${updatedCourse.name}" updated successfully!`);
        console.log(updatedCourse);
        resetForm();
    } catch (err) {
        console.error('Error updating course:', err.response?.data || err.message);
        toast.error(`Error: ${err.response?.data?.message || err.message}`);
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
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Course</h2>
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
            Update Course
          </button>
        </div>
      </form>

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
    </div>
  );
}
