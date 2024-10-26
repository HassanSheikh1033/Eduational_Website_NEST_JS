import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:3000/users', // Replace with your actual API URL
});

// User API generator functions
export const userApi = {
  // Register a new user
  register: async (createUserDto) => {
    try {
      const response = await api.post('/register', createUserDto);
      return response.data; // Return the created user data
    } catch (error) {
      console.error('Registration Error:', error.response ? error.response.data : error.message); // Log the error
      throw error.response?.data || error.message; // Handle errors
    }
  },


  // Login a user
  login: async (loginUserDto) => {
    try {
      const response = await api.post('/login', loginUserDto);
      return {
        accessToken: response.data.accessToken,
        user: response.data.user // Ensure the user data is included in the response
      }; // Return login success data
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message); // Log the error
      throw error.response?.data || error.message; // Handle errors
    }
  },


  // Get all users
  getAll: async () => {
    try {
      const response = await api.get('/');
      return response.data; // Return list of users
    } catch (error) {
      console.error('Get All Users Error:', error.response ? error.response.data : error.message); // Log the error
      throw error.response?.data || error.message; // Handle errors
    }
  },

  // Get user by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data; // Return user data
    } catch (error) {
      console.error(`Get User by ID Error (ID: ${id}):`, error.response ? error.response.data : error.message); // Log the error
      throw error.response?.data || error.message; // Handle errors
    }
  },

  // Update user by ID
  update: async (id, updateUserDto) => {
    try {
      const response = await api.patch(`/${id}`, updateUserDto);
      return response.data; // Return updated user data
    } catch (error) {
      console.error(`Update User Error (ID: ${id}):`, error.response ? error.response.data : error.message); // Log the error
      throw error.response?.data || error.message; // Handle errors
    }
  },

  // Delete user by ID
  delete: async (id) => {
    try {
      await api.delete(`/${id}`);
      return 'User deleted successfully'; // Confirmation message
    } catch (error) {
      console.error(`Delete User Error (ID: ${id}):`, error.response ? error.response.data : error.message); // Log the error
      throw error.response?.data || error.message; // Handle errors
    }
  },

  // Update user avatar
  updateAvatar: async (id, file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await api.patch(`/${id}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      return response.data; // Return updated user data with avatar URL
    } catch (error) {
      console.error(`Update Avatar Error (ID: ${id}):`, error.response ? error.response.data : error.message); // Log the error
      throw error.response?.data || error.message; // Handle errors
    }
  },
};


