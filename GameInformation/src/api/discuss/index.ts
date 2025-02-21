import axios from 'axios';

const discussApi = {
    getHomeInformation: async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getGameNameData`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default discussApi;