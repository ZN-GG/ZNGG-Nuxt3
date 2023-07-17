<template>
    <header class="shadow-md fixed top-0 w-full z-20">
        <div class="flex px-1 md:px-6 py-4 justify-between items-center">
            <div class="flex items-center">
                <div class="font-black inline text-xl cursor-pointer">
                    <a href="/"><img src="/logo-black.png" class="w-20 h-8" alt="" srcset="" /></a>
                </div>
                <ul class="menu ml-4 items-center hidden md:inline text-lg font-semibold pl-4">
                    <li class="inline mx-2 cursor-pointer select-none">
                        <NuxtLink to="/" exact="">首页</NuxtLink>
                    </li>
                    <li v-for="(item, index) in dataList" :key="index" class="inline mx-2 cursor-pointer select-none">
                        <NuxtLink :to="{ name: item.link }">{{ item.name }}</NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="flex items-center">
                <!-- <search-box class="block rounded-md" /> -->
                <div class=" login-group flex mx-2 lg:mx-4 custom-font-14 items-center leading-8">
                    <i class="md:hidden cursor-pointer select-none mx-1 px-3 md:px-5 iconfont icon-ego-menu rounded-md"
                        @click="toggleMobileMenu()"></i>
                    <p @click="login()" v-show="!loginStatus"
                        class="cursor-pointer select-none mx-1 px-3 md:px-5 text-white bg-blue-500 rounded-md ">
                        登录
                    </p>
                    <nuxt-link to="/user" v-show='loginStatus'
                        class="cursor-pointer select-none mx-1 px-3 md:px-5 bg-gray-100 rounded-md">
                        我的
                    </nuxt-link>
                </div>
            </div>
        </div>
        <Login />
        <div class="fixed modal-show z-30 w-full h-full border-t-2"
            :class="mobileMenuStatus ? ' animation-mobile-bg-show' : 'animation-mobile-bg-hidden pointer-events-none'">
            <div class="w-9/12 bg-white h-full right-0 absolute"
                :class="mobileMenuStatus ? 'animation-mobile-show' : 'animation-mobile-hidden'">
                <ul class="text-lg font-semibold">
                    <li class="cursor-pointer select-none">
                        <NuxtLink @click="toggleMobileMenu()" to="/">
                            <div class="m-2 p-2 mx-2 bg-gray-100 ">首页</div>
                        </NuxtLink>
                    </li>
                    <li v-for="(item, index) in dataList" :key="index" class="cursor-pointer select-none">
                        <NuxtLink @click="toggleMobileMenu()" :to="{ name: item.link }">
                            <div class="m-2 p-2 mx-2 bg-gray-100 ">{{ item.name }}</div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="w-3/12 h-full" @click="toggleMobileMenu()"></div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { vModelCheckbox } from 'nuxt/dist/app/compat/capi';
import { ref } from 'vue';
import { userStore } from '~/stores/user';
// import SearchBox from '~/components/SearchBox.vue';

const token = useCookie("token")
const store = userStore();
const loginStatus = ref(false)
const mobileMenuStatus = ref(false)

if (typeof (token.value) != 'undefined') {
    loginStatus.value = true;
}

watch(() => store.isLogin, (newStatus, oldStatus) => {
    loginStatus.value = newStatus;
}, {
    deep: true
})


const dataList = ref([
    {
        link: "tool",
        name: "工具",
    },
    {
        link: "read",
        name: "文章",
    },
    {
        link: "nav",
        name: "导航",
    },
    {
        link: "link",
        name: "友链",
    },
])


function login() {
    //this.$store.commit("user/login");
    store.$patch({
        showLogin: !store.showLogin
    })
}

function toggleMobileMenu() {
    mobileMenuStatus.value = !mobileMenuStatus.value
}

function userCenter() {
    //this.$router.push("/user")
}

async function login2() {

}
</script>

<style scoped>
header {
    background: white;
}

.menu>li:hover,
.router-link-active,
.router-link-exact-active {
    color: #3955f6;
    font-weight: 900;
}

.icon-category {
    font-size: 24px;
}
</style>
