import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import { Link } from "react-router-dom";
import { useUser } from '../context/userContext';
import {userApi} from '../api/userApi'
import { h1 } from "framer-motion/client";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { user, setUser } = useUser();
  const [profileImg, setProfileImg] = useState('')

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };


  useEffect(() => {
    const fetchUser = async () => {
      if (user && user._id) {
        try {
          const userData = await userApi.getById(user._id); 
          if (JSON.stringify(userData) !== JSON.stringify(user)) {
            setProfileImg(userData); 
            console.log(userData)
            console.log(userData.avatar)
          }
        } catch (error) {
          console.error('Failed to fetch user:', error); 
        }
      }
    };

    fetchUser();
  }, [user, setUser]); 



  return (
    <nav className="sticky top-0 z-50 py-3 px-6 backdrop-blur-lg bg-white border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight font-medium">HF Tech</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12 font-medium text-blue-950">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>

          {user ? (
            <Link
              to={`/updateProfile/${user._id}`}
              className="flex items-center space-x-2 p-2 rounded-md"
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                {profileImg.avatar ? (
                  <img
                    src={`http://localhost:3000${profileImg.avatar}`}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 flex items-center justify-center h-full">
                    {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                  </span>
                )}
              </div>
              <span className="text-gray-700">{user.username || 'Profile'}</span>
            </Link>
          ) : (
            <Link
              to="/signin"
              className="text-gray-700 p-2 hover:bg-gray-200 rounded-md"
            >
              Sign In
            </Link>
          )}

          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a href="#" className="py-2 px-3 border font-medium border-neutral-700/80 rounded-md">
              Sign In
            </a>
            <Link
              to={'/signup'}
              className="bg-gradient-to-r from-blue-500 text-white to-blue-900 py-2 px-3 rounded-md"
            >
              Create an account
            </Link>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a href="#" className="py-2 px-3 border rounded-md">
                Sign In
              </a>
              <a
                href="#"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
              >
                Create an account
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
