<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">在线屏幕录制</h1>
                    </div>
                </div>
            </div>
        </section>
        <div class="w-full container mx-auto h-72 md:hidden">
            <h2 class="text-xl p-4">
                该工具不支持手机使用！
            </h2>
        </div>
        <section class="w-full container px-4 mx-auto py-12 hidden md:block">
            <div class="flex">
                <div class="w-6/12 px-6">
                    <video ref="videoNode" class="w-auto h-72 bg-black"></video>
                </div>
                <div class="w-6/12 pl-4">
                    <div class="flex flex-wrap mb-4">
                        <h2 class="w-full font-semibold text-gray-900">请选择录制方式：</h2>
                        <button v-for="(item, index) in recordMediaList" @click="selectRecordMedia(item.value)"
                            class="cursor-pointer my-1 select-none mr-2 px-3 md:px-5 rounded-md custom-font-14 leading-8 hover:bg-blue-600 hover:text-white"
                            :class="item.value == recordMedia ? 'bg-blue-600 text-white' : 'bg-gray-100'">
                            {{ item.name }}
                        </button>
                    </div>
                    <div class="flex flex-wrap mb-4">
                        <h2 class="w-full font-semibold text-gray-900">请选择录制格式：</h2>
                        <button v-for="(item, index) in recordFormatList" @click="selectRecordFormat(item.value)"
                            class="cursor-pointer my-1 select-none mr-2 px-3 md:px-5 rounded-md custom-font-14 leading-8 hover:bg-blue-600 hover:text-white"
                            :class="item.value == recordFormat ? 'bg-blue-600 text-white' : 'bg-gray-100'">
                            {{ item.name }}
                        </button>
                    </div>
                    <div class="flex flex-wrap mb-6">
                        <h2 class="w-full font-semibold text-gray-900">请选择清晰度：</h2>
                        <button v-for="(item, index) in recordResolutionsList"
                            @click="selectRecordResolutions(item.value)"
                            class="cursor-pointer my-1 select-none mr-2 px-3 md:px-5 rounded-md custom-font-14 leading-8 hover:bg-blue-600 hover:text-white"
                            :class="item.value == recordResolutions ? 'bg-blue-600 text-white' : 'bg-gray-100'">
                            {{ item.name }}
                        </button>
                    </div>
                    <div class="flex flex-wrap mb-4">
                        <button type="button" @click="start()"
                            class="flex mr-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                            开始录制
                        </button>
                        <button type="button" @click="stop()"
                            class="flex mr-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                            停止
                        </button>
                        <button type="button" @click="save()"
                            class="flex mr-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                            保存
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <hr class="container mx-auto">
        <section class="bg-white w-full container mx-auto  px-4 py-6">

            <article class="prose lg:prose-xl" style="max-width: none;">
                <h4>使用说明：</h4>
                <blockquote>
                    <p>无需下载就可以在线录屏的工具，可选择是否录制麦克风的声音，配置推荐使用默认配置。
                    </p>
                </blockquote>
                <ul>
                    <li>Mac用户建议使用Safari浏览器，实测Mac下Safari录制的清晰度更高。</li>
                    <li>Windows推荐使用Chrome浏览器。</li>
                    <li>手机用户暂不支持使用。</li>
                    <li>更多功能等待添加：</li>
                    <li>待开发：水印</li>
                    <li>待开发：文字跑马灯</li>
                </ul>
            </article>
        </section>
    </div>
</template>
<script setup lang="ts">
const { $toast } = useNuxtApp()
const videoNode = ref<HTMLVideoElement>()

const recordMedia = ref("record-audio-plus-screen")
const recordMediaList = ref([
    {
        "name": "屏幕+麦克风",
        "value": "record-audio-plus-screen"
    },
    {
        "name": "屏幕",
        "value": "record-screen"
    }
])
const recordFormat = ref("video/webm;codecs=h264")
const recordFormatList = ref([
    {
        "name": "MP4",
        "value": "video/webm;codecs=h264"
    },
    {
        "name": "webm",
        "value": "video/webm"
    },
    {
        "name": "vp8",
        "value": "video/webm;codecs=vp8"
    },
    {
        "name": "vp9",
        "value": "video/webm;codecs=vp9"
    },
    {
        "name": "mkv",
        "value": "video/x-matroska;codecs=avc1"
    },

])
const recordResolutions = ref("3840x2160")
const recordResolutionsList = ref([
    {
        "name": "4K",
        "value": "3840x2160"
    },
    {
        "name": "2K",
        "value": "2560x1440"
    },
    {
        "name": "1080P",
        "value": "1920x1080"
    },
    {
        "name": "720P",
        "value": "1280x720"
    },
    {
        "name": "480P",
        "value": "640x480"
    },
])


