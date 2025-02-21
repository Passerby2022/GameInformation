<template>
    <div class="container">
        <div class="left">
            <!--<el-image class="loginImage" src="../../../public/1.jpg" />-->
        </div>
        <div class="right">
            <div class="right-container">
                <template v-if="flag === 0">
                    <el-form :model="registerFormData" class="fromStyle" label-width="auto" :rules="registerRules">
                        <el-form-item>
                            <div>
                                <h2>注册账号</h2>
                            </div>
                        </el-form-item>
                        <el-form-item prop="username">
                            <el-input autocomplete="off" class="boxStyleCopy" placeholder="请输入账号"
                                v-model="registerFormData.username" />
                        </el-form-item>
                        <el-form-item prop="password" style="position: relative;">
                            <el-input autocomplete="off" class="boxStyleCopy" placeholder="请输入密码"
                                v-model="registerFormData.password" />
                                <button
                                style="position: absolute;right: 10px;width: 2vw;height: 5vh;border: none;background-color: transparent;"
                                @click.prevent="togglePasswordCopyVisibility">
                                <el-icon :size="size" :color="color">
                                    <component :is="passwordCopyVisible ? 'View' : 'Hide'" />
                                </el-icon>
                            </button>
                        </el-form-item>
                        <el-form-item prop="phoneNumber">
                            <el-input autocomplete="off" class="boxStyleCopy" placeholder="请输入手机号"
                                v-model="registerFormData.phoneNumber" />
                        </el-form-item>
                        <el-form-item prop="repeatPassword" style="position: relative;">
                            <el-input autocomplete="off" class="boxStyleCopy" placeholder="请再次输入密码"
                                v-model="registerFormData.repeatPassword" />
                                <button
                                style="position: absolute;right: 10px;width: 2vw;height: 5vh;border: none;background-color: transparent;"
                                @click.prevent="toggleRepeatPasswordVisibility">
                                <el-icon :size="size" :color="color">
                                    <component :is="repeatPasswordVisible ? 'View' : 'Hide'" />
                                </el-icon>
                            </button>
                        </el-form-item>
                        <el-form-item>
                            <div class="fontStyle">注册表明你已同意<span class="fontSize">《用户使用协议》</span></div>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="btnStyleOne" @click="register()">注册</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="btnStyleTwo" @click="flag = 1">已有账号？登录</el-button>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-else-if="flag === 1">
                    <el-form :model="loginFormData" class="fromStyle" label-width="auto" :rules="loginRules">
                        <el-form-item>
                            <div>
                                <h2>登录账号</h2>
                            </div>
                        </el-form-item>
                        <el-form-item prop="username">
                            <el-input autocomplete="off" class="boxStyle" placeholder="请输入账号"
                                v-model="loginFormData.username" />
                        </el-form-item>
                        <el-form-item prop="password" style="position: relative;">
                            <el-input autocomplete="off" class="boxStyle" style="width:20vw;" placeholder="请输入密码"
                                :type="passwordVisible ? 'text' : 'password'" v-model="loginFormData.password" />
                            <button
                                style="position: absolute;right: 10px;width: 2vw;height: 5vh;border: none;background-color: transparent;"
                                @click.prevent="togglePasswordVisibility">
                                <el-icon :size="size" :color="color">
                                    <component :is="passwordVisible ? 'View' : 'Hide'" />
                                </el-icon>
                            </button>
                        </el-form-item>
                        <el-form-item>
                            <div class="password-link">忘记密码</div>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="btnStyleOne" @click="pushHome">登录</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="btnStyleTwo" @click="flag = 0">注册</el-button>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-else-if="flag === 2"></template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onUnmounted } from 'vue';
import router from '@/router/index.ts';
import loginApi from '@/api/login/index.ts';
import registerApi from '@/api/register/index.ts';
import Cookies from 'js-cookie';

const flag = ref(0);
const passwordVisible = ref(false);
const passwordCopyVisible = ref(false);
const repeatPasswordVisible = ref(false);

const size = ref(20);
const color = ref('');

const loginFormData = reactive({
    username: '',
    password: ''
})

const registerFormData = reactive({
    username: '',
    password: '',
    phoneNumber: '',
    repeatPassword: '',
})

const loginRules = reactive({
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 5, message: '请输入长度为3~5位的账号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur', }
    ]
})

