import React, { useState } from 'react';
import { userApi } from '../api/userApi'; // Adjust the import path as needed
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, email, password };
      console.log("User Data being sent: ", userData); // Log the user data
      await userApi.register(userData);
      setSuccess('Registration successful! You can now log in.');
      navigate('/signin')
      setError(null);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <form className="flex flex-col items-center" onSubmit={handleRegister}>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h1>
          
          {/* <div className="social-icons flex justify-center mb-4 space-x-4">
            <a href="#" className="icon p-2 text-2xl text-red-500 hover:text-red-700 transition duration-200"><FaGooglePlusG /></a>
            <a href="#" className="icon p-2 text-2xl text-blue-600 hover:text-blue-800 transition duration-200"><FaFacebookF /></a>
            <a href="#" className="icon p-2 text-2xl text-gray-800 hover:text-gray-900 transition duration-200"><FaGithub /></a>
            <a href="#" className="icon p-2 text-2xl text-blue-500 hover:text-blue-700 transition duration-200"><FaLinkedinIn /></a>
          </div>
           */}
          {/* <span className="text-sm text-gray-600 mb-4">or use your email for registration</span> */}
          
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="mb-4 w-full px-4 py-2 rounded-lg bg-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="mb-4 w-full px-4 py-2 rounded-lg bg-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="mb-4 w-full px-4 py-2 rounded-lg bg-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
          />
          
          {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
          {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}
          
          <button 
            type="submit" 
            className="w-full px-6 py-2 rounded-lg bg-blue-700 text-white uppercase font-bold hover:bg-blue-900 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
