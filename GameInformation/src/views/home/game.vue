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
                    <el-carousel :interval="4000" type="card" height="300px" style="margin-bottom: 30px;">
                        <el-carousel-item v-for="(item, index) in imageData" :key="index">
                            <img style="width: 100%;height:100%;" :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
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
                    <div
                        style="width: 100%; height: 50px; padding: 10px 0; display: flex; justify-content: space-between; align-items: center;background-color: #444;">
                        <span style="color: #fff;font-size: 20px;font-weight: bold;">游戏合集</span>
                        <span @click="pushWareHouse()"
                            style="color: #fff;font-size: 20px;font-weight: bold;cursor: pointer;">查看全部</span>
                    </div>
                    <div style="height: 200px">
                        <el-carousel :interval="5000" arrow="always" height="200px">
                            <el-carousel-item v-for="(item, index) in 4" :key="index"
                                style="height: 100%;background-color: #444;">
                                <div v-for="(subItem, subIndex) in hotnewgameData[index]" :key="subItem.idnewgametable"
                                    style="display: inline-block; width: 25%; height: 100%; box-sizing: border-box;">
                                    <div style="width: 100%; height: 100%;">
                                        <div style="width: 100%;height: 100%;cursor:pointer;"><el-image
                                                :src="subItem.image_url" style="width: 100%;height: 170px;" /></div>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div
                        style="width: 100%; height: 50px; padding: 10px 0; display: flex; justify-content: space-between; align-items: center;background-color: #444;">
                        <span style="color: #fff;font-size: 20px;font-weight: bold;">新品游戏</span>
                        <span @click="pushWareHouse()"
                            style="color: #fff;font-size: 20px;font-weight: bold;cursor: pointer;">查看全部</span>
                    </div>
                    <div class="main-centainer-three">
                        <div class="main-centainer-three-son" v-for="(item, index) in newgameData"
                            :key="item.idnewgametable" @mouseenter="handleMouseEnter(index)"
                            @mouseleave="handleMouseLeave(index)" :style="boxStyle[index]">
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
                    <div class="main-centainer-four" :style="backgroundStyle">
                        <span style="font-size: 35px; color: white; margin-top: -50px;">探索游戏库</span>
                        <span style="margin-top: 20px; color: white;">数以千计的原创游戏在此汇聚</span>
                        <span style="color: white;">静候你的好奇心、探索欲</span>
                        <span style="color: white;">还有永不熄的游戏热情</span>
                        <button @click="pushWareHouse()" class="main-centainer-four-one">开始探索</button>
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
import homeApi from '@/api/home/index.ts';

const store = useSwitchFlag();
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const input2 = ref('');
const switchFlag = ref(2);
const gameData = ref([]);
const newgameData = ref([]);
const hotnewgameData = ref([]);
const backgroundImageUrl = ref('');
const userHeaderImage = ref('');

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

const imageData = [
    'https://tse3-mm.cn.bing.net/th/id/OIP-C.6A-aF6Owl0bqnn0Sim-wiQHaEC?w=286&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7',
    'https://staticg.sportskeeda.com/editor/2022/09/2f543-16624482083284-1920.jpg',
    'https://media.9game.cn/gamebase/ieu-eagle-docking-service/images/20240829/8/8/5552afbff5bddc97bafe54c997ec0c17.jpeg',
    'https://img1.dancihu.com/2024-01-16/fdad3d98-6ee4-8b1f-e863-3611342b3893.jpg',
    'https://img.3dmgame.com/uploads/images/news/20181121/1542810227_342847.jpg',
    'https://image.9game.cn/2020/4/7/145238807.jpg'
]

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

const pushWareHouse = () => {
    router.push('/warehouse');
}

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

//获取热门游戏的数据
const getGameTable = async () => {
    const data = await gameApi.getGameTable();
    gameData.value = data;
    console.log('gameData.value', gameData.value);
}

//获取最新游戏的数据
const getNewGameData = async () => {
    const data = await gameApi.getNewGameData();
    newgameData.value = data;
    console.log('newgameData.value', newgameData.value);
}

//获取热门最新游戏列表的数据
const getHotNewGameData = async () => {
    const data = await gameApi.getHotNewGameData();
    //hotnewgameData.value = data;
    for (let i = 0; i < data.length; i += 4) {
        let chunk = data.slice(i, i + 4);
        hotnewgameData.value.push(chunk);
    }
    console.log('hotnewgameData.value', hotnewgameData.value);
}

const backgroundStyle = computed(() => {
    return {
        backgroundImage: `url(${backgroundImageUrl.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
});

onMounted(async () => {
    changeBtnStyle(switchFlag.value);
    await getGameTable();
    await getNewGameData();
    backgroundImageUrl.value = 'https://img.51miz.com/preview/element/00/01/13/65/E-1136535-4D37AE62.jpg';
    await getHotNewGameData();
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
    width: 95%;
    margin: 20px 30px 30px 30px;
    background-color: #444;

    .main-centainer-one {
        width: 100%;
        height: 230px;
        background-color: skyblue;
        display: flex;
        margin-bottom: 10px;

        .main-centainer-one-son {
            flex: 1;
            width: 25%;
            height: 230px;
            background-color: orange;
        }
    }

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

    .main-centainer-three {
        width: 100%;
        background-color: #444;
        display: flex;
        flex-wrap: wrap;

        .main-centainer-three-son {
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

    .main-centainer-four {
        width: 100%;
        height: 370px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-direction: column;
        background-color: #ccc;
        transition: background-image 0.5s ease;
    }

    .main-centainer-four-one {
        width: 100px;
        height: 37px;
        background-color: #fff;
        text-align: center;
        border: none;
        margin-top: 50px;
        cursor: pointer;
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