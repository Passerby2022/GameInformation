import axios from 'axios';

const loginApi = {
    loginInterface: async (username: any, password: any) => {
        try {
            const response = await axios.get(`http://localhost:3000/user?username=${username}&password=${password}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default loginApi;