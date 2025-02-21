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
                <div class="componentStyle"
                    style="background-color: #444;width: 250px;padding: 4px 0px;border-radius: 8vw;">
                    <el-button round :style="buttonStyles[0]"
                        @click="switchFlag = 0; changeBtnStyle(switchFlag)">关注</el-button>
                    <el-button round :style="buttonStyles[1]"
                        @click="switchFlag = 1; changeBtnStyle(switchFlag)">最新</el-button>
                    <el-button round :style="buttonStyles[2]"
                        @click="switchFlag = 2; changeBtnStyle(switchFlag)">游戏</el-button>
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
                    
                    </div>
                    <div class="centainer-right">
                        <div style="background-color: #1c1c1e;border-radius: 5px;">
                            <div
                                style="height: 40px;width: 290px;margin-bottom:20px;border-bottom: 1px solid #ccc;line-height: 40px; text-align: center;">
                                <span style="margin-right: 200px;color: #fff;">内容推荐</span>
                            </div>
                            <div style="text-align: center;width: 280px;height: 280px; margin-left:10px;">
                                <button class="button">我的年度总结</button>
                                <button class="button">一枚生活碎片</button>
                                <button class="button">梗图回收站</button>
                                <button class="button">STEAM特卖购物车</button>
                                <button class="button">昭和米国物语</button>
                                <button class="button">资讯宝贝内容推荐</button>
                                <button class="button">玩家叨逼叨</button>
                            </div>
                        </div>
                        <div style="background-color: #1c1c1e;margin-top: 30px;border-radius: 5px;">
                            <div
                                style="height: 40px;width: 290px;margin-bottom:20px;border-bottom: 1px solid #ccc;line-height: 40px; text-align: center;">
                                <span style="margin-right: 200px;color: #fff;">文章精选</span>
                            </div>
                            <div
                                style="text-align: center;width: 280px;height: 100%; margin-left:10px;background-color: #1c1c1e;padding-bottom: 10px;">
                                <div class="centainer-right-switch">
                                </div>
                                <div class="centainer-right-switch">
                                </div>
                                <div class="centainer-right-switch">
                                </div>
                                <div class="centainer-right-switch">
                                </div>
                                <div class="centainer-right-switch">
                                </div>
                                <div class="centainer-right-switch">
                                </div>
                                <div class="centainer-right-switch">
                                </div>
                                <div class="centainer-right-switch">
                                </div>
                                <div class="centainer-right-switch">
                                </div>
                                <div class="centainer-right-switch">
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
import homeApi from '@/api/home/index.ts';

const store = useSwitchFlag();
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const input2 = ref('');
const switchFlag = ref(0);
const userHeaderImage = ref('');
//const btnStyleChange = ref(1)

const buttonStyles = ref([
    {
        border: 'none',
        backgroundColor: '#444', // 这里可以根据条件改变颜色
        color: '#fff',
    },
    {
        border: 'none',
        backgroundColor: '#444', // 这里可以根据条件改变颜色
        color: '#fff',
    },
    {
        border: 'none',
        backgroundColor: '#444', // 这里可以根据条件改变颜色
        color: '#fff',
    }
])

const changeBtnStyle = (index) => {
    // 重置所有按钮样式
    buttonStyles.value = buttonStyles.value.map(style => ({
        ...style,
        backgroundColor: '#444', // 恢复原始背景色
    }));

    // 仅更改点击的按钮样式
    buttonStyles.value[index] = {
        ...buttonStyles.value[index],
        backgroundColor: '#1c1c1e',
    };

    if (index === 0) {
        router.push('/cencern');
    }

    if (index === 1) {
        router.push('/');
    }

    if (index === 2) {
        router.push('/game');
    }
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
    const username = localStorage.getItem('username');
    const data = await homeApi.getUserImage(username);
    userHeaderImage.value = data[0].image_url;
    localStorage.setItem('userImageFlag', userHeaderImage.value);
    console.log('username', username);
    console.log('data', data);
    console.log('userImage.value', userHeaderImage.value);
}

onMounted(async () => {
    changeBtnStyle(switchFlag.value);
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
        width: 800px;
        height: 300px;
        border: 1px solid #ccc;
        background-color: #1c1c1e;
    }

    .centainer-right {
        width: 300px;
        height: 100%;
        margin-left: 50px;
        border: 1px solid #ccc;
        //background-color: #1c1c1e;
        background-color: #444;

        .button {
            display: block;
            background-color: #1c1c1e;
            border: none;
            height: 30px;
            width: 100%;
            margin-bottom: 10px;
            text-align: left;
            color: #fff;
            cursor: pointer;
        }

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

:deep(.componentStyle .el-button) {
    width: 75px;
}
</style>