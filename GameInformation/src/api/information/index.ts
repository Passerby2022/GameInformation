import axios from 'axios';

const informationApi = {
    getPageInformation: async (limit:any, offset:any) => {
        try {
            const response = await axios.get(`http://localhost:3000/getPageInformation?limit=${limit}&offset=${offset}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default informationApi;