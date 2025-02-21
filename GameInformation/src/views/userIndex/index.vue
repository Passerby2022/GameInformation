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
                            <div class="centainer-left-container">
                                <div
                                    style="padding-top:10px;padding-bottom: 10px;margin-left:10px;font-weight: bold;color: #fff;cursor: pointer;">
                                    作品管理
                                    ></div>
                                <div class="centainer-left-containerOne">还没有内容</div>
                            </div>
                        </div>
                        <div style="height: 60px;margin-top: 30px;background-color: #1c1c1e;">
                            <div style="height: 60px; margin-top: 30px; background-color: #1c1c1e;">
                                <button :style="buttonStyles[0]" @click="switchFlag = 0; changeBtnStyle(switchFlag)"
                                    class="centainer-left-button">
                                    动态
                                </button>
                                <button :style="buttonStyles[1]" @click="switchFlag = 1; changeBtnStyle(switchFlag)"
                                    class="centainer-left-button">
                                    投稿
                                </button>
                            </div>
                        </div>
                        <div style="min-height: 200px;display: flex;justify-content: center;align-items: center;">
                            <div style="color: #ccc;">还没有内容</div>
                        </div>
                    </div>
                    <div class="centainer-right">
                        <div style="background-color: #1c1c1e;border-radius: 5px;">
                            <div
                                style="height: 365px;width: 100%;margin-bottom:20px;line-height: 40px; text-align: center;">
                                <el-avatar :size="100" :src="userHeaderImage ? userHeaderImage : circleUrl"
                                    style="margin-top:20px;" />
                                <div style="color:#fff;font-size: 30px;">{{ username }}</div>
                                <div
                                    style="width: 100%;height: 80px;background-color: #1c1c1e;margin-top: 30px;display: flex;justify-content: center;">
                                    <div style="flex:1;color: #fff;">
                                        <div color="#000">已关注</div>
                                        <div color="#000">0</div>
                                    </div>
                                    <div style="flex:1;color: #fff;">
                                        <div>被关注</div>
                                        <div>0</div>
                                    </div>
                                </div>
                                <div style="width: 100%;height: 60px;background-color: #1c1c1e;margin-top: 20px;">
                                    <button style="width: 135px;height: 40px;margin-top: 10px;">编辑信息</button>
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
import { Bottom, Search } from '@element-plus/icons-vue';
import router from '@/router/index.ts';
import { useSwitchFlag } from '@/store';
import Cookies from 'js-cookie';

const store = useSwitchFlag();
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const input2 = ref('');
const userHeaderImage = ref('');
const username = localStorage.getItem('username');
const buttonStyles = ref([
    {
        color: '#fff', // 这里可以根据条件改变颜色
    },
    {
        color: '#444', // 这里可以根据条件改变颜色
    },
])

const changeBtnStyle = (index) => {
    // 重置所有按钮样式
    buttonStyles.value = buttonStyles.value.map(style => ({
        ...style,
        color: '#444', // 恢复原始背景色
    }));

    // 仅更改点击的按钮样式
    buttonStyles.value[index] = {
        ...buttonStyles.value[index],
        color: '#fff',
    };
};

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
        width: 700px;
        height: 300px;
        background-color: #444;

        .centainer-left-button {
            margin-left: 10px;
            background-color: #1c1c1e;
            width: 75px;
            height: 60px;
            font-size: 16px;
            border: none;
            font-weight: bold;
            cursor: pointer;
        }

        .centainer-left-container {
            height: 100%;
            background-color: #1c1c1e;

            .centainer-left-containerOne {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 280px;
                background-color: #1c1c1e;
                color: #ccc;
            }
        }
    }

    .centainer-right {
        width: 400px;
        height: 100%;
        margin-left: 50px;
        background-color: #444;

        .button:hover {
            background-color: #444;
        }

        .centainer-right-switch {
            height: 90px;
            width: 280px;
            background-color: skyblue;
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