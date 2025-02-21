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
                    <div class="centainer-left">
                        <div @click="pushUp()" style="padding-left: 20px;padding-top: 20px;width: 100%;height: 50px;background-color: #1c1c1e;color: #fff;font-size: 20px;font-weight: bold;cursor: pointer;">
                            &lt;返回
                        </div>
                        <div class="centainer-left-container" v-for="item in groupData" :key="groupData.idgroupinformationdata">
                            <div style="width: 100%;height: 100%;">
                                <div
                                    style="width: 90%;padding-top: 20px;margin-left: 20px; margin-top: 20px; display: flex; align-items: center;">
                                    <div style="display: flex; align-items: center;">
                                        <img style="width: 50px; height: 50px; border-radius: 25px;"
                                            :src="item.header_url" alt="">
                                        <div style="margin-left: 10px;">
                                            <div style="color: #444;font-size: 20px;font-weight: bold;color: #fff;">{{ item.name }}</div>
                                            <div style="color: #444;font-size: 14px;color: #ccc;">{{ item.time }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex;justify-content: center;margin-top: 20px; margin-bottom: 20px;width: 100%;height: 100%;">
                                    <img style="width: 90%;height: 100%;" :src="item.image_url" alt="">
                                </div>
                                <div style="display: flex;justify-content: center;width: 100%;height: 100%;padding-bottom: 20px;padding-left: 15px;">
                                    <div style="color: #fff;font-size: 18px;">{{ item.title }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="centainer-right">
                        <div style="background-color: #1c1c1e;border-radius: 5px;">
                            <div
                                style="height: 100px;width: 290px;margin-bottom:20px;line-height: 40px; text-align: center;">
                                <button
                                    style="width: 250px;height: 40px;margin-left:10px;margin-top:15px;color: #000;font-size: 16px;cursor: pointer;">发布动态</button>
                                <div style="color: #ccc;font-size: 12px;">分享你的兴趣和创作，与同好深入交流</div>
                            </div>
                        </div>
                        <div style="background-color: #1c1c1e;margin-top: 30px;border-radius: 5px;">
                            <div
                                style="height: 40px;width: 290px;margin-bottom:20px;border-bottom: 1px solid #ccc;line-height: 40px; text-align: center;">
                                <span style="margin-right: 200px;color: #fff;">分组推荐</span>
                            </div>
                            <div
                                style="text-align: center;width: 280px;height: 100%; margin-left:10px;background-color: #1c1c1e;padding-bottom: 10px;">
                                <div @click="changeFlag(0)" class="centainer-right-switch">
                                    我的年度总结
                                </div>
                                <div @click="changeFlag(1)" class="centainer-right-switch">
                                    一枚生活碎片
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
import { onMounted, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import router from '@/router/index.ts';
import { useSwitchFlag } from '@/store';
import Cookies from 'js-cookie';
import groupApi from '@/api/group/index.ts';

const store = useSwitchFlag();
const userHeaderImage = ref('');
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const input2 = ref('');
const image = ref([
    'https://image.gcores.com/6305b0eb281766b96e9bb8212c7b00c4-1600-440.jpg?x-oss-process=image/resize,limit_1,m_fill,w_846,h_233/quality,q_90/format,webp',
    'https://www.gcores.com/talks/1016257',
])
const groupData = ref([]);

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
    const data = localStorage.getItem('userImageFlag');
    userHeaderImage.value = data;
}

//获取分组筛选的数据
const groupinformationdata = async () => {
    const data = await groupApi.groupinformationdata(localStorage.getItem('flag'));
    groupData.value = data;
    console.log('groupData.value', groupData.value);
}

const changeFlag = async (index) => {
    localStorage.setItem('flag', index);
    await groupinformationdata();
}

const pushUp = () => {
    router.push('/group');
}

onMounted(async () => {
    await getUserImage();
    await groupinformationdata();
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
    width: 90%;
    margin-top: 20px;
    margin-left: 150px;
    background-color: #444;
    display: flex;

    .centainer-left {
        width: 800px;
        height: 100%;
        background-color: #444;

        .centainer-left-container {
            width: 100%;
            height: 100%;
            background-color: #1c1c1e;
            margin-top: -20px;
            margin-bottom: 50px;
        }
    }

    .centainer-right {
        width: 300px;
        height: 100%;
        margin-left: 50px;
        background-color: #444;

        .button:hover {
            background-color: #444;
        }

        .centainer-right-switch {
            height: 25px;
            width: 280px;
            color: #fff;
            background-color: #444;
            margin-bottom: 10px;
            cursor: pointer;
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
</style>