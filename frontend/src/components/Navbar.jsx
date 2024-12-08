import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../context/userContext';
import { userApi } from '../api/userApi';

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { user, setUser } = useUser();
  const [profileImg, setProfileImg] = useState('');
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user._id) {
        try {
          const userData = await userApi.getById(user._id);
          setProfileImg(userData);
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
    <nav className="sticky top-0 z-50 py-3 px-6 bg-white border-b border-neutral-300 shadow-sm backdrop-blur-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img className="h-10 w-10" src={logo} alt="Logo" />
          <span className="text-xl font-semibold text-gray-900">HF Tech</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 font-medium text-gray-700">
          {user && navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.href} className="hover:text-blue-500 transition duration-200">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Profile and Actions - Desktop */}
        {user ? (
          <div className="hidden lg:flex items-center space-x-4">
            <Link to={`/updateProfile/${user._id}`} className="flex items-center space-x-2">
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
            <button
              onClick={handleLogout}
              className="text-gray-700 p-2 hover:bg-gray-200 rounded-md transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex space-x-6">
            <Link to="/signin" className="text-gray-700 p-2 hover:bg-gray-200 rounded-md">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
            >
              Create an account
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button onClick={toggleNavbar} className="lg:hidden p-2">
          {mobileDrawerOpen ? "" : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-40 flex flex-col h-screen bg-opacity-15 bg-black items-center justify-center space-y-6 lg:hidden">
          <div className="bg-white w-4/5 max-w-sm p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-semibold text-gray-900"></span>
              <button onClick={toggleNavbar} className="text-gray-700">
                <X size={24} />
              </button>
            </div>

            <ul className="space-y-4 text-lg font-medium text-gray-800">
              {user && navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    onClick={toggleNavbar}
                    className="block py-2 px-4 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-4">
              {user ? (
                <div className="flex flex-col space-y-4">
                  <Link to={`/updateProfile/${user._id}`} className="py-2 px-4 bg-gray-200 text-center rounded-md">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="py-2 px-4 bg-gradient-to-r from-red-500 to-red-700 text-white text-center rounded-md transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/signin" className="py-2 px-4 bg-gray-200 text-center rounded-md">
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center rounded-md"
                  >
                    Create an account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
