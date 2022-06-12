<template>
    <div v-show="store.showLogin" class="
      modal-show
      flex
      items-center
      w-full
      h-full
      fixed
      top-0
      left-0
      z-40
      bg-gray-500
      opacity-100
      justify-center
    ">
        <div v-show="!isRegister" class="modal-content bg-white w-80 pt-12 p-4 relative rounded-md">
            <span class="right-0 top-0 absolute m-2 w-5 h-5 iconfont icon-close" @click="close()" />
            <img class="left-0 top-0 w-20 absolute m-2" src="/logo-black.png" alt="" />
            <p class="text-2xl font-semibold my-2">登陆</p>
            <input v-model="loginParams.email" type="text" placeholder="邮箱地址" class="
          bg-gray-100
          border-0 border-transparent
          focus:outline-none
          custom-font-14
          text-gray-600
          p-2
          my-2
          w-full
        " />
            <input v-model="loginParams.password" type="password" placeholder="密码" class="
          bg-gray-100
          border-0 border-transparent
          focus:outline-none
          custom-font-14
          text-gray-600
          p-2
          my-2
          w-full
        " />
            <div class="flex items-center justify-around">
                <input v-model="captcha" type="text" placeholder="验证码" class="
            bg-gray-100
            w-3
            border-0 border-transparent
            focus:outline-none
            custom-font-14
            text-gray-600
            p-2
            my-2
            mr-2
            flex-1
          " />
                <img class="h-9 flex-1" @click="refreshCaptcha()" :src="captchaUrlPic" alt="" />
            </div>
            <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 my-2" @click="login()">
                登陆
            </button>
            <div class="mt-2 flex justify-between">
                <p class="custom-font-12">
                    还没有账号？
                    <span @click="toRegister()" class="text-blue-600 cursor-pointer font-medium">立即注册</span>
                </p>
                <p class="custom-font-12">
                    <a class="text-blue-600 cursor-pointer font-medium">忘记密码?</a>
                </p>
            </div>
        </div>
        <div v-show="isRegister" class="modal-content bg-white w-80 pt-12 p-4 relative rounded-md">
            <span class="right-0 top-0 absolute m-2 w-5 h-5 iconfont icon-close" @click="close()" />
            <img class="left-0 top-0 w-20 absolute m-2" src="/logo-black.png" alt="" />
            <p class="text-2xl font-semibold my-2">注册账号</p>
            <input v-model="registerParams.email" type="text" placeholder="邮箱地址" class="
          bg-gray-100
          border-0 border-transparent
          focus:outline-none
          custom-font-14
          text-gray-600
          p-2
          my-2
          w-full
        " />
            <div class="flex">
                <input v-model="captchaEmail" type="text" placeholder="邮箱验证码" class="
            bg-gray-100
            w-3
            border-0 border-transparent
            focus:outline-none
            custom-font-14
            text-gray-600
            p-2
            my-2
            mr-2
            flex-1
          " />
                <button @click="sendCaptcha()" class="
            flex-1
            bg-blue-500
            text-white
            p-2
            my-2
            custom-font-14
            hover:bg-blue-600
          ">
                    发送
                </button>
            </div>
            <input v-model="registerParams.name" type="text" placeholder="用户名" class="
          bg-gray-100
          border-0 border-transparent
          focus:outline-none
          custom-font-14
          text-gray-600
          p-2
          my-2
          w-full
        " />
            <input v-model="registerParams.password" type="password" placeholder="密码" class="
          bg-gray-100
          border-0 border-transparent
          focus:outline-none
          custom-font-14
          text-gray-600
          p-2
          my-2
          w-full
        " />
            <input v-model="repassword" type="password" placeholder="再输一遍密码" class="
          bg-gray-100
          border-0 border-transparent
          focus:outline-none
          custom-font-14
          text-gray-600
          p-2
          my-2
          w-full
        " />
            <div class="flex items-center justify-around">
                <input v-model="captcha" type="text" placeholder="验证码" class="
            bg-gray-100
            w-3
            border-0 border-transparent
            focus:outline-none
            custom-font-14
            text-gray-600
            p-2
            my-2
            mr-2
            flex-1
          " />
                <img class="h-9 flex-1" @click="refreshCaptcha()" :src="captchaUrlPic" alt="" />
            </div>
            <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 my-2" @click="register()">
                注册
            </button>

            <div class="mt-2 flex justify-between">
                <p class="custom-font-12">
                    已有账号？
                    <span @click="toLogin()" class="text-blue-600 cursor-pointer font-medium">立即登陆</span>
                </p>
                <p class="custom-font-12">
                    <a class="text-blue-600 cursor-pointer font-medium">忘记密码?</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { api } from "../api/api";
import { nanoid } from "nanoid";
import Vue from "vue";
import { TextUtils } from "~/utils/TextUtils";
import { userStore } from '~/stores/user';
const store = userStore();

