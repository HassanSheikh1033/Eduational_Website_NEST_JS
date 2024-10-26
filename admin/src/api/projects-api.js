const PROJECTS_API_URL = 'http://localhost:3000/projects';


const ProjectsAPI = {
  // Create a new project
  create: async (data) => {
    try {
      const response = await axios.post(PROJECTS_API_URL, data);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },


  // Get all projects
  getAll: async () => {
    try {
      const response = await axios.get(PROJECTS_API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
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


  // Update a project by ID
  update: async (id, data) => {
    try {
      const response = await axios.patch(`${PROJECTS_API_URL}/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Let Axios set this automatically
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },


  // Delete a project by ID
  delete: async (id) => {
    try {
      const response = await axios.delete(`${PROJECTS_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },


};


export default ProjectsAPI;

