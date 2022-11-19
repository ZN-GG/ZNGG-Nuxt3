<template>
    <div>
        <div class="my-6 flex justify-between items-center">
            <p class="font-bold text-2xl">个人信息</p>
        </div>

        <div v-if="userInfo.success">
            <img :src="userInfo.data.avatar" class="w-12 h-12 rounded-full border-spacing-1">
        </div>



    </div>
</template>

<script setup lang="ts">
import { api } from '~/api/api';
const { data: userInfo, pending: infoPending, refresh: infoRefresh, error: infoError } = await useAsyncData("info_GetUserInfo", () => api.user.getInfo());





</script>

<style>

</style>