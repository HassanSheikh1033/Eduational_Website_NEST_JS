const FILEUPLOADS_API_URL = 'http://localhost:3000/fileuploads';

const FileUploadsAPI = {
    // Upload a single file
    uploadSingle: async (file) => {
        try {
            const formData = new FormData();
            formData.append('img', file);  // 'img' matches the parameter in the NestJS controller

            const response = await axios.post(`${FILEUPLOADS_API_URL}/single`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading single file:', error);
            throw error;
        }
    },


    // Upload multiple files
    uploadMultiple: async (files) => {
        try {
            const formData = new FormData();
            files.forEach(file => {
                formData.append('slides', file); 
            });

            const response = await axios.post(`${FILEUPLOADS_API_URL}/multiple`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading multiple files:', error);
            throw error;
        }
    },


};

export default FileUploadsAPI;


