<template>
    <div>
        <div class="flex container mx-auto my-6 px-4">
            <div class="w-2/12">
                <div class="w-full bg-white rounded p-4">
                    <UserLeftContents />
                </div>
            </div>
            <div class="w-10/12">
                <div class="w-full bg-white rounded mx-2 p-4">
                    <NuxtPage />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default',
    middleware: ['auth']
})

useHead({
    title: "用户中心",
    titleTemplate: (title) => `${title} - 持续高质量内容输出`,
    meta: [
        { name: 'Keywords', content: '前端技术分享，后端技术分享，在线小工具，设计技巧' },
        { name: 'description', content: 'ZNGG在线工具是一个持续提供高质量内容输出平台，并将输出内容转变为成果，提供各种各样的在线工具。' }
    ],
})
</script>

<style lang='postcss' scoped>
</style>

