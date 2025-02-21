import axios from 'axios';

const groupApi = {
    getGroupData: async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getGroupData`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    groupinformationdata: async (flag: any) => {
        try {
            const response = await axios.get(`http://localhost:3000/getChooseGroupData?limit=${flag}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    //上传图片和动态
    groupPostUpdate: async (title: any, image_url: any, flag: any, auditing:any, header_url:any, name:any, time:any) => {
        try {
            const response = await axios.post(`http://localhost:3000/groupPostUpdate`, {title, image_url, flag, auditing, header_url, name, time});
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default groupApi;