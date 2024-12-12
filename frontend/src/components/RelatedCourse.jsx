import React, { useEffect, useState } from 'react';
import CoursesAPI from '../api/courses-api';
import { Link } from 'react-router-dom';

export default function RelatedCourse({ currentCourseId }) {
  const [relatedCourses, setRelatedCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await CoursesAPI.getAll();

        // Filter out the current course, then shuffle and take a subset (e.g., 4 courses)
        const filteredCourses = courses.filter(course => course._id !== currentCourseId);
        const shuffledCourses = filteredCourses.sort(() => 0.5 - Math.random());
        
        setRelatedCourses(shuffledCourses.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch related courses:', error);
      }
    };

    fetchCourses();
  }, [currentCourseId]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Related Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {relatedCourses.map((related, index) => (
          <Link
            to={`/courses/${related._id}`}
            key={index}
            className="relative block p-4 rounded-xl shadow-lg overflow-hidden bg-white transform hover:scale-105 transition duration-300"
          >
            <div className="relative h-40 rounded-lg overflow-hidden">
              <video
                src={`http://localhost:3000/${related.img.replace(/\\/g, '/')}`}
                muted
                controls
                autoPlay
                onMouseEnter={(e) => {
                  e.currentTarget.muted = false;
                  e.currentTarget.play();
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.muted = true;
                }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-bold text-gray-800">{related.name}</h3>
              <p className="text-gray-600 text-sm mt-1 leading-tight">
                {related.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


