import React from 'react';

const ContactSection = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center py-10 px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">
          Contact <span className="relative bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">
            ME
            <span className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-900 opacity-70 rounded-md"></span>
          </span>
        </h1>
        <p className="text-gray-500 text-lg mt-8">
          I would love to hear from you! Feel free to reach out.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between w-full max-w-5xl">
        {/* Left Section */}
        <section className="flex flex-col w-full lg:w-1/3 lg:mr-16">
          {/* Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold relative inline-block mb-4 text-gray-900">
              Get In Touch
              <span className="absolute w-1/2 h-0.5 bg-gray-700 left-0 bottom-0"></span>
              <span className="absolute w-1/4 h-1 bg-blue-500 left-0 bottom-0 transform translate-y-1"></span>
            </h2>
            <p className="text-gray-500 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
            </p>
          </div>

          {/* Contact Info */}
          <div className="mb-4">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 border-2 border-gray-500 rounded-full flex items-center justify-center mr-4">
                <i className="fa-solid fa-phone text-gray-700 text-lg"></i>
              </div>
              <div>
                <span className="text-gray-800 block">Phone</span>
                <span className="text-gray-500">+923007592310</span>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 border-2 border-gray-500 rounded-full flex items-center justify-center mr-4">
                <i className="fa-solid fa-envelope text-gray-700 text-lg"></i>
              </div>
              <div>
                <span className="text-gray-800 block">Email</span>
                <span className="text-gray-500">hassanfarooq1033@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 border-2 border-gray-500 rounded-full flex items-center justify-center mr-4">
                <i className="fa-solid fa-location-dot text-gray-700 text-lg"></i>
              </div>
              <div>
                <span className="text-gray-800 block">Location</span>
                <span className="text-gray-500">X Street, Y Road, San Francisco</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-800 text-white rounded-md transition">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-800 text-white rounded-md transition">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-800 text-white rounded-md transition">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-800 text-white rounded-md transition">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </section>

        {/* Right Section */}
        <section className="w-full lg:w-2/3 mt-10 lg:mt-0">
          <form className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-6">
              <input
                type="text"
                required
                className="w-full px-3 py-4 rounded-md bg-white text-black border-b-2 border-gray-600 focus:border-blue-500 outline-none"
                placeholder="Your Name"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-6">
              <input
                type="email"
                required
                className="w-full px-3 py-4 rounded-md bg-white text-black border-b-2 border-gray-600 focus:border-blue-500 outline-none"
                placeholder="Email"
              />
            </div>
            <div className="w-full px-2 mb-6">
              <input
                type="text"
                required
                className="w-full px-3 py-4 rounded-md bg-white text-black border-b-2 border-gray-600 focus:border-blue-500 outline-none"
                placeholder="Subject"
              />
            </div>
            <div className="w-full px-2 mb-6">
              <textarea
                required
                className="w-full h-40 px-3 py-4 rounded-md bg-white text-black border-b-2 border-gray-600 focus:border-blue-500 outline-none resize-none"
                placeholder="Say Something"
              ></textarea>
            </div>
            <div className="w-full px-2">
              <button className="w-full py-2 bg-gradient-to-r from-blue-500  to-blue-900 text-white rounded-lg transition">
                Send Message
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};



export default ContactSection;


