<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <p class="text-2xl text-black">在线屏幕录制</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12">
            <div class="flex">
                <div class="w-6/12 px-16">
                    <video ref="videoNode" controls autoplay playsinline class="w-full h-72 bg-black"></video>
                </div>
                <div class="w-6/12">
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
                    <div class="flex flex-wrap mb-4">
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
    </div>
</template>
<script setup lang="ts">

const videoNode = ref<HTMLVideoElement>(null)

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
let stream;
let blob;
onMounted(async () => {
    const RecordRTC = (await import('recordrtc')).default
    $recordrtc = RecordRTC
})

async function start() {
    stream = await getStream();
    var options = {
        type: 'video',
        mimeType: recordFormat.value,
        checkForInactiveTracks: false,
        disableLogs: false,
        getNativeBlob: false,
        ignoreMutedMedia: false,
        initCallback: null,
    };
    videoNode.value.muted = true
    recorder = $recordrtc(stream, options);
    videoNode.value.srcObject = stream;
    recorder.startRecording();
}

async function getStream() {
    if (recordMedia.value == 'record-screen') {
        let res = recordResolutions.value.split("x");

        let tempStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            // {
            //     width: parseInt(res[0]),
            //     height: parseInt(res[1])
            // }
            audio: true
        });
        return tempStream;

    } else if (recordMedia.value == 'record-audio-plus-screen') {
        let tempStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        });
        let tempMic = await navigator.mediaDevices.getUserMedia({ audio: true })
        tempStream.addTrack(tempMic.getTracks()[0])
        return tempStream;
    }


}

function stop() {
    recorder.stopRecording(function () {
        videoNode.value.muted = false
        blob = recorder.getBlob();
        videoNode.value.srcObject = null
        videoNode.value.src = URL.createObjectURL(blob);
    });
    if (stream) {
        stream.stop();
    }
}

function save() {
    $recordrtc.invokeSaveAsDialog(blob, getFileName(getFileExtension()))
}

function selectRecordMedia(value) {
    recordMedia.value = value
}
function selectRecordFormat(value) {
    recordFormat.value = value
}
function selectRecordResolutions(value) {
    recordResolutions.value = value
}


function getFileName(fileExtension) {
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
    return fileExtension;
}

function isMimeTypeSupported(mimeType): boolean {
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
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: '在线录屏,在线屏幕录制工具,免下载录制屏幕' },
        { name: 'description', content: '在线录屏工具，无需下载即可录制屏幕内容和麦克风的声音' }
    ],
})
</script>