let $recordrtc: any;
let recorder: any;
let stream: MediaProvider | null | undefined;
let blob: Blob | MediaSource;
onMounted(async () => {
    const RecordRTC = (await import('recordrtc')).default
    $recordrtc = RecordRTC
})

async function start() {
    try {
        stream = await getStream();
    } catch (e) {
        $toast.error("无权限")
    }
    var options = {
        type: 'video',
        canvas: {
            width: 640,
            height: 480
        },
        mimeType: recordFormat.value,
        checkForInactiveTracks: false,
        disableLogs: false,
        getNativeBlob: false,
        ignoreMutedMedia: false,
        initCallback: null,
    };
    setVideo(false)
    recorder = $recordrtc(stream, options);
    //@ts-ignore
    videoNode.value.srcObject = stream;
    recorder.startRecording();
}

async function getStream() {
    let res = recordResolutions.value.split("x");
    let videoConstraints = {
        width: parseInt(res[0]),
        height: parseInt(res[1])
    };

    if (recordMedia.value == 'record-screen') {
        let tempStream = await navigator.mediaDevices.getDisplayMedia({
            video: videoConstraints,
            audio: true
        });
        return tempStream;

    } else if (recordMedia.value == 'record-audio-plus-screen') {
        let tempStream = await navigator.mediaDevices.getDisplayMedia({
            video: videoConstraints,
            audio: true
        });
        let tempMic = await navigator.mediaDevices.getUserMedia({ audio: true })
        tempStream.addTrack(tempMic.getTracks()[0])
        return tempStream;
    }


}

function stop() {
    recorder.stopRecording(function () {
        setVideo(true)
        blob = recorder.getBlob();
        videoNode.value!.srcObject = null
        videoNode.value!.src = URL.createObjectURL(blob);
    });
    if (stream) {
        //@ts-ignore
        stream.stop();
    }
}

function setVideo(flag: boolean) {
    videoNode.value!.controls = flag;
    videoNode.value!.autoplay = true;
    videoNode.value!.muted = !flag;
}

function save() {
    $recordrtc.invokeSaveAsDialog(blob, getFileName(getFileExtension()))
}

function selectRecordMedia(value: string) {
    recordMedia.value = value
}
function selectRecordFormat(value: string) {
    recordFormat.value = value
}
function selectRecordResolutions(value: string) {
    recordResolutions.value = value
}


function getFileName(fileExtension: string | String) {
    var d = new Date();
    var year = d.getUTCFullYear();
    var month = d.getUTCMonth();
    var date = d.getUTCDate();
    return 'ZNGG录屏-' + year + month + date + '.' + fileExtension;
}


function getFileExtension(): String {
    let fileExtension: String;
    if (recordFormat.value === 'video/webm\;codecs=h264') {
        fileExtension = 'mp4';
        if (isMimeTypeSupported('video/mpeg')) {
            recordFormat.value = 'video/mpeg';
        }
    }

    if (recordFormat.value === 'video/x-matroska;codecs=avc1' && isMimeTypeSupported('video/x-matroska;codecs=avc1')) {
        fileExtension = 'mkv';
    }

    if (recordFormat.value === 'video/webm\;codecs=vp8' && isMimeTypeSupported('video/webm;codecs=vp8')) {
        fileExtension = 'webm';
    }

    if (recordFormat.value === 'video/webm\;codecs=vp9' && isMimeTypeSupported('video/webm\;codecs=vp9')) {
        fileExtension = 'webm';
    }

    if (recordFormat.value === 'video/webm') {
        fileExtension = 'webm';
    }
    return fileExtension!;
}

function isMimeTypeSupported(mimeType: string): boolean {
    if (typeof MediaRecorder === 'undefined') {
        return false;
    }

    if (typeof MediaRecorder.isTypeSupported !== 'function') {
        return true;
    }

    return MediaRecorder.isTypeSupported(mimeType);
}



useHead({
    title: "在线屏幕录制",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    meta: [
        { name: 'Keywords', content: '在线录屏,在线屏幕录制工具,免下载录制屏幕,不用下载就可以录屏的工具,RecordRTC,webrtc录屏' },
        { name: 'description', content: '在线录屏工具，无需下载即可录制屏幕内容和麦克风的声音。4K免费在线录屏工具，不花钱不下载就能用的在线录屏工具。' }
    ],
})
</script>