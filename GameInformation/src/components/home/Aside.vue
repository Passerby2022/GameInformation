<template>
    <el-aside :width="props.flag ? '13vw' : '5vw'">
        <div class="aside">
            <div>
                <el-button @click="goHome()" class="titleStyle" style="border: none;">{{ props.flag ? '游戏资讯网' : 'Game' }}</el-button>
                <template v-for="(item, index) in menuData" :key="index">
                    <el-button class="btnStyle" @click="changePush(item.name)">
                        <div :class="[props.flag ? 'buttonContent' : 'buttonContentHover']">
                            <el-icon style="margin-left: 1vh;" :size="size" :color="color">
                                <component :is="item.icon" />
                            </el-icon>
                            <div style="margin-left: 1vh;">{{ item.name }}</div>
                        </div>
                    </el-button>
                </template>
            </div>
            <div style="border-top: 1px solid #333;margin-top: 1vh;margin-bottom: 1vh;"></div>
            <div>
                <template v-for="(item, index) in menuDataOne" :key="index">
                    <el-button class="btnStyle" @click="changePush(item.name)">
                        <div :class="[props.flag ? 'buttonContent' : 'buttonContentHover']">
                            <el-icon style="margin-left: 1vh;" :size="size" :color="color">
                                <component :is="item.icon" />
                            </el-icon>
                            <div style="margin-left: 1vh;">{{ item.name }}</div>
                        </div>
                    </el-button>
                </template>
            </div>
            <div style="border-top: 1px solid #333;margin-top: 1vh;margin-bottom: 1vh;"></div>
            <div>
                <template v-for="(item, index) in menuDataTwo" :key="index">
                    <el-button class="btnStyle" @click="changePush(item.name)">
                        <div :class="[props.flag ? 'buttonContent' : 'buttonContentHover']">
                            <el-icon style="margin-left: 1vh;" :size="size" :color="color">
                                <component :is="item.icon" />
                            </el-icon>
                            <div style="margin-left: 1vh;">{{ item.name }}</div>
                        </div>
                    </el-button>
                </template>
            </div>
        </div>
    </el-aside>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import router from '@/router/index.ts';

const size = ref(26);
const color = ref('');
const props = defineProps({
    flag: Boolean
})
const menuData = reactive([
    {
        icon: 'Postcard',
        name: '首页',
    },
    {
        icon: 'Box',
        name: '分组',
    },
    {
        icon: 'ChatDotSquare',
        name: '讨论',
    },
    {
        icon: 'Position',
        name: '资讯',
    },
    {
        icon: 'Avatar',
        name: '播客',
    },
    {
        icon: 'Edit',
        name: '文章',
    },
    {
        icon: 'VideoPlay',
        name: '视频',
    }
])
const menuDataOne = reactive([
    {
        icon: 'Headset',
        name: '听书',
    },
    {
        icon: 'Shop',
        name: '商店',
    }
])
const menuDataTwo = reactive([
    {
        icon: 'SwitchFilled',
        name: '仓库',
    },
    {
        icon: 'VideoCameraFilled',
        name: '播单',
    },
    {
        icon: 'Folder',
        name: '专题',
    }
])

const changePush = (flag: any) => {
    if (flag === '首页') {
        router.push('/');
    } else if (flag === '分组') {
        router.push('/group');
    } else if (flag === '讨论') {
        router.push('/discuss');
    } else if (flag === '资讯') {
        router.push('/information');
    } else if (flag === '播客') {
        router.push('/podcast');
    }  else if (flag === '文章') {
        router.push('/edit');
    } else if (flag === '视频') {
        router.push('/video');
    } else if (flag === '听书') {
        router.push('/audioBook');
    } else if (flag === '仓库') {
        router.push('/warehouse');
    } else if (flag === '播单') {
        router.push('/order');
    } else if (flag === '专题') {
        router.push('/specialSubject');
    }
}

const goHome = () => {
    router.push('/');
}
</script>

<style lang='less' scoped>
.el-aside {
    color: var(--el-text-color-primary);
    background-color: #1c1c1e;

    .aside {
        .titleStyle {
            width: 100%;
            height: 5vh;
            background-color: #1c1c1e;
            margin-top: 1vh;
            margin-bottom: 1vh;
            color: skyblue;
            font-size: 18px;
            border: none;
        }

        .btnStyle {
            color: #fff;
            background-color: #1c1c1e;
            width: 100%;
            height: 5vh;
            margin-left: 0;
            margin-top: 10px;
            border: none;
            text-align: left;
            justify-content: flex-start;
            display: inline-flex;

            .buttonContent {
                display: flex;
                align-items: center;
            }

            .buttonContentHover {
                width: 100%;
                text-align: center;
                display: 'flex';
                flex-direction: 'column';
                align-items: 'center';
                justify-content: 'center';
            }
        }

        .btnStyleHover {
            color: #fff;
            background-color: #1c1c1e;
            width: 100%;
            height: 5vh;
            border: none;
            text-align: left;
            justify-content: flex-start;
            display: inline-flex;
        }

        .btnStyleHover:hover,
        .btnStyle:hover {
            background-color: #333;
        }
    }
}
</style>
