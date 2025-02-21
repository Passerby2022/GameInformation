import axios from 'axios';

const settingApi = {
    //修改账号名称
    changeUsername: async (newUsername: any, oldUsername: any) => {
        try {
            const response = await axios.post(`http://localhost:3000/changeUsername`, {newUsername, oldUsername});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    //修改密码
    changePassword: async (newPassword: any, oldUsername: any) => {
        try {
            const response = await axios.post(`http://localhost:3000/changePassword`, {newPassword, oldUsername});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default settingApi;