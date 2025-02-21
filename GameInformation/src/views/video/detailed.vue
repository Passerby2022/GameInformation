<template>
    <el-container class="layout-container-demo">
        <Aside :flag="store.flag"></Aside>

        <el-container width="100%">
            <el-header
                style="background-color: #1c1c1e; display: flex; align-items: center; justify-content: space-between; padding: 0 10px;">
                <div class="toolbar">
                    <el-button @click="store.update"
                        style="background-color: #1c1c1e; margin: 0; border: none; padding: 5px 10px;">
                        <el-icon size="26" color="#ffv f">
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
                    <div class="main-centainer-one">
                        <div class="main-centainer-one-son">
                            <div style="width: 100%; height: 100%;">
                                <video style="width: 100%; height: 100%;" controls>
                                    <source :src="video_url" type="video/mp4">
                                </video>
                            </div>
                            <div style="margin-top: 30px;height: 100%;background-color: #1c1c1e;">
                                <div style="padding-top: 30px;padding-bottom: 30px;margin-left: 30px;margin-right: 30px;color: #fff;font-weight: bold;border-bottom: 3px solid #fff;">
                                    <div style="margin-bottom: 30px;font-size: 20px;">评论区</div>
                                    <div style="display: flex;justify-content: center;align-items: center;">
                                        <el-avatar :size="70" :src="userHeaderImage ? userHeaderImage : circleUrl" />
                                        <input placeholder="你想说什么......" style="padding-left: 30px;padding-top: -50px;margin-left: 100px;width: 700px;height: 50px;border: 1px solid #fff;border-radius: 50px;background-color: #1c1c1e;"></input>
                                        <button style="margin-left: 100px;width: 100px;height: 50px;border-radius: 50px;background-color: #ccc;border: none;cursor: pointer;">发送</button>
                                    </div>
                                    <div style="margin-top: 30px;font-size: 20px;">共{{ count }}条评论</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import router from '@/router/index.ts';
import { useSwitchFlag } from '@/store';
import videoApi from '@/api/video/index.ts';
import Cookies from 'js-cookie';

const store = useSwitchFlag();
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const input2 = ref('');
//const videoData = ref();
const videoLength = ref();
const limit = ref(12);
const offset = ref(0);
const userHeaderImage = ref('');
const video_url = localStorage.getItem('videoUrl');
const count = ref(0);

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

//const initPage = async () => {
//    const data = await videoApi.getVideoPagingData(limit.value, offset.value);
//    videoData.value = data;
//}

onMounted(async () => {
    await getUserImage();
    //await initPage();
})

onUnmounted(() => {
    localStorage.removeItem('videoUrl');
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
            width: 90vw;
            height: 725px;
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