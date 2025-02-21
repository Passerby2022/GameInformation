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
                    <el-button
                        style="margin-top: 10px; border: none;background-color: #1c1c1e;color: #fff;">投稿</el-button>
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
                        <div
                            style="padding-top: 20px;width: 100%;height: 50px;background-color: #1c1c1e;color: #fff;font-size: 20px;font-weight: bold;cursor: pointer;">
                            资讯投稿
                        </div>
                        <div style="width: 100%;height: 100%;margin-top: 20px;">
                            <div
                                style="margin-top: 10px;margin-bottom: 10px;color: #fff;font-size: 16px;font-weight: bold;">
                                请选择需要发布的配图</div>
                            <el-upload class="avatar-uploader" action="http://localhost:3000/information"
                                :show-file-list="false" :on-success="handleAvatarSuccess">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                            <div
                                style="margin-top: 10px;margin-bottom: 10px;color: #fff;font-size: 16px;font-weight: bold;">
                                请输入标题
                            </div>
                            <el-input v-model="title" style="width: 100%;" :rows="5" type="text"
                                placeholder="请输入你的标题......" />
                            <div
                                style="margin-top: 10px;margin-bottom: 10px;color: #fff;font-size: 16px;font-weight: bold;">
                                请输入内容
                            </div>
                            <el-input v-model="textarea" style="width: 100%;" :rows="15" type="textarea"
                                placeholder="请输入你想说的内容......" />
                            <div style="width: 100%;margin-top: 20px;display: flex;justify-content: center;">
                                <el-button @click="pushUp()">&lt;返回</el-button>
                                <el-button @click="postUpdate()" style="margin-left: 850px;">发布资讯</el-button>
                            </div>
                        </div>
                        <!--<form action="http://localhost:3000/file" method="post" enctype="multipart/form-data">
                            <input type="file" name="file">
                            <input type="submit">
                        </form>-->
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { Search } from '@element-plus/icons-vue';
import router from '@/router/index.ts';
import { useSwitchFlag } from '@/store';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';
import contributeApi from '@/api/contribute/index.ts';

const store = useSwitchFlag();
const userHeaderImage = ref('');
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const input2 = ref('');
const textarea = ref('');
// 定义 imageUrl，用于存储上传成功后的图片地址
const imageUrl = ref('');
const auditing = ref('false');
const username = ref('');
const formattedDate = ref('');
let intervalId;
const title = ref('');

// 格式化日期为 YYYY-MM-DD 格式
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// 每秒更新日期
const updateDate = () => {
    const date = new Date();
    formattedDate.value = formatDate(date);
    console.log('formattedDate.value', formattedDate.value);
};

// 处理上传成功后的回调函数
const handleAvatarSuccess = (response: any, file: any) => {
    // 假设后端返回的 response 是图片的 URL
    if (response) {
        imageUrl.value = response; // 将后端返回的图片 URL 赋值给 imageUrl
        ElMessage.success('图片上传成功！'); // 可选：显示成功提示
    } else {
        ElMessage.error('图片上传失败，请重试！'); // 可选：显示失败提示
    }
};

const postUpdate = async () => {
    console.log('title.value', title.value);
    console.log('formattedDate.value', formattedDate.value);
    console.log('imageUrl.value', imageUrl.value);
    console.log('textarea.value', textarea.value);
    console.log('userHeaderImage.value', userHeaderImage.value);
    console.log('username.value', username.value);
    console.log('auditing.value', auditing.value);
    await contributeApi.contributeInformation(title.value, formattedDate.value, imageUrl.value, textarea.value, userHeaderImage.value, username.value, auditing.value);
    //await contributeApi.contributeInformation('今天天气好1221', '2025-02-19', 'https://tse1-mm.cn.bing.net/th/id/OIP-C.F-mUuote_55yfTJiYxkofQAAAA?rs=1&pid=ImgDetMain', '111111111',
    // 'https://c-ssl.dtstatic.com/uploads/blog/202209/12/20220912134623_63eb1.thumb.1000_0.jpeg', '作者AAA', 'false'
    //);
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
    const data1 = localStorage.getItem('username');
    username.value = data1;
}

const pushUp = () => {
    router.push('/');
}

onMounted(async () => {
    await getUserImage();
    updateDate(); // 初始更新
    intervalId = setInterval(updateDate, 1000); // 每秒更新一次
})

onBeforeUnmount(() => {
    clearInterval(intervalId); // 组件卸载时清除定时器
});
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
    margin-left: 150px;
    background-color: #444;
    display: flex;

    .centainer-left {
        width: 85%;
        height: 785px;
        background-color: #1c1c1e;
        padding-left: 20px;
        padding-right: 20px;

        .centainer-left-container {
            width: 100%;
            height: 100%;
            background-color: #1c1c1e;
            margin-top: -20px;
            margin-bottom: 50px;
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

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

:deep(.el-input) {
    background-color: #1c1c1e;
}
</style>