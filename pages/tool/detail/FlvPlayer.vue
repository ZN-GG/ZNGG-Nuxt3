<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">Flv在线播放器</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12">
            <div class="flex w-full">
                <div class="w-full md:w-9/12">
                    <div class="video-player-box w-full bg-black">
                        <video ref="videoElement" class="absolute w-full h-full" controls autoplay></video>
                    </div>
                </div>
                <div class="hidden md:flex flex-wrap items-start md:w-3/12 bg-black">
                    <div class="w-full">
                        <p class="p-2 text-lg text-white font-bold hover:filter">更多推荐：</p>
                        <div class="px-2 py-4 cursor-pointer">
                            <img src="/img/XGPlayer.png">
                        </div>
                        <div class="px-2 py-4 cursor-pointer">
                            <nuxt-link to="/tool/detail/NPlayer">
                                <p class="text-2xl text-white font-bold">
                                    NPlayer
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
                    <p>专为Flv直播拉流测试而打造的播放器，同时支持mp4等视频格式的播放。（不支持m3u8）</p>
                </blockquote>
                <ul>
                    <li>支持格式：'mse', 'mpegts', 'm2ts', 'flv' 和 'mp4'</li>
                    <li>不支持m3u8!!!</li>
                    <li>m3u8播放器正准备开发...</li>
                    <li>基于mpegts：<a href="https://github.com/xqq/mpegts.js"
                            target="_blank">https://github.com/xqq/mpegts.js</a></li>
                </ul>
            </article>
        </section>

    </div>
</template>
<script setup lang="ts">import Mpegts from 'mpegts.js';

const videoUrl = ref("")
const videoElement = ref<HTMLElement>()
let $mpegts: { createPlayer: any; isSupported?: () => boolean; getFeatureList?: () => Mpegts.FeatureList; BaseLoader?: Mpegts.BaseLoaderConstructor; LoaderStatus?: Mpegts.LoaderStatus; LoaderErrors?: Mpegts.LoaderErrors; version?: string; Events?: Readonly<Mpegts.Events>; ErrorTypes?: Readonly<Mpegts.ErrorTypes>; ErrorDetails?: Readonly<Mpegts.ErrorDetails>; MSEPlayer?: Mpegts.PlayerConstructor; NativePlayer?: Mpegts.PlayerConstructor; LoggingControl?: Mpegts.LoggingControl; };
let player: { unload: () => void; detachMediaElement: () => void; destroy: () => void; attachMediaElement: (arg0: HTMLElement | undefined) => void; load: () => void; play: () => void; pause: () => void; } | null;
onMounted(async () => {
    $mpegts = (await import('mpegts.js')).default
})

function load() {
    if (typeof player !== "undefined") {
        if (player != null) {
            player.unload();
            player.detachMediaElement();
            player.destroy();
            player = null;
        }
    }

    let type = 'mse';
    if (videoUrl.value.indexOf(".mp4") != -1) {
        type = 'mp4'
    }
    player = $mpegts.createPlayer({
        type: type,
        cors: true,
        hasVideo: true,
        url: videoUrl.value,
    }, {
        enableWorker: true,
        lazyLoadMaxDuration: 3 * 60,
        seekType: 'range',
        liveBufferLatencyChasing: true,
    });
    player!.attachMediaElement(videoElement.value);
    player!.load();
}

function clear() {
    videoUrl.value = "";
}

function play() {
    if (typeof player !== "undefined") {
        if (player != null) {
            player.play()
        }
    }
}

function pause() {
    if (typeof player !== "undefined") {
        if (player != null) {
            player.pause()
        }
    }
}

function destroy() {
    if (typeof player !== "undefined") {
        if (player != null) {
            player.unload();
            player.detachMediaElement();
            player.destroy();
            player = null;
        }
    }
}


useHead({
    title: "Flv在线播放器",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    meta: [
        { name: 'Keywords', content: 'Flv在线播放,flv直播播放器,flv直播测试,mp4播放器,mp4在线播放,在线播放器' },
        { name: 'description', content: '测试flv拉流专用的播放器，flv直播是一种稳定好用的直播拉流方案，所以专门做了这样一个播放器用于测试flv直播拉流。' }
    ],
})


</script>

<style>
.video-player-box {
    position: relative;
    padding-bottom: 66.666666%;

}
</style>