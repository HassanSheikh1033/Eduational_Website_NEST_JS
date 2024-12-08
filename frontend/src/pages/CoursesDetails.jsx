import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the course ID from the URL
import CoursesAPI from '../api/courses-api';
import RelatedCourse from '../components/RelatedCourse';

export default function CourseDetails() {
  const { id } = useParams(); // Get course ID from the URL
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const fetchedCourse = await CoursesAPI.getById(id);
        setCourse(fetchedCourse);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course details');
      }
    };

    fetchCourse();
  }, [id]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!course) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10">
      {/* Course Image */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
        <img
          src={`http://localhost:3000/${course.img.replace(/\\/g, '/')}`}
          alt={course.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70" />
      </div>

      {/* Course Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mt-4">
        {course.name}
      </h1>

      {/* Course Description */}
      <p className="text-lg text-gray-600 text-center leading-relaxed max-w-3xl mx-auto">
        {course.desc}
      </p>

      {/* Slides Section */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Slides</h2>
        <ul className="divide-y divide-gray-200">
          {course.slides?.map((slide, index) => (
            <li key={index} className="py-4 flex items-center justify-between">
              <span className="text-gray-700 text-lg font-medium">{slide.title}</span>
              <a
                href={`http://localhost:3000/${slide.file}`}
                className="text-blue-500 hover:text-blue-700 transition font-semibold text-sm"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      </div>



      {/* Related Courses Section */}
     <RelatedCourse currentCourseId={id}/>
     
    </div>
  );
}
