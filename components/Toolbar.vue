<template>
    <header class="shadow-xl">
        <div class="flex px-1 md:px-6 py-4 justify-between items-center">
            <div class="flex items-center">
                <div class="font-black inline text-xl cursor-pointer">
                    <a href="/"><img src="/logo-black.png" class="w-20 h-8" alt="" srcset="" /></a>
                </div>
                <ul class="menu ml-4 items-center hidden md:inline custom-font-16 pl-4">
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
                    <p @click="login()" v-show="!loginStatus"
                        class=" cursor-pointer select-none mx-1 px-3 md:px-5 text-white bg-blue-500 rounded-md ">
                        登陆
                    </p>
                    <nuxt-link to="/user" v-show='loginStatus'
                        class="cursor-pointer select-none mx-1 px-3 md:px-5 bg-gray-100 rounded-md">
                        我的
                    </nuxt-link>
                </div>
            </div>
        </div>
        <Login />
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { userStore } from '~/stores/user';
// import SearchBox from '~/components/SearchBox.vue';

const token = useCookie("token")
const store = userStore();
const loginStatus = ref(false)

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
    // {
    //   link: "friendlink",
    //   name: "友链",
    // },
])


function login() {
    //this.$store.commit("user/login");
    store.$patch({
        showLogin: !store.showLogin
    })
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
>
