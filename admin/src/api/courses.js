import axios from 'axios';

const COURSES_API_URL = 'http://localhost:3000/courses';


const CoursesAPI = {
  // Create a new course
  create: async (data) => {
    try {
      const response = await axios.post(COURSES_API_URL, data);
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },


  // Get all courses
  getAll: async () => {
    try {
      const response = await axios.get(COURSES_API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  
  
  // Get a course by ID
  getById: async (id) => {
    try {
      const response = await axios.get(`${COURSES_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },



  // Update a course by ID with image and slides
  update: async (id, data) => {
    try {
     
      const response = await axios.patch(`${COURSES_API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  },



   // Delete a course by ID
   delete: async (id) => {
    try {
      await axios.delete(`${COURSES_API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  },
  



  // Testing file upload (test files endpoint)
  testFileUpload: async (files) => {
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);  // 'files' matches the parameter in the controller
      });

      const response = await axios.post(`${COURSES_API_URL}/test`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error in test file upload:', error);
      throw error;
    }
  },
};

export default CoursesAPI;
