import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from '../context/userContext';
import { userApi } from '../api/userApi';

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { user, setUser } = useUser();
  const [profileImg, setProfileImg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user._id) {
        try {
          const userData = await userApi.getById(user._id);
          setProfileImg(userData);
          console.log(userData);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };
    fetchUser();
  }, [user, setUser]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 py-3 px-6 bg-white/80 border-b border-neutral-300 shadow-sm backdrop-blur-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with hover effect */}
        <div
          className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={() => navigate('/')}
        >
          <img
            className="h-10 w-10 rounded-full shadow-md transition-transform"
            src={logo}
            alt="Logo"
          />
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            HF Tech
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 font-medium text-gray-700">
          {user && navItems.map((item, index) => (
            <li
              key={index}
              className="hover:scale-105 transition-transform duration-200"
              style={{
                borderBottom: location.pathname === item.href
                  ? '2px solid rgb(59 130 246)'
                  : '2px solid transparent'
              }}
            >
              <Link
                to={item.href}
                className="hover:text-blue-500 transition duration-200 pb-1"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Profile and Actions - Desktop */}
        {user ? (
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to={`/updateProfile/${user._id}`}
              className="flex items-center space-x-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden border-2 border-blue-500 group-hover:scale-110 transition-transform">
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
              {/* <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                {user.username || 'Profile'}
              </span> */}
            </Link>
            <button
              onClick={handleLogout}
              className="text-white bg-gradient-to-r from-red-500 to-red-700 p-2 rounded-md hover:scale-105 hover:shadow-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex space-x-6">
            <div
              className="text-gray-700 p-2 hover:bg-gray-200 rounded-md hover:scale-105 transition-transform duration-200"
            >
              <Link to="/signin">Sign In</Link>
            </div>
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-md transition duration-200 hover:scale-105"
            >
              <Link to="/signup">Create an account</Link>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={toggleNavbar}
          className="lg:hidden p-2 active:scale-90 transition-transform"
        >
          {mobileDrawerOpen ? "" : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-40 flex flex-col h-screen bg-black bg-opacity-50 items-center justify-center space-y-6 lg:hidden animate-fade-in">
          <div className="bg-white w-4/5 max-w-sm p-6 rounded-lg shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                HF Tech
              </span>
              <button
                onClick={toggleNavbar}
                className="text-gray-700 active:scale-90 transition-transform"
              >
                <X size={24} />
              </button>
            </div>

            <ul className="space-y-4 text-lg font-medium text-gray-800">
              {user &&
                navItems.map((item, index) => (
                  <li
                    key={index}
                    className={`transition-all duration-200 hover:translate-x-2 ${location.pathname === item.href ? 'bg-blue-50 text-blue-600' : ''
                      }`}
                  >
                    <Link
                      to={item.href}
                      onClick={toggleNavbar}
                      className={`block py-2 px-4 rounded-md transition-colors duration-200 ${location.pathname === item.href ? 'text-blue-600' : 'text-gray-800'
                        }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              {user && (
                <li className="transition-all duration-200 hover:translate-x-2">
                  <Link
                    to={`/updateProfile/${user._id}`}
                    onClick={toggleNavbar}
                    className={`block py-2 px-4 rounded-md ${location.pathname === `/updateProfile/${user._id}`
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-100'
                      }`}
                  >
                    Profile
                  </Link>
                </li>
              )}
            </ul>


            <div className="mt-8 space-y-4">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    toggleNavbar();
                  }}
                  className="w-full text-white bg-gradient-to-r from-red-500 to-red-700 p-3 rounded-md hover:shadow-lg transition duration-200"
                >
                  Logout
                </button>
              ) : (
                <div className="space-y-4">
                  <Link
                    to="/signin"
                    onClick={toggleNavbar}
                    className="block w-full text-center text-gray-700 p-3 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={toggleNavbar}
                    className="block w-full text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-md transition-colors"
                  >
                    Create an account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
