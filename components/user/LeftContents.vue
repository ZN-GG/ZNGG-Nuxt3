<template>
    <ul class="left-ul">
        <li v-for="(item, index) in menu" :key="index" class="my-2" :class="$route.path == item.path ? 'active' : ''">
            <nuxt-link :to="item.path">
                <div v-if="item.icon != 'false'" class="mr-3 iconfont" :class="item.icon"></div>
                <p v-text="item.name"></p>
            </nuxt-link>
        </li>
        <hr class="my-2" />
        <li>
            <a @click="logout()">
                <p class="text-red-600">退出登陆</p>
            </a>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { userStore } from '~~/stores/user';
const { $toast } = useNuxtApp()

const store = userStore()
const token = useCookie("token")

const menu = ref([
    { path: "/user", name: "主页", icon: "false" },
    { path: "/user/create", name: "创作中心", icon: "icon-pencil-fill" },
    { path: "/user/favorites", name: "我的收藏", icon: "icon-favorites-fill" },
    { path: "/user/info", name: "用户信息", icon: "icon-yonghu" },
])
function logout() {
    store.$patch({
        isLogin: false
    })
    token.value = null
    $toast.success("您已退出登录");
    setTimeout(() => {
        navigateTo('/')
    }, 2);

}
</script>

<style scoped>
.left-ul>li>a {
    @apply leading-10;
    @apply px-3;
    @apply font-bold;
    @apply flex;
    @apply items-center;
    @apply cursor-pointer;
}

.left-ul>li:hover {
    @apply bg-gray-200;
    @apply rounded;
}

.left-ul>li.active>a {
    @apply text-blue-600;
}
</style>