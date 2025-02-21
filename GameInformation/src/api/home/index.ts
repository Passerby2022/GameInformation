import axios from 'axios';

const homeApi = {
    getHomeInformation: async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getHomeInformation`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getHomeImage: async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getHomeImage`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getUserImage: async (username: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/getUserImage?username=${username}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getGameData: async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getGameData`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getRecommendData: async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getRecommendData`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getComperensive: async (limit: number) => {
        try {
            const response = await axios.get(`http://localhost:3000/getComperensive?limit=${limit}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getSelectedData: async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getSelectedData`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getPodcastLimitData: async (limit: number) => {
        try {
            const response = await axios.get(`http://localhost:3000/getPodcastLimitData?limit=${limit}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getVideoLimitData: async (limit: number) => {
        try {
            const response = await axios.get(`http://localhost:3000/getVideoLimitData?limit=${limit}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default homeApi;