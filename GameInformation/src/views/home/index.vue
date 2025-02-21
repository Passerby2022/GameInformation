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
                    <div class="main-centainer">
                        <div class="main-centainer-son" v-for="(item, index) in imageData" :key="index">
                            <img style="width: 100%;height: 100%;" :src="item.image_url" alt="">
                        </div>
                    </div>
                    <div style="width: 100%;height: 50px;padding: 10px 0;background-color: #444;">
                        <span style="color: #fff;font-size: 20px;font-weight: bold;">精选</span>
                    </div>
                    <div class="main-centainer-one">
                        <div class="main-centainer-one-son" v-for="(item, index) in selectedData"
                            :key="selectedData.idselecteddata" style="margin-right:20px;">
                            <div style="width: 100%; height: 100%;position: relative;cursor: pointer;">
                                <div @click="pushVideoDetailed(item.video_url)" style="width: 100%;height: 100px;">
                                    <el-icon :size="80" color="#ccc" class="video-icon">
                                        <VideoPlay />
                                    </el-icon>
                                    <el-image :src="item.image_url" style="width: 100%;height: 150px;"
                                        class="media-image" />
                                </div>
                                <div
                                    style="width: 90%;height: 50px;margin-left:10px;margin-top:70px;overflow: hidden;text-overflow: ellipsis;font-size: 14px;color: #fff;">
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
                    <div style="width: 100%;height: 50px;padding: 10px 0;background-color: #444;">
                        <span style="color: #000;font-size: 20px;color: #fff;font-weight: bold;">资讯></span>
                    </div>
                    <div style="height: 200px">
                        <el-carousel :interval="5000" arrow="always" height="200px">
                            <el-carousel-item v-for="(item, index) in 4" :key="index"
                                style="height: 100%;background-color: #444;">
                                <div v-for="(subItem, subIndex) in chunkedArrays[index]" :key="subItem.idinformation"
                                    style="display: inline-block; width: 16%; height: 100%; box-sizing: border-box; margin-left: 7px;">
                                    <div style="width: 100%; height: 100%;">
                                        <div @click="pushArticleDetailed(subItem.article, subItem.image_url)"
                                            style="width: 100%;height: 100px;cursor:pointer;"><el-image
                                                :src="subItem.image_url" style="width: 100%;height: 100px;" /></div>
                                        <div
                                            style="width: 90%;height: 50px;margin-left:5px;margin-top:20px;overflow: hidden;text-overflow: ellipsis;font-size: 14px;color: #fff;">
                                            {{ subItem.title }}</div>
                                        <div style="width: 100%;height: 50px;font-size: 12px;color: #ccc;">{{
                                            subItem.time }}</div>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div style="width: 100%;height: 50px;padding: 10px 0;background-color: #444;">
                        <span style="color: #fff;font-size: 20px;font-weight: bold;">大家在聊></span>
                    </div>
                    <div class="main-centainer-two">
                        <div @click="pushDetailed(gameName1)" class="main-centainer-two-son" style="margin-right:20px;">
                            如何评价游戏《{{ gameName1 }}》？
                        </div>
                        <div @click="pushDetailed(gameName2)" class="main-centainer-two-son" style="margin-right:20px;">
                            如何评价游戏《{{ gameName2 }}》？
                        </div>
                        <div @click="pushDetailed(gameName3)" class="main-centainer-two-son">
                            如何评价游戏《{{ gameName3 }}》？
                        </div>
                    </div>
                    <div style="width: 100%;height: 50px;padding: 10px 0;background-color: #444;">
                        <span style="color: #000;font-size: 20px;color: #fff;font-weight: bold;">游戏影视动态></span>
                    </div>
                    <div style="height: 200px">
                        <el-carousel :interval="5000" arrow="always" height="auto">
                            <el-carousel-item v-for="(item, index) in 2" :key="index"
                                style="height: 200px;background-color: #444;">
                                <div v-for="(subItem, subIndex) in gameData[index]" :key="subItem.idgamedata"
                                    style="display: inline-block; width: 16%; height: 100%; box-sizing: border-box; margin-left: 7px;">
                                    <div style="width: 100%; height: 100%;">
                                        <div @click="pushArticleDetailed(subItem.article, subItem.image_url)"
                                            style="width: 100%;height: 100px;cursor:pointer;"><el-image
                                                :src="subItem.image_url" style="width: 100%;height: 100px;" /></div>
                                        <div
                                            style="width: 90%;height: 50px;margin-left:5px;margin-top:20px;overflow: hidden;text-overflow: ellipsis;font-size: 14px;color: #fff;">
                                            {{ subItem.title }}</div>
                                        <div style="width: 100%;height: 50px;font-size: 12px;color: #ccc;">{{
                                            subItem.time }}</div>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div style="width: 100%;height: 50px;padding: 10px 0;background-color: #444;">
                        <span style="color: #000;font-size: 20px;color: #fff;font-weight: bold;">编辑推荐游戏></span>
                    </div>
                    <div style="height: 200px;">
                        <el-carousel :interval="5000" arrow="always" height="auto">
                            <el-carousel-item v-for="(item, index) in 2" :key="index"
                                style="height: 200px;background-color: #444;">
                                <div v-for="(subItem, subIndex) in recommendData[index]" :key="subItem.idrecommend"
                                    style="display: inline-block; width: 16%; height: 100%; box-sizing: border-box; margin-left: 7px;">
                                    <div @click="pushArticleDetailed(subItem.article, subItem.image_url)"
                                        style="width: 100%; height: 100%;">
                                        <div style="width: 100%;height: 100px;cursor: pointer;"><el-image
                                                :src="subItem.image_url" style="width: 100%;height: 100px;" /></div>
                                        <div
                                            style="width: 90%;height: 50px;margin-left:5px;margin-top:20px;overflow: hidden;text-overflow: ellipsis;font-size: 14px;color: #fff;">
                                            {{ subItem.title }}</div>
                                        <div style="width: 100%;height: 50px;font-size: 12px;color: #ccc;">{{
                                            subItem.time }}</div>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div style="width: 100%;height: 50px;padding: 10px 0;background-color: #444;">
                        <span style="color: #000;font-size: 20px;color: #fff;font-weight: bold;">综合></span>
                    </div>
                    <div class="main-centainer-three">
                        <div class="main-centainer-three-son" v-for="(subItem, subIndex) in comperensiveData"
                            :key="subIndex.idcomperensiveData">
                            <div style="width: 100%; height: 100%;">
                                <div @click="pushArticleDetailed(subItem.article, subItem.image_url)"
                                    style="width: 100%;height: 100px;cursor: pointer;"><el-image
                                        :src="subItem.image_url" style="width: 100%;height: 100px;" /></div>
                                <div
                                    style="width: 90%;height: 50px;margin-left:10px;margin-top:20px;overflow: hidden;text-overflow: ellipsis;font-size: 14px;color: #fff;">
                                    {{ subItem.title }}</div>
                                <!--<div style="width: 100%;height: 50px;font-size: 12px;color: #ccc;">{{ subItem.time }}
                                </div>-->
                                <div
                                    style="width: 90%; height: 50px; margin-left: 10px; margin-top: 20px; display: flex; align-items: center;">
                                    <div style="display: flex; align-items: center;">
                                        <img style="width: 30px; height: 30px; border-radius: 15px;"
                                            :src="subItem.header_url" alt="">
                                        <div style="margin-left: 10px;">
                                            <div style="color: #444;font-size: 12px;">{{ subItem.name }}</div>
                                            <div style="color: #444;font-size: 12px;">{{ subItem.time }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 100%;height: 50px;text-align: center;padding:20px 0;background-color: #444;">
                        <button @click="addLimit()"
                            style="color: #000;font-size: 20px;width: 300px;cursor:pointer;">查看更多</button>
                    </div>
                    <div style="width: 100%;height: 50px;padding: 10px 0;background-color: #444;">
                        <span style="color: #fff;font-size: 20px;font-weight: bold;">资讯精选></span>
                    </div>
                    <div class="main-centainer-four">
                        <div class="main-centainer-four-son" v-for="(item, index) in informationData"
                            :key="item.idarticle">
                            <div style="width: 100%; height: 100%;position: relative;cursor: pointer;">
                                <div @click="pushArticleDetailed(item.article, item.image_url)"
                                    style="position: relative;width: 100%;height: 100px;">
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
                    <div style="width: 100%;height: 50px;padding: 10px 0;">
                        <span style="color: #000;font-size: 20px;">播单推荐></span>
                    </div>
                    <div style="height: 250px">
                        <el-carousel :interval="5000" arrow="always" height="auto">
                            <el-carousel-item v-for="(item, index) in 4" :key="index" style="height: 250px">
                                <h3 text="2xl" justify="center">{{ item }}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div style="width: 100%;height: 50px;padding: 10px 0;">
                        <span style="color: #000;font-size: 20px;">有声书推荐></span>
                    </div>
                    <div style="height: 250px">
                        <el-carousel :interval="5000" arrow="always" height="auto">
                            <el-carousel-item v-for="(item, index) in 4" :key="index" style="height: 250px">
                                <h3 text="2xl" justify="center">{{ item }}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div style="width: 100%;height: 50px;padding: 10px 0;background-color: #444;">
                        <span style="color: #fff;font-size: 20px;font-weight: bold;">博客></span>
                    </div>
                    <div class="main-centainer-five">
                        <div class="main-centainer-five-son" v-for="(item, index) in podcastData"
                            :key="item.idpodcastdata">
                            <div style="width: 100%; height: 100%;position: relative;cursor: pointer;">
                                <div style="width: 100%;height: 200px;">
                                    <el-icon :size="80" color="#ccc" class="podcast-icon">
                                        <VideoPlay />
                                    </el-icon>
                                    <el-image :src="item.image_url" style="width: 100%;height: 200px;"
                                        class="podcast-image" />
                                </div>
                                <div
                                    style="width: 90%;height: 50px;margin-left:10px;margin-top:30px;overflow: hidden;text-overflow: ellipsis;font-size: 14px;color: #fff;">
                                    {{ item.title }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        style="width: 100%;height: 50px;padding: 10px 0;text-align: center;padding:20px 0;background-color: #444;">
                        <button @click="addPodcast()"
                            style="color: #000;font-size: 20px;width: 300px;cursor:pointer;">查看更多</button>
                    </div>
                    <div style="width: 100%;height: 50px;padding: 10px 0;background-color: #444;">
                        <span style="color: #000;font-size: 20px;color: #fff;font-weight: bold;">视频></span>
                    </div>
                    <div class="main-centainer-six">
                        <div>
                            <img style="width: 100%;height: 100%;" :src="img" alt="">
                        </div>
                    </div>
                    <div style="width: 100%;height: 30px;background-color: #444;"></div>
                    <div class="main-centainer-five">
                        <div class="main-centainer-five-son" v-for="(item, index) in videoData" :key="item.idvideodata">
                            <div style="width: 100%; height: 100%;position: relative;cursor: pointer;">
                                <div @click="pushVideoDetailed(item.video_url)" style="width: 100%;height: 200px;">
                                    <el-icon :size="80" color="#ccc" class="podcast-icon">
                                        <VideoPlay />
                                    </el-icon>
                                    <el-image :src="item.image_url" style="width: 100%;height: 200px;"
                                        class="podcast-image" />
                                </div>
                                <div
                                    style="width: 90%;height: 50px;margin-left:10px;margin-top:30px;overflow: hidden;text-overflow: ellipsis;font-size: 14px;color: #fff;">
                                    {{ item.title }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 100%;height: 50px;padding: 20px 0;text-align: center;background-color: #444;">
                        <button @click="addVideo()"
                            style="color: #000;font-size: 20px;width: 300px;cursor:pointer;">查看更多</button>
                    </div>
                    <div style="width: 100%;height: 50px;padding: 10px 0;background-color: #444;">
                        <span style="color: #fff;font-size: 20px;font-weight: bold;">专题></span>
                    </div>
                    <div style="height: 220px">
                        <el-carousel :interval="5000" arrow="always" height="auto">
                            <el-carousel-item v-for="(item, index) in 4" :key="index" style="height: 200px">
                                <h3 text="2xl" justify="center">{{ item }}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useSwitchFlag } from '@/store';
import router from '@/router/index.ts';
import homeApi from '@/api/home/index.ts';
import Cookies from 'js-cookie';
import informationApi from '@/api/information/index.ts';
import discussApi from '@/api/discuss/index.ts';

const store = useSwitchFlag();
const userHeaderImage = ref('');
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const input2 = ref('');
const switchFlag = ref(1);
const chunkedArrays = ref([]);
const imageData = ref([]);
const gameData = ref([]);
const recommendData = ref([]);
const comperensiveData = ref([]);
const limit = ref(10);
const podcastlimit = ref(10);
const selectedData = ref([]);
const podcastData = ref([]);
const videoData = ref([]);
const informationData = ref([]);
const img = ref('');
const userNameData = ref([]);
const gameName1 = ref('');
const gameName2 = ref('');
const gameName3 = ref('');
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

const pushDetailed = (gamename: any) => {
    localStorage.setItem('gamename', gamename);
    router.push('/discussDetailed');
}

//跳转详细页面
const pushVideoDetailed = (video_url: any) => {
    localStorage.setItem('videoUrl', video_url)
    router.push('/detailedIndex');
}

const pushArticleDetailed = (article: any, articleImage: any) => {
    localStorage.setItem('article', article);
    localStorage.setItem('articleImage', articleImage);
    router.push('/editDetailed');
}

const changeBtnStyle = (index: any) => {
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

//获取资讯数据
const getHomeInformation = async () => {
    const data = await informationApi.getPageInformation(24, 0);
    // 使用for循环来拆分数组
    for (let i = 0; i < data.length; i += 6) {
        let chunk = data.slice(i, i + 6);
        chunkedArrays.value.push(chunk);
    }

    // 现在chunkedArrays包含了四个长度为6的新数组
    console.log('chunkedArrays', chunkedArrays.value);
}

//获取图片数据
const getHomeImage = async () => {
    const data = await homeApi.getHomeImage();
    imageData.value = data;
    console.log('imageData', imageData.value);
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

//获取游戏电影数据
const getGameData = async () => {
    const data = await homeApi.getGameData();
    for (let i = 0; i < data.length; i += 6) {
        let chunk = data.slice(i, i + 6);
        gameData.value.push(chunk);
    }
    console.log('gameData', gameData.value);
}

//获取推荐数据
const getRecommend = async () => {
    const data = await homeApi.getRecommendData();
    for (let i = 0; i < data.length; i += 6) {
        let chunk = data.slice(i, i + 6);
        recommendData.value.push(chunk);
    }
    console.log('recommendData', recommendData.value);
}

//获取综合
const getComperensive = async () => {
    const data = await homeApi.getComperensive(limit.value);
    comperensiveData.value = data;
    console.log('comperensiveData', comperensiveData.value);
}

const addLimit = async () => {
    limit.value += 10;
    await getComperensive();
}

//获取精选数据
const getSelectedData = async () => {
    const data = await homeApi.getSelectedData();
    selectedData.value = data;
    console.log('selectedData', selectedData.value);
}

//获取播客推荐数据
const getPodcastLimitData = async () => {
    const data = await homeApi.getPodcastLimitData(podcastlimit.value);
    podcastData.value = data;
    console.log('podcastData', podcastData.value);
}

//获取视频推荐数据
const getVideoLimitData = async () => {
    const data = await homeApi.getVideoLimitData(podcastlimit.value);
    videoData.value = data;
    img.value = videoData.value[0].image_url;
    console.log('videoData', videoData.value);
}

//获取资讯精选数据
const getInformationData = async () => {
    const data = await informationApi.getPageInformation(12, 6);
    informationData.value = data;
}

//获取讨论的数据
const getDiscussInformation = async () => {
    const data = await discussApi.getHomeInformation();
    userNameData.value = data;
    gameName1.value = userNameData.value[0].game_name;
    gameName2.value = userNameData.value[1].game_name;
    gameName3.value = userNameData.value[2].game_name;
    console.log('userNameData.value', userNameData.value);
}

const addPodcast = async () => {
    podcastlimit.value += 10;
    console.log('111111111');
    await getPodcastLimitData();
}

const addVideo = async () => {
    podcastlimit.value += 10;
    await getVideoLimitData();
}

onMounted(async () => {
    changeBtnStyle(switchFlag.value);
    await getHomeInformation();
    await getUserImage();
    await getHomeImage();
    await getGameData();
    await getRecommend();
    await getComperensive();
    await getSelectedData();
    await getPodcastLimitData();
    await getVideoLimitData();
    await getInformationData();
    await getDiscussInformation();
})

onUnmounted(async () => {
    limit.value = 10;
    podcastlimit.value = 10;
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
    background-color: #fff;

    .main-centainer {
        width: 100%;
        height: 250px;
        background-color: skyblue;
        display: flex;

        .main-centainer-son {
            flex: 1;
            width: 30%;
            height: 250px;
            background-color: #444;
            margin-bottom: 10px;
            padding: 0 5px 0 5px;
        }
    }

    .main-centainer-one {
        width: 100%;
        height: 300px;
        background-color: #444;
        display: flex;

        .main-centainer-one-son {
            flex: 1;
            width: 20%;
            height: 300px;
            margin-left: 17px;
            background-color: #1c1c1e;
        }
    }

    .main-centainer-two {
        width: 100%;
        height: 80px;
        background-color: #444;
        display: flex;

        .main-centainer-two-son {
            flex: 1;
            width: 33.3%;
            height: 80px;
            background-color: #1c1c1e;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            padding-top: 25px;
            color: #fff;
            cursor: pointer;
        }

    }



    .main-centainer-three {

        width: 100%;

        background-color: #444;

        display: flex;
        flex-wrap: wrap;

        .main-centainer-three-son {
            width: calc(20% - 12px);
            height: 250px;
            background-color: #1c1c1e;
            margin-left: 10px;
            margin-bottom: 10px;
            display: inline-block;
            box-sizing: border-box;
        }
    }

    .main-centainer-four {
        width: 100%;
        background-color: #444;
        display: flex;
        flex-wrap: wrap;

        .main-centainer-four-son {
            width: calc(25% - 13px);
            height: 300px;
            background-color: #1c1c1e;
            margin-left: 10px;
            margin-bottom: 10px;
        }
    }

    .main-centainer-five {
        width: 100%;
        background-color: #444;
        display: flex;
        flex-wrap: wrap;

        .main-centainer-five-son {
            width: calc(20% - 12px);
            height: 300px;
            background-color: #1c1c1e;
            margin-left: 10px;
            margin-bottom: 10px;
        }
    }

    .main-centainer-six {
        width: 100%;
        height: 700px;
        background-color: #444;
    }
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

.podcast-icon {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}

.media-image,
.podcast-image {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
</style>