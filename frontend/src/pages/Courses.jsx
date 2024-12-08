import React, { useEffect, useState } from "react";
import { CardContainer, CardBody, CardItem } from "../components/3DCard";
import coursesAPI from "../api/courses-api";
import { Link } from "react-router-dom";
import { MoonLoader } from 'react-spinners';


const Courses = () => {

  const [showMore, setShowMore] = useState(false);
  const [courses, setcourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchcourses = async () => {
      try {
        const data = await coursesAPI.getAll();
        setcourses(data);
        setLoading(false);
        console.log(data)
      } catch (err) {
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchcourses();
  }, []);

  if (loading) {
    return <div className='flex items-center mt-[220px] justify-center'>
      <MoonLoader color='#0f1f69' />
    </div>
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((card, index) => (
        <CardContainer key={index} containerClassName="max-w-sm mx-auto" className="p-4 bg-white shadow-lg rounded-lg">
          <CardBody>
            <CardItem translateZ={30}>
              <img
                src={`http://localhost:3000/${card.img.replace(/\\/g, '/')}`}
                alt={card.name}
                className="w-[400px] h-[210px] object-cover rounded-lg"
              />
            </CardItem>


            <CardItem translateZ={20} className="mt-4">
              <h2 className="text-lg font-bold">{card.name}</h2>
            </CardItem>

            {/* Description */}
            <CardItem translateZ={10} className="mt-2">
              <p className={`text-gray-600 ${showMore ? '' : 'card-desc'}`}>
                {card.desc}
              </p>
            </CardItem>

            {/* Link */}
            <CardItem translateZ={10} className="mt-4">
              <Link
                to={`/courses/${card._id}`}
                className="text-blue-500 font-semibold hover:text-blue-700 hover:no-underline transition-colors duration-300 ease-in-out"
              >
                View
              </Link>
            </CardItem>

            {/* Created At */}
            <CardItem translateZ={5} className="mt-2 text-sm text-gray-400">
              <p>Featured at: {new Date(card.createdAt).toLocaleDateString()}</p>
            </CardItem>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
};


export default Courses;
