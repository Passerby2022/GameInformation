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
                        <div class="centainer-left-container">
                            <div class="centainer-left-containerOne" v-for="(item, index) in userNameData">
                                <div style="padding-left: 10px;padding-top: 10px;font-weight: bold;font-size: 20px;color: #fff;">如何评价游戏《{{ item.game_name }}》?</div>
                                <div style="width: 100%;height: 50px;padding-left: 20px;padding-right: 20px;margin-top: 50px;">
                                    <button @click="pushDetailed(item.game_name)" style="width: 100%;height: 100%;color: #fff;background-color: #444;border: none;border-radius: 10px;font-weight: bold;font-size: 16px;cursor: pointer;">推荐</button>
                                </div>
                                <div style="width: 100%;height: 50px;padding-left: 20px;padding-right: 20px;margin-top: 10px;">
                                    <button @click="pushDetailed(item.game_name)" style="width: 100%;height: 100%;color: #fff;background-color: #444;border: none;border-radius: 10px;font-weight: bold;font-size: 16px;cursor: pointer;">[一般]</button>
                                </div>
                                <div style="width: 100%;height: 50px;padding-left: 20px;padding-right: 20px;margin-top: 10px;">
                                    <button @click="pushDetailed(item.game_name)" style="width: 100%;height: 100%;color: #fff;background-color: #444;border: none;border-radius: 10px;font-weight: bold;font-size: 16px;cursor: pointer;">不推荐</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="centainer-right">
                        <div style="background-color: #1c1c1e;border-radius: 5px;">
                            <div
                                style="height: 40px;width: 290px;margin-bottom:20px;border-bottom: 1px solid #ccc;line-height: 40px; text-align: center;">
                                <span style="margin-right: 200px;color: #fff;">大家在聊</span>
                            </div>
                            <div
                                style="text-align: center;width: 280px;height: 100%; margin-left:10px;background-color: #1c1c1e;padding-bottom: 10px;">
                                <div class="centainer-right-switch" v-for="(item, index) in userNameData">
                                    <div style="width: 100%;height: 100%;display: flex;justify-content: center;">
                                        <img style="width: 60%;height: 100%;" :src="item.image_url">
                                        <span style="width: 40%;height: 100%;color: #fff;">{{ item.game_name }}</span>
                                    </div>
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
import discussApi from '@/api/discuss/index.ts';

const store = useSwitchFlag();
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const input2 = ref('');
const userHeaderImage = ref('');
const userNameData = ref([]);

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

//获取讨论的数据
const getHomeInformation = async() => {
    const data = await discussApi.getHomeInformation();
    userNameData.value = data;
    console.log('userNameData.value', userNameData.value);
}

const pushDetailed = (gamename) => {
    localStorage.setItem('gamename', gamename);
    router.push('/discussDetailed');
}

onMounted(async () => {
    await getUserImage();
    await getHomeInformation();
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
        height: 250px;
        background-color: #444;

        .centainer-left-container {
            height: 100%;
            background-color: skyblue;

            .centainer-left-containerOne {
                width: 100%;
                height: 280px;
                margin-bottom: 20px;
                background-color: #1c1c1e;
            }
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
            height: 90px;
            width: 280px;
            background-color: #1c1c1e;
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