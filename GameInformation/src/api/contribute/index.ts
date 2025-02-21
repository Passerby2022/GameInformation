import axios from 'axios';

const contributeApi = {
    //文章投稿
    contributeArticle: async (title: any, article:any, image_url: any, header_url:any, name:any, time:any, auditing:any) => {
        try {
            const response = await axios.post(`http://localhost:3000/contributeArticle`, {title, article, image_url, header_url, name, time, auditing});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    //资讯投稿
    contributeInformation: async (title: any, time:any, image_url: any, article:any, header_url:any, name:any, auditing:any,) => {
        try {
            const response = await axios.post(`http://localhost:3000/contributeInformation`, {title, time, image_url, article, header_url, name, auditing});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    //播客投稿
    contributePodcast: async (image_url: any, title: any, video_url:any, header_url:any, name:any, time:any, good:any, comment:any, auditing:any,) => {
        try {
            const response = await axios.post(`http://localhost:3000/contributePodcast`, {image_url, title, video_url, header_url, name, time, good, comment, auditing});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    //视频投稿
    contributeVideo: async (image_url: any, title: any, video_url:any, header_url:any, name:any, time:any, good:any, comment:any, auditing:any,) => {
        try {
            const response = await axios.post(`http://localhost:3000/contributeVideo`, {image_url, title, video_url, header_url, name, time, good, comment, auditing});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default contributeApi;