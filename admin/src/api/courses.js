import axios from 'axios';

const BASE_URL = 'http://localhost:3000/courses'; // Adjust the base URL as needed


const apiCourse = {
    async createCourse(courseData, imgFile, slidesFiles) {
        const formData = new FormData();

        // Append image file if it exists
        if (imgFile) {
            formData.append('img', imgFile);
        }

        // Append multiple slide files if they exist
        if (slidesFiles && slidesFiles.length > 0) {
            slidesFiles.forEach((file) => {
                formData.append('slides', file); // Append each slide file
            });
        }

        // Append other course data
        formData.append('name', courseData.name);
        formData.append('desc', courseData.desc);

        try {
            const response = await axios.post(BASE_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data; // Return created course data
        } catch (error) {
            console.error("Error response:", error.response); // Log the error response
            throw new Error(error.response?.data?.message || 'Error creating course');
        }
    },





    async getAllCourses() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data; // Return array of courses
        } catch (error) {
            throw new Error(error.response.data.message || 'Error fetching courses');
        }
    },




    async getCourseById(id) {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data; // Return course data by ID
        } catch (error) {
            throw new Error(error.response.data.message || 'Error fetching course');
        }
    },




    async updateCourse(id, updateData, imgFile, slidesFiles) {
        const formData = new FormData();

        if (imgFile) {
            formData.append('img', imgFile); // Append new image file
        }

        if (slidesFiles) {
            slidesFiles.forEach((file) => {
                formData.append('slides', file); // Append new slide files
            });
        }

        // Append other update data
        formData.append('name', updateData.name);
        formData.append('desc', updateData.desc);

        try {
            const response = await axios.patch(`${BASE_URL}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data; // Return updated course data
        } catch (error) {
            throw new Error(error.response.data.message || 'Error updating course');
        }
    },
};

export default apiCourse;
