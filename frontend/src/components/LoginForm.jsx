import React, { useContext, useState } from 'react';
import { userApi } from '../api/userApi'; 
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext'; 

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const navigate = useNavigate();
  const { setUser } = useUser(); // Access setUser from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const userResponse = await userApi.login(userData); 
      console.log('User Response:', userResponse);

      // Save user in context
      setUser(userResponse.user); // Update context with user data
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(userResponse.user));
      
      // Redirect or show success message here
      navigate('/'); // Change to your desired route
      setSuccess('Login successful!');
      
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.'); // Handle error appropriately
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <form className="flex flex-col items-center" onSubmit={handleLogin}>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h1>
          
          <div className="social-icons flex justify-center mb-4 space-x-4">
            <a href="#" className="icon p-2 text-2xl text-red-500 hover:text-red-700 transition duration-200"><FaGooglePlusG /></a>
            <a href="#" className="icon p-2 text-2xl text-blue-600 hover:text-blue-800 transition duration-200"><FaFacebookF /></a>
            <a href="#" className="icon p-2 text-2xl text-gray-800 hover:text-gray-900 transition duration-200"><FaGithub /></a>
            <a href="#" className="icon p-2 text-2xl text-blue-500 hover:text-blue-700 transition duration-200"><FaLinkedinIn /></a>
          </div>
          
          <span className="text-sm text-gray-600 mb-4">or use your email for sign in</span>
          
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="mb-4 w-full px-4 py-2 rounded-lg bg-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="mb-4 w-full px-4 py-2 rounded-lg bg-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
            required
          />
          
          <a href="#" className="text-xs mt-2 mb-4 text-blue-700 hover:text-blue-900 transition duration-200">Forgot Your Password?</a>
          
          {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
          {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}
          
          <button 
            type="submit" 
            className="w-full px-6 py-2 rounded-lg bg-blue-700 text-white uppercase font-bold hover:bg-blue-900 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
