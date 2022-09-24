<template>
    <div class="main">
        <div class="container mx-auto">
            <img class="mx-auto mt-12 md:mt-28 tool-logo" src="/img/NationalDayAvatar/tool-logo.png" alt="">
        </div>
        <div class="mx-auto mt-8">
            <div class="flex items-center justify-center">
                <a class="prev" @click="prevImg()"></a>
                <div class="canvasAvatarBoxBorder p-1">
                    <div class="canvasAvatarBox" ref="canvasAvatarBox">
                        <canvas class="canvasAvatar" id="canvasAvatar" ref="canvasAvatar"></canvas>
                    </div>
                </div>
                <a class="next" @click="nextImg()"></a>
            </div>
        </div>
        <div>
            <div class="container mt-6 mx-auto">
                <div class="text-center relative pt-6 pb-6 mb-4 custom-font-14 rounded w-44 mx-auto"
                    style="background: url(/img/NationalDayAvatar/upload-btn.png);background-size: 11rem;"
                    id="fileInput" alt="上传头像">
                    <input type="file" id="file" accept="image/*"
                        style="opacity: 0;position: absolute;cursor: pointer;width: 100%;height: 100%;left: 0;top: 0;"
                        @change="selectFile">
                </div>
                <div v-show="uploaded" class="text-center relative pt-6 pb-6 mb-4 custom-font-14 rounded w-44 mx-auto"
                    style="background: url(/img/NationalDayAvatar/save-btn.png);background-size: 11rem;"
                    alt="保存头像"
                    @click="saveAvatar()">
                </div>
            </div>
            <div style="display: none">
                <img v-for="index in sum" :id="'avatar-' + index" :src="'/img/NationalDayAvatar/avatar-'+index+'.png'"
                    style="display: none;">
            </div>
            <div class="container flex flex-wrap mx-auto justify-around">
                <div v-for="index in sum" class="w-20 m-4 canvasAvatarBoxBorder"
                    :class="index==activeIndex?'active':''">
                    <img @click="changeAvatar(index);activeIndex=index;"
                        :src="'/img/NationalDayAvatar/avatar-'+index+'.png'">
                </div>
                <div class="w-20 mx-4"></div>
                <div class="w-20 mx-4"></div>
                <div class="w-20 mx-4"></div>
                <div class="w-20 mx-4"></div>
                <div class="w-20 mx-4"></div>
                <div class="w-20 mx-4"></div>
                <div class="w-20 mx-4"></div>
            </div>
            <div class="container mx-auto">
                <img src="/img/NationalDayAvatar/message.png" alt="">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

const sum = 15;

const canvasAvatar = ref<HTMLCanvasElement>(null)
const canvasAvatarBox = ref<HTMLDivElement>(null)

let ctx;
let fabric;
let canvasFabric;
let avatarInstance;
let activeIndex = ref(1);
let uploaded = ref(false)
onMounted(async () => {
    fabric = (await import('fabric')).fabric;
    ctx = canvasAvatar.value.getContext('2d')
})


async function selectFile(e) {
    if (e.target.files.length > 0) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function (e) {
            let imageElement = new Image();
            imageElement.src = reader.result.toString();
            imageElement.onload = function () {
                uploaded.value = true;
                img2Cvs(imageElement)
            }
        }
    }
}

function img2Cvs(imageElement: HTMLImageElement) {
    canvasAvatar.value.width = imageElement.width;
    canvasAvatar.value.height = imageElement.height;
    let boxW = canvasAvatarBox.value.clientWidth;
    let boxH = canvasAvatarBox.value.clientHeight;
    if (avatarInstance) {
        canvasFabric.clear();
    }
    canvasAvatar.value.style.display = "block";
    canvasFabric = new fabric.Canvas('canvasAvatar', {
        width: boxW,
        height: boxH,
        backgroundImage: new fabric.Image(imageElement, {
            scaleX: boxW / imageElement.width,
            scaleY: boxH / imageElement.height
        })
    });
    changeAvatar(activeIndex.value)

}

function changeAvatar(index: number) {
    if (!uploaded.value) {
        return
    }
    let boxW = canvasAvatarBox.value.clientWidth;
    let boxH = canvasAvatarBox.value.clientHeight;
    var avatarImage: HTMLImageElement = document.getElementById('avatar-' + index) as HTMLImageElement;
    if (avatarInstance) {
        canvasFabric.remove(avatarInstance);
    }
    avatarInstance = new fabric.Image(avatarImage, {
        top: 0,
        left: 0,
        scaleX: boxW / avatarImage.width,
        scaleY: boxH / avatarImage.height,
        cornerColor: "#0b3a42",
        cornerStrokeColor: "#fff",
        cornerStyle: "circle",
        transparentCorners: false,
        rotatingPointOffset: 30
    });
    avatarInstance.setControlVisible("bl", false);
    avatarInstance.setControlVisible("tr", false);
    avatarInstance.setControlVisible("tl", false);
    avatarInstance.setControlVisible("mr", false);
    avatarInstance.setControlVisible("mt", false);
    canvasFabric.add(avatarInstance)
}

function saveAvatar() {
    let boxW = canvasAvatarBox.value.clientWidth;
    let boxH = canvasAvatarBox.value.clientHeight;
    var hyperlink = document.createElement("a");
    hyperlink.href = canvasFabric.toDataURL({
        width: boxW,
        height: boxH
    });
    hyperlink.download = 'avatar.png';
    if (typeof hyperlink.click === "function") {
        hyperlink.click();
    } else {
        hyperlink.target = "_blank";
        hyperlink.dispatchEvent(new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true
        }));
    }
    URL.revokeObjectURL(hyperlink.href)
}

function prevImg() {
    if (activeIndex.value == 1) {
        return
    }
    activeIndex.value -= 1;
    changeAvatar(activeIndex.value);

}
function nextImg() {
    if (activeIndex.value == sum) {
        return
    }
    activeIndex.value += 1;
    changeAvatar(activeIndex.value);
}


useHead({
    title: "国庆头像生成器",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: '国庆头像生成器,在线生成国庆头像,一键微信国庆头像生成,微信头像加五星红旗,国庆微信头像' },
        { name: 'description', content: '这是一个一键生成国庆头像的小程序，上传自己头像后可以选择合适的国庆头像样式，随后保存头像即可。' }
    ],
})
</script>
<style scoped>
.main {
    position: relative;
    overflow-x: hidden;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    background-image: url(/img/NationalDayAvatar/bg.png);
    background-repeat: no-repeat;
    background-size: cover;
}

.main .tool-logo {
    max-width: 248px;
}

.main .prev {
    background-image: url(/img/NationalDayAvatar/arrow-btn.png);
    background-size: contain;
    border-radius: 50%;
    width: 2.275rem;
    height: 2.275rem;
    margin-right: 0.75rem;
    transform: rotate(180deg);
}

.main .next {
    background-image: url(/img/NationalDayAvatar/arrow-btn.png);
    background-size: contain;
    border-radius: 50%;
    width: 2.275rem;
    height: 2.275rem;
    margin-left: 0.75rem;
}

.main .canvasAvatarBoxBorder {
    background: #fff;
    border: 0.25rem solid #fbe6b5;
    border-radius: 0.75rem;
    font-size: 0;
}

.main .canvasAvatarBox {
    border-radius: 0.5rem;
    position: relative;
    width: 9.5rem;
    height: 9.5rem;
    margin-left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
}

.main .active {
    border: 0.5rem solid #fbff00;
}
</style>