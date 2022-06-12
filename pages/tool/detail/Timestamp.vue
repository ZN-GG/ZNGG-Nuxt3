<template>
    <div class="bg-white min-h-screen">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <p class="text-2xl text-black">时间戳在线转换</p>
                    </div>
                </div>
            </div>
        </section>
        <div class="container px-4 mx-auto py-6">
            <div class="flex items-center flex-wrap border-b py-2">
                <p class="mr-2 my-1">现在的Unix时间戳(Unix timestamp)是:</p> <input v-model="nowStamp"
                    class="bg-gray-100 outline-none px-2 py-1 mr-2 my-1 text-red-700" disabled type="text">
                <div class="flex">
                    <div @click="start()"
                        class="my-2 mr-2 py-1 cursor-pointer rounded px-4 bg-blue-700 text-gray-100 select-none hover:bg-blue-900">
                        开始</div>
                    <div @click="pause()"
                        class="m-2 py-1 cursor-pointer rounded px-4 bg-blue-700 text-gray-100 select-none hover:bg-blue-900">
                        暂停</div>
                    <div @click="pause()"
                        class="m-2 py-1 cursor-pointer rounded px-4 bg-blue-700 text-gray-100 select-none hover:bg-blue-900">
                        复制</div>
                </div>
            </div>
            <div class="flex items-center flex-wrap border-b py-6">
                <p class="mr-2 my-1">日期转时间戳:</p>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">

const nowStamp = ref(Date.parse(new Date().toString()) / 1000)
const isRunning = ref(true)

setInterval(function () {
    if (isRunning.value) {
        nowStamp.value = Date.parse(new Date().toString()) / 1000;
    }
}, 1000);

function start() {
    isRunning.value = true
}

function pause() {
    isRunning.value = false
}

useHead({
    title: "时间戳在线转换工具",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: '时间戳工具,时间转换,时间戳转换,时间戳在线转换工具' },
        { name: 'description', content: '一个时间戳转换工具，用于将时间戳转换成时间或者将时间转换成时间。' }
    ],
})
</script>