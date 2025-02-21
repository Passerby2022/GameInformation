import axios from 'axios';

const gameApi = {
    getGameTable: async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getGameTable`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getNewGameData: async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getNewGameData`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getHotNewGameData: async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getHotNewGameData`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default gameApi;