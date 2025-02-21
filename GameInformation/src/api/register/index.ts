import axios from 'axios';


const registerApi = {
    registerAccount: async (username: any, password: any, phonenumber: any) => {
        try {
            const response = await axios.post(`http://localhost:3000/register`,{username, password, phonenumber});
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default registerApi;