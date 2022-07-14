<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <p class="text-2xl text-black">NPlayer播放器</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12">
            <div class="flex w-full">
                <div class="w-full md:w-9/12">
                    <div class="video-player-box w-full bg-black">
                        <div ref="videoElement" class="absolute w-full h-full"></div>
                    </div>
                </div>
                <div class="hidden md:flex flex-wrap items-start md:w-3/12 bg-black">
                    <div class="w-full">
                        <p class="p-2 text-lg text-white font-bold hover:filter">更多推荐：</p>
                        <div class="px-2 py-4 cursor-pointer">
                            <img src="/img/XGPlayer.png">
                        </div>
                        <div class="px-2 py-4 cursor-pointer">
                            <nuxt-link to="/tool/detail/FlvPlayer">
                                <p class="text-2xl text-white font-bold">
                                    FlvPlayer
                                </p>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-wrap justify-between my-2 items-center">
                <div class="w-full md:flex-1 md:pr-2">
                    <input class="bg-gray-200 outline-none px-2 py-1 w-full" type="text" placeholder="请输入视频地址"
                        v-model="videoUrl">
                </div>
                <div class="flex flex-wrap w-full md:w-auto my-2 md:my-0 justify-between">
                    <div class="cursor-pointer py-1 px-4 bg-blue-500 text-gray-100 rounded md:ml-2" @click="clear()">清空
                    </div>
                    <div class="cursor-pointer ml-2 py-1 px-4 bg-blue-500 text-gray-100 rounded" @click="load()">载入
                    </div>
                    <div class="cursor-pointer ml-2 py-1 px-4 bg-blue-500 text-gray-100 rounded" @click="play()">开始
                    </div>
                    <div class="cursor-pointer ml-2 py-1 px-4 bg-blue-500 text-gray-100 rounded" @click="pause()">暂停
                    </div>
                    <div class="cursor-pointer ml-2 py-1 px-4 bg-blue-500 text-gray-100 rounded" @click="destroy()">销毁
                    </div>
                </div>
            </div>

        </section>

        <section class="bg-white w-full container mx-auto  px-4 py-6">

            <article class="prose lg:prose-xl" style="max-width: none;">
                <h4>使用说明：</h4>
                <blockquote>
                    <p>NPlayer 是由 Typescript 加 Sass 编写，无任何第三方运行时依赖，兼容 IE11，支持移动端、支持
                        SSR、支持直播。高度可定制，所有图标、主题色等都可以替换，并且提供了内置组件方便二次开发。你可以自定义任意多个断点，不仅仅是兼容移动端，只要愿意，你可以非常轻松的兼容手机竖屏、手机横屏、平板等设备。它还拥有插件系统，弹幕功能就是使用插件形式提供，使用时按需引入即可。该播放器还可以接入任何流媒体，如
                        hls、dash 和 flv 等。</p>
                </blockquote>
                <ul>
                    <li>支持格式：'m3u8' 和 'mp4'</li>
                    <li>支持m3u8!!!</li>
                    <li>flv、dash正准备开发...</li>
                    <li>基于NPlayer：<a href="https://github.com/woopen/nplayer"
                            target="_blank">https://github.com/woopen/nplayer</a></li>
                </ul>
            </article>
        </section>

    </div>
</template>
<script setup lang="ts">


const videoUrl = ref("")
const videoElement = ref<HTMLVideoElement>(null)

const { $toast } = useNuxtApp()
let $nplayer: any;
let $hls: any;
let player: any;

onMounted(async () => {
    const nplayer = await import('nplayer')
    $hls = (await import('hls.js')).default;
    $nplayer = nplayer.Player


    /**
     * Mp4
     */
    // const video = document.createElement('video')
    // video.src = ''
    // player = new $nplayer({ video, videoAttrs: { autoplay: 'true' } })
    // player.mount(videoElement.value)


    /**
     * m3u8
     */
    // const hls = new $hls()
    // player = new $nplayer()
    // hls.attachMedia(player.video)
    // player.mount(videoElement.value)
    // hls.on($hls.Events.MEDIA_ATTACHED, function () {
    //     hls.loadSource('')
    // })

})

function load() {
    destroy();
    let type = 'mp4';
    if (videoUrl.value.indexOf(".m3u8") != -1) {
        type = 'm3u8'
        const hls = new $hls()
        player = new $nplayer()
        hls.attachMedia(player.video)
        player.mount(videoElement.value)
        hls.on($hls.Events.MEDIA_ATTACHED, function () {
            hls.loadSource(videoUrl.value)
        })
    } else {
        const video = document.createElement('video')
        video.src = videoUrl.value
        player = new $nplayer({ video, videoAttrs: { autoplay: 'true' } })
        player.mount(videoElement.value)
    }


}

function clear() {
    videoUrl.value = "";
}

function play() {
    if (typeof player !== "undefined") {
        player.play();
    }
}

function pause() {
    if (typeof player !== "undefined") {
        player.pause();
    }
}

function destroy() {
    if (typeof player !== "undefined") {
        if (player != null) {
            player.dispose();
            player = null;
        }
    }
}


useHead({
    title: "NPlayer在线播放器",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: 'NPlayer播放器,m3u8直播测试,flv直播播放器,flv直播测试,mp4播放测试,m3u8播放测试,在线播放器' },
        { name: 'description', content: '' }
    ],
})


</script>

<style>
.video-player-box {
    position: relative;
    padding-bottom: 66.666666%;

}
</style>