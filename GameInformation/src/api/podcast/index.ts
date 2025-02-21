import axios from 'axios';

const podcastApi = {
    getPodcastData: async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getPodcastData`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getPodcastPagingData: async (limit:any, offset:any) => {
        try {
            const response = await axios.get(`http://localhost:3000/getPodcastPagingData?limit=${limit}&offset=${offset}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default  podcastApi