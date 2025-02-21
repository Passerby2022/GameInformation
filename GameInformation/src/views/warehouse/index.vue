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
                    <el-carousel :interval="4000" type="card" height="300px" style="margin-bottom: 30px;">
                        <el-carousel-item v-for="(item, index) in imageData" :key="index">
                            <img style="width: 100%;height:100%;" :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <div class="button-container"
                        style="width:100%;height:70px;margin-top: 10px;margin-bottom: 10px;background-color: #1c1c1e;">
                        <template v-for="(item, index) in switchData" :key="item.flag">
                            <button class="btnSwitch" :class="[onClick === item.flag ? 'btnSwitchChange' : '']"
                                @click="switchFlagChange(item.flag)">{{ item.name }}</button>
                        </template>
                    </div>
                    <div style="width: 100%;height: 50px;padding: 10px 0;background-color: #444;">
                        <span style="color: #fff;font-size: 20px;font-weight: bold;">编辑精选</span>
                    </div>
                    <div class="main-centainer-two">
                        <div class="main-centainer-two-son" v-for="(item, index) in gameData" :key="item.idgametable"
                            @mouseenter="handleMouseEnter(index)" @mouseleave="handleMouseLeave(index)"
                            :style="boxStyle[index]">
                            <!-- 默认内容 -->
                            <div v-if="!isHovered[index]">
                                <div style="width: 100%; height: 150px; overflow: hidden; position: relative;">
                                    <img style="width: 100%; height: 100%; object-fit: cover;" :src="item.image_url"
                                        alt="" />
                                </div>
                                <div
                                    style="color: #fff; font-size: 20px; font-weight: bold; margin-top: 10px; text-align: center;">
                                    {{ item.name }}
                                </div>
                            </div>

                            <!-- 放大后的内容 -->
                            <div v-if="isHovered[index]"
                                style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                                <div style="color: #fff; font-size: 24px; font-weight: bold;">
                                    {{ item.article }}
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
import { onMounted, ref, computed } from 'vue';
import { Search } from '@element-plus/icons-vue';
import router from '@/router/index.ts';
import { useSwitchFlag } from '@/store';
import gameApi from '@/api/game/index.ts';

const store = useSwitchFlag();
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const input2 = ref('');
const onClick = ref(null);
const userHeaderImage = ref('');
const gameData = ref([]);

const imageData = [
    'https://tse3-mm.cn.bing.net/th/id/OIP-C.6A-aF6Owl0bqnn0Sim-wiQHaEC?w=286&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7',
    'https://staticg.sportskeeda.com/editor/2022/09/2f543-16624482083284-1920.jpg',
    'https://media.9game.cn/gamebase/ieu-eagle-docking-service/images/20240829/8/8/5552afbff5bddc97bafe54c997ec0c17.jpeg',
    'https://img1.dancihu.com/2024-01-16/fdad3d98-6ee4-8b1f-e863-3611342b3893.jpg',
    'https://img.3dmgame.com/uploads/images/news/20181121/1542810227_342847.jpg',
    'https://image.9game.cn/2020/4/7/145238807.jpg'
]

// 每个盒子的 hover 状态
const isHovered = ref(gameData.value.map(() => false));

// 处理鼠标移入事件
const handleMouseEnter = (index) => {
    isHovered.value[index] = true;
};

// 处理鼠标移出事件
const handleMouseLeave = (index) => {
    isHovered.value[index] = false;
};

// 动态计算每个盒子的样式
const boxStyle = computed(() => {
    return gameData.value.map((_, index) => ({
        transform: isHovered.value[index] ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.3s ease',
    }));
});

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

const switchData = ref([
    {
        name: '热门游戏',
        flag: 'flag0',
    },
    {
        name: '热门新品',
        flag: 'flag1',
    },
    {
        name: '最新游戏',
        flag: 'flag2',
    },
])

const switchFlagChange = async (index) => {
    onClick.value = index;
    if(index === 'flag0'){
        gameData.value = await gameApi.getGameTable();
    }else if(index === 'flag1'){
        gameData.value = await gameApi.getNewGameData();
    }else if(index === 'flag2'){
        gameData.value = await gameApi.getHotNewGameData();
    }
}

onMounted(async () => {
    await getUserImage();
    onClick.value = 'flag0'
    gameData.value = await gameApi.getGameTable();
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
    margin: 20px 30px 30px 30px;
    background-color: #444;

    .main-centainer-two {
        width: 100%;
        background-color: #444;
        display: flex;
        flex-wrap: wrap;

        .main-centainer-two-son {
            width: calc(25% - 13px);
            height: 200px;
            background-color: #1c1c1e;
            margin-left: 10px;
            margin-bottom: 10px;
            overflow: hidden;
            position: relative;
            transition: transform 0.3s ease;
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

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
}

.btnSwitch {
    width: 100px;
    height: 50px;
    color: #fff;
    border: none;
    background-color: #1c1c1e;
    border-radius: 5px;
}

.btnSwitch:hover {
    cursor: pointer;
}

.btnSwitchChange {
    color: #000;
    border: none;
    background-color: #fff;
    border-radius: 5px;
}

:deep(.componentStyle .el-button) {
    width: 75px;
}
</style>