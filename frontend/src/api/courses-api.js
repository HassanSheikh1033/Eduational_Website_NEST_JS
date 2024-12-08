import axios from 'axios';

const COURSES_API_URL = 'http://localhost:3000/courses';


const CoursesAPI = {
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

 
};

export default CoursesAPI;
