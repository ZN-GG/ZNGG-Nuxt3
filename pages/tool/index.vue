<template>
    <div class="mx-auto container my-8 min-h-screen">
        <div class="bg-white p-6 rounded-md mt-8 mb-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <p class="font-semibold text-2xl">在线工具</p>
                </div>
                <div class="flex">
                    <div class="hidden md:flex">
                        <div class="btn-1">原创工具</div>
                        <div class="btn-1">程序员</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex flex-wrap justify-between">
            <NuxtLink to="/tool/detail/EnglistConvert" v-for="item in 1" class="w-4/12 md:w-2/12 flex mb-4"
                :class="(item + 5) % 6 == 0 ? 'md:pr-1 md:pl-0' : '', (item) % 6 == 0 ? 'md:pl-1 md:pr-0' : '', ((item + 6) % 6 != 0) && ((item) % 6 != 0) ? 'md:px-1' : '', (item + 1) % 3 == 0 ? 'px-1' : '', (item + 2) % 3 == 0 ? 'pr-2' : '', (item) % 3 == 0 ? 'pl-2' : ''">
                <div class="w-full relative tool-border">
                    <div class="tool-box absolute">
                        <div class="tool-icon" style="background-image: url(/img/tool-e2E.svg);">
                        </div>
                        <p class="tool-title">英文大小写转换</p>
                        <p class="tool-des">大小写转换，首字母大写，首字母小写</p>
                    </div>
                </div>
            </NuxtLink>
            <NuxtLink to="/tool/detail/Timestamp" v-for="item in 1" class="w-4/12 md:w-2/12 flex mb-4"
                :class="(item + 5) % 6 == 0 ? 'md:pr-1 md:pl-0' : '', (item) % 6 == 0 ? 'md:pl-1 md:pr-0' : '', ((item + 6) % 6 != 0) && ((item) % 6 != 0) ? 'md:px-1' : '', (item + 1) % 3 == 0 ? 'px-1' : '', (item + 2) % 3 == 0 ? 'pr-2' : '', (item) % 3 == 0 ? 'pl-2' : ''">
                <div class="w-full relative tool-border">
                    <div class="tool-box absolute">
                        <div class="tool-icon" style="background-image: url(/img/tool-timestamp.svg);">
                        </div>
                        <p class="tool-title">时间戳在线转换</p>
                        <p class="tool-des">时间戳转日期，日期转时间戳，获取时间戳</p>
                    </div>
                </div>
            </NuxtLink>
            <NuxtLink to="/tool/detail/ImageToBase64" v-for="item in 1" class="w-4/12 md:w-2/12 flex mb-4"
                :class="(item + 5) % 6 == 0 ? 'md:pr-1 md:pl-0' : '', (item) % 6 == 0 ? 'md:pl-1 md:pr-0' : '', ((item + 6) % 6 != 0) && ((item) % 6 != 0) ? 'md:px-1' : '', (item + 1) % 3 == 0 ? 'px-1' : '', (item + 2) % 3 == 0 ? 'pr-2' : '', (item) % 3 == 0 ? 'pl-2' : ''">
                <div class="w-full relative tool-border">
                    <div class="tool-box absolute">
                        <div class="tool-icon" style="background-image: url(/img/tool-ImageToBase64.svg);">
                        </div>
                        <p class="tool-title">图片转Base64</p>
                        <p class="tool-des">图片转Base64，Base64转图片</p>
                    </div>
                </div>
            </NuxtLink>
            <NuxtLink to="/tool/detail/FlvPlayer" v-for="item in 1" class="w-4/12 md:w-2/12 flex mb-4"
                :class="(item + 5) % 6 == 0 ? 'md:pr-1 md:pl-0' : '', (item) % 6 == 0 ? 'md:pl-1 md:pr-0' : '', ((item + 6) % 6 != 0) && ((item) % 6 != 0) ? 'md:px-1' : '', (item + 1) % 3 == 0 ? 'px-1' : '', (item + 2) % 3 == 0 ? 'pr-2' : '', (item) % 3 == 0 ? 'pl-2' : ''">
                <div class="w-full relative tool-border">
                    <div class="tool-box absolute">
                        <div class="tool-icon" style="background-image: url(/img/tool-FlvPlayer.svg);">
                        </div>
                        <p class="tool-title">flv直播播放器</p>
                        <p class="tool-des">flv播放器，flv拉流测试</p>
                    </div>
                </div>
            </NuxtLink>
            <div v-for="item in 11" class="w-4/12 md:w-2/12"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
useHead({
    title: "工具",
    titleTemplate: (title) => `${title} - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: 'ZNGG在线工具,时间戳工具,在线转换工具,Json在线解析格式化' },
        { name: 'description', content: 'ZNGG在线工具是一个持续提供高质量内容输出平台，并将输出内容转变为成果，提供各种各样的在线工具。' }
    ],
})
</script>