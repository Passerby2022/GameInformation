import axios from 'axios';

const editApi = {
    getArticleData: async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getArticleData`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getArticlePagingData: async (limit:any, offset:any) => {
        try {
            const response = await axios.get(`http://localhost:3000/getArticlePagingData?limit=${limit}&offset=${offset}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default editApi;