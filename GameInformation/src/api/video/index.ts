import axios from 'axios';

const videoApi = {
    getVideoData: async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getVideoData`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getVideoPagingData: async (limit:any, offset:any) => {
        try {
            const response = await axios.get(`http://localhost:3000/getVideoPagingData?limit=${limit}&offset=${offset}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default videoApi;