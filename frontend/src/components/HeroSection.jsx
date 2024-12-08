import { Link } from "react-router-dom";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import video3 from "../assets/video3.mp4";
import video4 from "../assets/video4.mp4";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-4 py-8 lg:py-[80px]">
      <div className="text-center max-w-5xl">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Hassan
          </span>
        </h1>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-700 mb-8">
          MERN Stack{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Developer
          </span>
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Transforming innovative ideas into immersive digital experiences. 
          Crafting scalable web applications that push the boundaries of technology 
          and creativity.
        </p>
        <div className="flex justify-center space-x-6">
          <div className="hover:scale-105 transition-transform duration-300">
            <Link
              to="/courses"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full 
              shadow-lg shadow-blue-500/50 hover:shadow-xl transition-all duration-300 
              transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Browse Courses
            </Link>
          </div>
          <div className="hover:scale-105 transition-transform duration-300">
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full 
              hover:bg-blue-50 transition-all duration-300 
              transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Explore Me
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 relative w-full overflow-hidden">
        <div className="flex gap-4 animate-scroll-container">
          <div className="flex animate-scroll space-x-4">
            <div className="w-full rounded-xl overflow-hidden shadow-2xl group min-w-[300px] md:min-w-[400px]">
              <video
                autoPlay
                loop
                muted
                className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
              >
                <source src={video1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="w-full rounded-xl overflow-hidden shadow-2xl group min-w-[300px] md:min-w-[400px]">
              <video
                autoPlay
                loop
                muted
                className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
              >
                <source src={video2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="w-full rounded-xl overflow-hidden shadow-2xl group min-w-[300px] md:min-w-[400px]">
              <video
                autoPlay
                loop
                muted
                className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
              >
                <source src={video3} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="w-full rounded-xl overflow-hidden shadow-2xl group min-w-[300px] md:min-w-[400px]">
              <video
                autoPlay
                loop
                muted
                className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
              >
                <source src={video4} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="flex animate-scroll space-x-4" aria-hidden="true">
            <div className="w-full rounded-xl overflow-hidden shadow-2xl group min-w-[300px] md:min-w-[400px]">
              <video
                autoPlay
                loop
                muted
                className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
              >
                <source src={video1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="w-full rounded-xl overflow-hidden shadow-2xl group min-w-[300px] md:min-w-[400px]">
              <video
                autoPlay
                loop
                muted
                className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
              >
                <source src={video2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="w-full rounded-xl overflow-hidden shadow-2xl group min-w-[300px] md:min-w-[400px]">
              <video
                autoPlay
                loop
                muted
                className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
              >
                <source src={video3} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="w-full rounded-xl overflow-hidden shadow-2xl group min-w-[300px] md:min-w-[400px]">
              <video
                autoPlay
                loop
                muted
                className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
              >
                <source src={video4} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
