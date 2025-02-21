<template>
    <el-container class="layout-container-demo">
        <Aside :flag="store.flag"></Aside>

        <el-container width="100%">
            <el-header
                style="background-color: #1c1c1e; display: flex; align-items: center; justify-content: space-between; padding: 0 10px;">
                <div class="toolbar">
                    <el-button @click="store.update"
                        style="background-color: #1c1c1e; margin: 0; border: none; padding: 5px 10px;">
                        <el-icon size="26" color="#fff">
                            <Operation />
                        </el-icon>
                    </el-button>
                    <el-input v-model="input2" style="width: 240px; margin: 0;" placeholder="Please Input"
                        :suffix-icon="Search" />
                </div>
                <div class="componentStyle">
                    <el-dropdown>
                        <el-button style="margin-top: 10px; border: none; background-color: #1c1c1e; color: #fff;">
                            投稿
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="contributeInformation()">资讯</el-dropdown-item>
                                <el-dropdown-item @click="contributePodcast()">播客</el-dropdown-item>
                                <el-dropdown-item @click="contributeArticle()">文章</el-dropdown-item>
                                <el-dropdown-item @click="contributeVideo()">视频</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <el-dropdown>
                        <el-avatar :size="40" :src="userHeaderImage ? userHeaderImage : circleUrl"
                            style="margin-top:5px;" />
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="pushUserIndex()">个人主页</el-dropdown-item>
                                <el-dropdown-item @click="setting()">设置</el-dropdown-item>
                                <el-dropdown-item @click="exit()">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <el-button
                        style="margin-top: 10px; border: none;background-color: #1c1c1e;color: #fff;margin-right: -20px;">收藏</el-button>
                    <el-button
                        style="margin-top: 10px; border: none;background-color: #1c1c1e;color: #fff;margin-right: -20px;">历史</el-button>
                    <el-button
                        style="margin-top: 10px; border: none;background-color: #1c1c1e;color: #fff;">消息</el-button>
                </div>
            </el-header>

            <el-main>
                <div class="centainer">
                    <div style="width: 100%;height: 50px;padding: 10px 0;margin-top: -10px;">
                        <span style="color: #fff;font-size: 20px;">视频</span>
                    </div>
                    <div class="main-centainer-one">
                        <div class="main-centainer-one-son" v-for="(item, index) in videoData" :key="item.idvideodata">
                            <div style="width: 100%; height: 100%;position: relative;cursor: pointer;">
                                <div @click="pushDetailed(item.video_url)" style="width: 100%;height: 100px;">
                                    <el-icon :size="80" color="#ccc" class="video-icon">
                                        <VideoPlay />
                                    </el-icon>
                                    <el-image :src="item.image_url" style="width: 100%;height: 150px;"
                                        class="media-image" />
                                </div>
                                <div
                                    style="width: 90%;height: 50px;margin-left:20px;margin-top:70px;overflow: hidden;text-overflow: ellipsis;font-size: 14px;color: #fff;">
                                    {{ item.title }}
                                </div>
                                <div
                                    style="width: 90%; height: 50px; margin-left: 20px; margin-top: 20px; display: flex; align-items: center;">
                                    <div style="display: flex; align-items: center;">
                                        <img style="width: 30px; height: 30px; border-radius: 15px;"
                                            :src="item.header_url" alt="">
                                        <div style="margin-left: 10px;">
                                            <div style="color: #444;font-size: 12px;">{{ item.name }}</div>
                                            <div style="color: #444;font-size: 12px;">{{ item.time }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        style="height: 50px; width: 100%; background-color: #444; margin-top: 50px; display: flex; justify-content: center; align-items: center;">
                        <el-pagination @current-change="handlePageChange" background layout="prev, pager, next"
                            :total="videoLength" style="height: 100%;" />
                    </div>
                    <div style="width: 100%;height: 50px;padding: 10px 0;margin-top: 50px;">
                        <span style="color: #fff;font-size: 20px;">推荐</span>
                    </div>
                    <div style="height: 200px">
                        <el-carousel :interval="5000" arrow="always" height="200px">
                            <el-carousel-item v-for="(item, index) in 2" :key="index"
                                style="height: 100%;background-color: #444;">
                                <div v-for="(subItem, subIndex) in recommendData[index]" :key="subItem.idinformation"
                                    style="display: inline-block; width: 16%; height: 100%; box-sizing: border-box; margin-left: 7px;">
                                    <div style="width: 100%; height: 100%;">
                                        <div @click="pushDetailed(subItem.video_url)" style="width: 100%;height: 100px;"><el-image :src="subItem.image_url"
                                                style="width: 100%;height: 100px;cursor: pointer;" /></div>
                                        <div
                                            style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 90%;height: 50px;margin-left:5px;margin-top:20px;overflow: hidden;text-overflow: ellipsis;font-size: 14px;color: #fff;">
                                            {{ subItem.title }}</div>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import router from '@/router/index.ts';
import { useSwitchFlag } from '@/store';
import videoApi from '@/api/video/index.ts';
import Cookies from 'js-cookie';

const store = useSwitchFlag();
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const input2 = ref('');
const videoData = ref();
const videoLength = ref();
const limit = ref(12);
const offset = ref(0);
const userHeaderImage = ref('');
const recommendData = ref([]);

//文章投稿
const contributeArticle = () => {
    router.push('/contributeArticle');
}

//资讯投稿
const contributeInformation = () => {
    router.push('/contributeInformation');
}

//播客投稿
const contributePodcast = () => {
    router.push('/contributePodcast');
}

//视频投稿
const contributeVideo = () => {
    router.push('/contributeVideo');
}

//个人主页
const pushUserIndex = () => {
    router.push('/userIndex');
}

//设置
const setting = () => {
    router.push('/setting');
}

//退出登录
const exit = () => {
    localStorage.removeItem('username');
    Cookies.remove('user');
    router.push('/login').then(() => {
        // 跳转成功后刷新页面
        window.location.reload();
    });
}

//获取用户头像数据
const getUserImage = async () => {
    userHeaderImage.value = localStorage.getItem('userImageFlag');
}

//获取视频数据
const getVideoData = async () => {
    const data = await videoApi.getVideoData();
    videoLength.value = Math.ceil(data.length / 12) * 10;
    console.log('videoData', videoData.value);
}

//初始化视频分页数据
const initPage = async () => {
    const data = await videoApi.getVideoPagingData(limit.value, offset.value);
    videoData.value = data;
}

//获取视频分页数据
const handlePageChange = async (newPage) => {
    offset.value = (newPage - 1) * 12;
    console.log('当前页码:', newPage);
    const data = await videoApi.getVideoPagingData(limit.value, offset.value);
    videoData.value = data;
}

const getRecommendData = async () => {
    const data = await videoApi.getVideoPagingData(12, 0);
    for (let i = 0; i < data.length; i += 6) {
        let chunk = data.slice(i, i + 6);
        recommendData.value.push(chunk);
    }
    console.log('recommendData.value', recommendData.value);
}

//跳转详细页面
const pushDetailed = (video_url) => {
    localStorage.setItem('videoUrl', video_url)
    router.push('/detailedIndex');
}

onMounted(async () => {
    await getUserImage();
    await getVideoData();
    await initPage();
    await getRecommendData();
})
</script>

<style lang="less" scoped>
.layout-container-demo {
    height: 100vh;
    background-color: #444;

    el-container {
        el-header {
            position: relative;
            color: var(--el-text-color-primary);

            .toolbar {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                right: 20px;
                display: flex;
                align-items: center;
            }

            .componentStyle {
                display: flex;
                justify-content: space-between;
                height: 4vh;
            }
        }

        el-main {
            padding: 0;
            background-color: #444;
            display: flex;
        }
    }
}

.centainer {
    width: 95%;
    margin: 0 30px;
    background-color: #444;

    .main-centainer-one {
        width: 100%;
        background-color: #444;
        display: flex;
        flex-wrap: wrap;

        .main-centainer-one-son {
            width: calc(25% - 13px);
            height: 300px;
            background-color: #1c1c1e;
            margin-left: 10px;
            margin-bottom: 10px;
        }
    }
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

:deep(.componentStyle .el-button) {
    width: 75px;
}

.video-icon {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}

.media-image {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
</style>