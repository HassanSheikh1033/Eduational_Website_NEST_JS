import axios from 'axios';

const PROJECTS_API_URL = 'http://localhost:3000/projects';

const ProjectsAPI = {
  // Get all projects
  getAll: async () => {
    try {
      console.log("Fetching projects...");
      const response = await axios.get(PROJECTS_API_URL);
      console.log("Response received:", response);
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error.message);
      throw error;
    }
  },
  


  // Get a project by ID
  getById: async (id) => {
    try {
      const response = await axios.get(`${PROJECTS_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },

};


export default ProjectsAPI;


