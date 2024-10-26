import React from 'react';

export default function CourseDetails() {
  const course = {
    title: "Advanced React Course",
    description:
      "Delve deep into React's ecosystem with this advanced course. Learn best practices, optimize performance, and become proficient in hooks, state management, and more.",
    imageUrl: "https://via.placeholder.com/800x400", // Replace with actual image URL
    slides: [
      { name: "Introduction to React", downloadLink: "#" },
      { name: "Hooks Deep Dive", downloadLink: "#" },
      { name: "State Management", downloadLink: "#" },
    ],
    relatedCourses: [
      {
        title: "React Basics",
        description: "Master the fundamentals of React for building dynamic UIs.",
        imageUrl: "https://via.placeholder.com/400x200",
        link: "#",
      },
      {
        title: "JavaScript Essentials",
        description: "Understand JavaScript deeply to enhance your React skills.",
        imageUrl: "https://via.placeholder.com/400x200",
        link: "#",
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10">
      {/* Course Image */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70" />
      </div>

      {/* Course Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mt-4">
        {course.title}
      </h1>

      {/* Course Description */}
      <p className="text-lg text-gray-600 text-center leading-relaxed max-w-3xl mx-auto">
        {course.description}
      </p>

      {/* Slides Section */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Slides</h2>
        <ul className="divide-y divide-gray-200">
          {course.slides.map((slide, index) => (
            <li key={index} className="py-4 flex items-center justify-between">
              <span className="text-gray-700 text-lg font-medium">{slide.name}</span>
              <a
                href={slide.downloadLink}
                className="text-blue-500 hover:text-blue-700 transition font-semibold text-sm"
                download
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Related Courses Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Related Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {course.relatedCourses.map((related, index) => (
            <a
              key={index}
              href={related.link}
              className="relative block p-4 rounded-xl shadow-lg overflow-hidden bg-white transform hover:scale-105 transition duration-300"
            >
              {/* Related Course Image */}
              <div className="relative h-40 rounded-lg overflow-hidden">
                <img
                  src={related.imageUrl}
                  alt={related.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
              </div>
              
              {/* Course Title and Description */}
              <div className="pt-4">
                <h3 className="text-xl font-bold text-gray-800">{related.title}</h3>
                <p className="text-gray-600 text-sm mt-1 leading-tight">
                  {related.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}