const isRegister = ref(false);
const captchaUrl = ref("");
const captchaUrlPic = ref("");
const loginParams = ref({
    email: "",
    password: "",
});
const registerParams = ({
    email: "",
    name: "",
    password: "",
});
const captcha = ref("");
const captchaEmail = ref("");
const captchaKey = ref("");
const repassword = ref("");

let uuid = nanoid(10);
captchaKey.value = uuid;
const { $toast } = useNuxtApp()
const token = useCookie("token", {
    maxAge: 60 * 60 * 24 * 14
})

function close() {
    // if (this.$store.state.user.isLogin && this.$route.path == "/login") {
    //     this.$router.push("/user");
    // }
    // if (!this.$store.state.user.isLogin && this.$route.path == "/login") {
    //     this.$router.push("/");
    // }
    // this.$store.commit("user/closeLogin");
    store.$patch({
        showLogin: !store.showLogin
    })
}

function refreshCaptcha() {
    captchaUrlPic.value =
        captchaUrl.value + captchaKey.value + "&t=" + new Date().getTime();
}

function toLogin() {
    isRegister.value = false;
    refreshCaptcha();
    clearData();
}
function toRegister() {
    isRegister.value = true;
    refreshCaptcha();
    clearData();
}
function clearData() {
    loginParams.value.email = "";
    loginParams.value.password = "";
    registerParams.email = "";
    registerParams.name = "";
    registerParams.password = "";
    captcha.value = "";
    captchaEmail.value = "";
}
async function login() {
    if (!this.checkLogin()) return;
    let result = await api.user.login(
        loginParams.value,
        captcha.value,
        captchaKey.value
    );
    refreshCaptcha();
    captcha.value = "";
    if (result.success) {

        $toast.success(result.message);
        token.value = (result.data.password)
        store.$patch({
            isLogin: true
        })
        // this.$store.commit("localStorage/setToken", result.data.password);
        // this.$store.commit("user/setLogin", true);
        // this.$cookies.set("token", true, {
        //     path: "/",
        //     maxAge: 60 * 60 * 24 * 14,
        // });
        close();
    } else {
        // this.$store.commit("user/setLogin", false);
        // this.$store.commit("localStorage/setToken", "");
        // this.$cookies.remove("token");
        $toast.error(result.message);
    }
    console.log(result);
}
async function sendCaptcha() {
    if (!TextUtils.checkEmail(registerParams.email)) {
        $toast.info("邮箱格式不正确");
        return false;
    }
    let result = await api.user.sendEmailCaptcha(this.registerParams.email);
    if (result.success) {
        $toast.success(result.message);
    } else {
        $toast.error(result.message);
    }
}
async function register() {
    if (!checkRegister()) return;

    let result = await api.user.register(
        registerParams,
        captchaEmail.value,
        captcha.value,
        captchaKey.value
    );
    refreshCaptcha();
    if (result.success) {
        $toast.success(result.message);
        toLogin();
    } else {
        $toast.error(result.message);
    }
}
function checkLogin(): boolean {
    if (!TextUtils.checkEmail(loginParams.value.email)) {
        $toast.info("邮箱格式不正确");
        return false;
    }
    if (TextUtils.isNullOrEmpty(loginParams.value.password)) {
        $toast.info("密码不能为空");
        return false;
    }
    if (TextUtils.isNullOrEmpty(captcha.value)) {
        $toast.info("验证码不能为空");
        return false;
    }

    return true;
}
function checkRegister(): boolean {
    if (!TextUtils.checkEmail(registerParams.email)) {
        $toast.info("邮箱格式不正确");
        return false;
    }
    if (TextUtils.isNullOrEmpty(captchaEmail.value)) {
        $toast.info("邮箱验证码不能为空");
        return false;
    }
    if (
        TextUtils.isNullOrEmpty(registerParams.password) &&
        TextUtils.isNullOrEmpty(repassword.value)
    ) {
        $toast.info("密码不能为空");
        return false;
    }
    if (
        TextUtils.isNullOrEmpty(registerParams.password) &&
        TextUtils.isNullOrEmpty(repassword.value)
    ) {
        $toast.info("密码不能为空");
        return false;
    }
    if (registerParams.password != repassword.value) {
        $toast.info("两次输入的密码不一致");
        return false;
    }
    if (TextUtils.isNullOrEmpty(captcha.value)) {
        $toast.info("验证码不能为空");
        return false;
    }

    return true;
}

watch(() => store.showLogin, (newStatus, oldStatus) => {
    if (newStatus) {
        captchaUrl.value = "https://api.zngg.net/user/user/captcha?captcha_uuid=";
        // this.captchaUrl = "http://127.0.0.1:8888/user/user/captcha?captcha_uuid=";
        toLogin();
    } else {
        captchaUrl.value = "";
    }
}, {
    deep: true // 深度监听的参数
})


</script>

<style scoped>
.modal-show {
    background: rgba(0, 0, 0, 0.35);
    -webkit-backdrop-filter: saturate(180%) blur(25px);
    backdrop-filter: saturate(180%) blur(25px);
}
</style>
