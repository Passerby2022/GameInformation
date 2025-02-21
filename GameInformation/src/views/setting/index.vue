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
                        <div
                            style="padding-top: 20px;width: 100%;height: 50px;background-color: #1c1c1e;color: #fff;font-size: 20px;font-weight: bold;cursor: pointer;">
                            编辑个人资料
                        </div>
                        <div style="width: 100%;height: 100%;margin-top: 20px;">
                            <div style="display: flex;align-items: center;">
                                <span
                                    style="margin-top: 10px;margin-bottom: 10px;margin-right: 130px;color: #fff;font-size: 16px;font-weight: bold;">
                                    修改头像</span>
                                <el-upload class="avatar-uploader" action="http://localhost:3000/file"
                                    :show-file-list="false" :on-success="handleAvatarSuccess">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                    <el-icon v-else class="avatar-uploader-icon">
                                        <Plus />
                                    </el-icon>
                                </el-upload>
                            </div>
                            <div style="display: flex;align-items: center;margin-top: 30px;">
                                <span
                                    style="margin-top: 10px;margin-bottom: 10px;margin-right: 50px;color: #fff;font-size: 16px;font-weight: bold;">
                                    修改账号名称</span>
                                <div>
                                    <el-input v-model="inputValue" type="text" placeholder="请输入新名称"
                                        @input=""></el-input>
                                </div>
                                <div>
                                    <el-button @click="changeUsername()" :disabled="!isValidInput" type="primary">确定</el-button>
                                </div>
                            </div>
                            <p v-if="errorMessage" style="color: red; margin-top: 5px;margin-left: 150px;">{{ errorMessage }}</p>
                            <div style="display: flex;align-items: center;margin-top: 30px;">
                                <span
                                    style="margin-top: 10px;margin-bottom: 10px;margin-right: 50px;color: #fff;font-size: 16px;font-weight: bold;">
                                    修改账号密码</span>
                                <div>
                                    <el-input v-model="inputValueCopy" type="text" placeholder="请输入新密码"></el-input>
                                </div>
                                <div>
                                    <el-button @click="changePassword()" :disabled="!isValidInputCopy" type="primary">确定</el-button>
                                </div>
                            </div>
                            <p v-if="errorMessageCopy" style="color: red; margin-top: 5px;margin-left: 150px;">{{ errorMessageCopy }}</p>
                            <div style="display: flex;align-items: center;margin-top: 30px;">
                                <span
                                    style="margin-top: 10px;margin-bottom: 10px;margin-right: 65px;color: #fff;font-size: 16px;font-weight: bold;">
                                    修改手机号</span>
                                <el-button>修改手机号</el-button>
                            </div>
                        </div>
                        <!--<form action="http://localhost:3000/file" method="post" enctype="multipart/form-data">
                            <input type="file" name="file">
                            <input type="submit">
                        </form>-->
                    </div>
                    <div class="centainer-right">
                        <img style="width: 100%;height: 100%;"
                            src="https://patchwiki.biligame.com/images/sgs/c/c8/tibylfal3zcbsfilyhicv6lrok3u2dm.png"
                            alt="">
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { Search } from '@element-plus/icons-vue';
import router from '@/router/index.ts';
import { useSwitchFlag } from '@/store';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';
import settingApi from '@/api/setting/index.ts';

const store = useSwitchFlag();
const userHeaderImage = ref('');
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const input2 = ref('');
// 定义 imageUrl，用于存储上传成功后的图片地址
const imageUrl = ref('');
const username = ref('');
const inputValue = ref('');
const errorMessage = ref('');
const inputValueCopy = ref('');
const errorMessageCopy = ref('');
const newUsername = ref('');
const oldUsername = ref('');
const newPassword = ref('');

const isValidInput = computed(() => {
    if (inputValue.value.length < 3 || inputValue.value.length > 5) {
        errorMessage.value = '账号名称长度必须在3到5位之间';
        return false;
    } else {
        errorMessage.value = '';
        return true;
    }
});

const isValidInputCopy = computed(() => {
    if (inputValueCopy.value.length < 10 || inputValueCopy.value.length > 16) {
        errorMessageCopy.value = '密码长度必须在10到16位之间';
        return false;
    } else {
        errorMessageCopy.value = '';
        return true;
    }
});

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
    imageUrl.value = data;
    userHeaderImage.value = data;
    const data1 = localStorage.getItem('username');
    username.value = data1;
}

//修改账号名称
const changeUsername = async () => {
    newUsername.value = inputValue.value;
    oldUsername.value = localStorage.getItem('username');
    await settingApi.changeUsername(newUsername.value, oldUsername.value);
    exit();
}

//修改密码
const changePassword = async () => {
    oldUsername.value = localStorage.getItem('username');
    newPassword.value = inputValueCopy.value;
    await settingApi.changePassword(newPassword.value, oldUsername.value);
    exit();
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
    margin-left: 150px;
    background-color: #444;
    display: flex;

    .centainer-left {
        width: 40%;
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

    .centainer-right {
        width: 50%;
        height: 785px;
        background-color: #1c1c1e;
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
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 50%;
    /* 圆形头像 */
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 50%;
    /* 圆形上传区域 */
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    /* 垂直居中 */
}
</style>