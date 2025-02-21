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
                        <span style="color: #fff;font-size: 20px;">资讯</span>
                    </div>
                    <div class="main-centainer">
                        <div class="main-centainer-son">
                            <el-image src="https://tse4-mm.cn.bing.net/th/id/OIP-C.Hem52AFPZJmYVWWxFbwrXQHaEO?w=313&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7" style="width: 100%;height: 100%;" class="media-image" />
                        </div>
                        <div class="main-centainer-son" style="margin: 0 20px; margin-bottom: 10px;">
                            <el-image src="https://tse2-mm.cn.bing.net/th/id/OIP-C.ZH6as-w1U9bxDL85QYfqOgAAAA?w=264&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7" style="width: 100%;height: 100%;" class="media-image" />
                        </div>
                        <div class="main-centainer-son">
                            <el-image src="https://tse1-mm.cn.bing.net/th/id/OIP-C.oWSHpzydgxr4b-_7IVu8sgHaE6?w=270&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7" style="width: 100%;height: 100%;" class="media-image" />
                        </div>
                    </div>
                    <div style="width: 100%;height: 50px;padding: 10px 0;">
                        <span style="color: #fff;font-size: 20px;">最新</span>
                    </div>
                    <div class="main-centainer-one">
                        <div class="main-centainer-one-son" v-for="(item, index) in chunkedArrays" :key="item.idinformation">
                            <div style="width: 100%; height: 100%;position: relative;cursor: pointer;">
                                <div @click="pushArticleDetailed(item.article, item.image_url)" style="width: 100%;height: 100px;">
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
                            :total="informationLength" style="height: 100%;" />
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import router from '@/router/index.ts'
import { useSwitchFlag } from '@/store';
import Cookies from 'js-cookie';
import homeApi from '@/api/home/index.ts';
import informationApi from '@/api/information/index.ts';

const store = useSwitchFlag();
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const input2 = ref('');
const userHeaderImage = ref('');
const chunkedArrays = ref([]);
const informationLength = ref();
const limit = ref(12);
const offset = ref(0);

const pushArticleDetailed = (article, articleImage) => {
    localStorage.setItem('article', article);
    localStorage.setItem('articleImage', articleImage);
    router.push('/informationDetailed');
}

//获取资讯数据
const getHomeInformation = async () => {
    const data = await homeApi.getHomeInformation();
    informationLength.value = Math.ceil(data.length / 12) * 10;
}

//初始化资讯分页数据
const initPage = async () => {
    const data = await informationApi.getPageInformation(limit.value, offset.value);
    chunkedArrays.value = data;
    console.log('chunkedArrays', chunkedArrays.value);
}

//获取资讯分页数据
const handlePageChange = async (newPage) => {
    offset.value = (newPage - 1) * 12;
    console.log('limit.value', limit.value);
    console.log('offset.value', offset.value);
    console.log('当前页码:', newPage);
    const data = await informationApi.getPageInformation(limit.value, offset.value);
    chunkedArrays.value = data;
    console.log('chunkedArrays', chunkedArrays.value);
}

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

onMounted(async () => {
    await getUserImage();
    await getHomeInformation();
    await initPage();
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

    .main-centainer {
        width: 100%;
        height: 250px;
        display: flex;

        .main-centainer-son {
            flex: 1;
            width: 30%;
            height: 250px;
            margin-bottom: 10px;
        }
    }

    .main-centainer-one {
        width: 100%;
        background-color: #444;
        display: flex;
        flex-wrap: wrap;

        .main-centainer-one-son {
            width: calc(16% - 3px);
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
</style>