const registerRules = reactive({
    username: [
        {
            validator: (rule: any, value: any, callback: any) => {
                if (!value) {
                    callback(new Error('请输入账号'));
                    return;
                }

                if (value.length < 3 || value.length > 5) {
                    callback(new Error('请输入长度为3~5位的账号'));
                    return;
                }

                const regex = /^[A-Za-z0-9_]+$/;
                if (!regex.test(value)) {
                    callback(new Error('账号只能包含字母、数字和下划线'));
                } else {
                    callback();
                }
            },
            trigger: ['blur', 'change']
        }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur', },
        {
            required: true,
            validator: (rule: any, value: any, callback: any) => {
                const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{10,16}$/;
                if (!regex.test(value)) {
                    callback(new Error('密码必须包含10-16位的字母、数字以及特殊符号，且至少包含一个大写字母和一个特殊字符'));
                } else {
                    callback();
                }
            },
            trigger: 'change'
        }
    ],
    repeatPassword: [
        { required: true, message: '请输入密码', trigger: 'blur', },
        {
            validator: (rule: any, value: any, callback: any) => {
                const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{10,16}$/;
                if (!regex.test(value)) {
                    callback(new Error('密码必须包含10-16位的字母、数字以及特殊符号，且至少包含一个大写字母和一个特殊字符'));
                } else {
                    callback();
                }
            },
            trigger: 'change'
        }
    ],
    phoneNumber: [
        {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
        },
        {
            validator: (rule, value, callback) => {
                // 手机号正则表达式（仅适用于中国大陆手机号，11位数字）
                const phoneRegex = /^1[3-9]\d{9}$/;
                if (!value) {
                    // 如果值为空，并且该字段是必填的，则上一条规则已经处理了这种情况
                    // 这里我们只需要处理非空但格式不正确的情况
                    callback();
                } else if (!phoneRegex.test(value)) {
                    callback(new Error('请输入有效的手机号'));
                } else {
                    callback();
                }
            },
            trigger: 'blur' // 或者 'change'，取决于你希望何时触发验证
        }
    ]
})

const clearFrom = () => {
    loginFormData.username = '';
    loginFormData.password = '';
    registerFormData.username = '';
    registerFormData.password = '';
    registerFormData.phoneNumber = '';
    registerFormData.repeatPassword = '';
}

const pushHome = async () => {
    const loginFlag = await loginApi.loginInterface(loginFormData.username, loginFormData.password);
    //console.log('loginFlag',loginFlag[0].token);
    localStorage.setItem('username', loginFormData.username);
    Cookies.set('user', loginFlag[0].token, { expires: 1 });
    if (loginFlag !== undefined && loginFlag !== null) {
        clearFrom();
        alert('登录成功！！！');
        router.push('/');
    }
}

const register = async () => {
    const data = await registerApi.registerAccount(registerFormData.username, registerFormData.password, registerFormData.phoneNumber);
    if(data !== null && data !== undefined){
        alert('注册成功');
    }
    clearFrom();
}

const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
}

const toggleRepeatPasswordVisibility = () => {
    repeatPasswordVisible.value = !repeatPasswordVisible.value;
}

const togglePasswordCopyVisibility = () => {
    passwordCopyVisible.value = !passwordCopyVisible.value;
}

onUnmounted(() => {
    clearFrom();
});
</script>

<style lang="less" scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    position: relative;

    .left {
        width: 100vw;
        height: 100vh;
        background-image: url('../../../public/login.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

        .loginImage {
            width: 100%;
            height: 100%;
        }
    }

    .right {
        width: 30vw;
        height: 60vh;
        left: 60%;
        position: absolute;

        .right-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            background-color: #fff;

            .fromStyle {
                max-width: 20vw;

                .btnStyleOne,
                .btnStyleTwo {
                    width: 20vw;
                    height: 5vh;
                    font-weight: bold;
                    font-size: 18px;
                }

                .btnStyleOne {
                    background-color: #000;
                    color: #fff;
                }

                .btnStyleTwo {
                    background-color: #fff;
                    color: #000;
                    border: none;
                }


                .boxStyle {
                    width: 20vw;
                    height: 5vh;
                    margin-top: 1vh;
                    margin-bottom: 1vh;
                }

                .boxStyleCopy {
                    width: 20vw;
                    height: 5vh;
                    margin-bottom: 5px;
                }

                .fontStyle {
                    margin-left: 3vw;

                    .fontSize {
                        font-weight: bold;
                    }
                }

            }

        }
    }
}

.password-link {
    margin-left: 16vw;
}

.password-link:hover {
    cursor: pointer;
}
</style>