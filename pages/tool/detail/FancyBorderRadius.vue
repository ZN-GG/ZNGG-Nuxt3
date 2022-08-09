<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">CSS边框可视化</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12">
            <div class="flex flex-wrap">
                <div class="w-full md:w-5/12 px-6 mb-6">
                    <div class="core-box" ref="coreBox">
                        <div class="core-shape"
                            :style="'border-radius: ' + config.top + '% ' + (100 - config.top) + '% ' + (100 - config.bottom) + '% ' + config.bottom + '% / ' + config.left + '% ' + config.right + '% ' + (100 - config.right) + '% ' + (100 - config.left) + '%;' + 'background-image:' + bgColor">
                        </div>
                        <span class="core-btn" ref="btnLeft" id="left" :style="'top: ' + config.left + '%;'"></span>
                        <span class="core-btn" ref="btnTop" id="top" :style="'left:' + config.top + '%;'"></span>
                        <span class="core-btn" ref="btnRight" id="right" :style="'top: ' + config.right + '%;'"></span>
                        <span class="core-btn" ref="btnBottom" id="bottom"
                            :style="'left: ' + config.bottom + '%;'"></span>
                    </div>
                </div>
                <div class="w-full md:w-7/12 md:pl-8">
                    <div class="flex flex-wrap mb-6">
                        <h2 class="w-full font-semibold text-gray-900">选择背景颜色：</h2>
                        <div class="flex">
                            <div class="w-8 h-8 mr-2" @click="setBackground"
                                style="background-image: linear-gradient(90deg, rgb(2, 0, 36) 0%, rgb(9, 9, 121) 31%, rgb(0, 212, 255) 100%);">
                            </div>
                            <div class="w-8 h-8 mr-2" @click="setBackground"
                                style="background-image: linear-gradient(0deg, rgb(34, 193, 195) 0%, rgb(253, 187, 45) 100%);">
                            </div>
                            <div class="w-8 h-8 mr-2" @click="setBackground"
                                style="background-image: radial-gradient(circle, rgb(63, 94, 251) 0%, rgb(252, 70, 107) 100%);">
                            </div>
                            <div class="w-8 h-8 mr-2" @click="setBackground"
                                style="background-image: linear-gradient(90deg, rgb(131, 58, 180) 0%, rgb(253, 29, 29) 50%, rgb(252, 176, 69) 100%);">
                            </div>
                            <div class="w-8 h-8 mr-2" @click="setBackground"
                                style="background-image: radial-gradient(circle, rgb(238, 174, 202) 0%, rgb(148, 187, 233) 100%);">
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap mb-4">
                        <h2 class="w-full font-semibold text-gray-900">当前边框样式：</h2>
                        <div class="flex my-1 w-full">
                            <p disabled class="bg-gray-100 outline-none p-2 w-auto font-bold"
                                v-text="'border-radius: ' + config.top + '% ' + (100 - config.top) + '% ' + (100 - config.bottom) + '% ' + config.bottom + '% / ' + config.left + '% ' + config.right + '% ' + (100 - config.right) + '% ' + (100 - config.left) + '%;'">
                            </p>
                        </div>
                        <button type="button" @click="toCopy()"
                            class="flex mr-2 py-2 px-4 my-2 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                            复制
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
                    <p>随意拖拽定制CSS边框形状的小工具，前端必备工具之一。
                    </p>
                </blockquote>
                <ul>
                    <li>前端CSS拖拽式边框生成，效率提升99%。</li>
                    <li>CSS绘制圆形，CSS绘制椭圆，CSS绘制雨滴，CSS绘制扇形等各种形状。</li>
                    <li>灵感来源：https://github.com/9elements/fancy-border-radius。</li>
                </ul>
            </article>
        </section>
    </div>
</template>
<script setup lang="ts">
const { $toast } = useNuxtApp()
const coreBox = ref<HTMLDivElement>(null)
const btnTop = ref<HTMLSpanElement>(null)
const btnLeft = ref<HTMLSpanElement>(null)
const btnBottom = ref<HTMLSpanElement>(null)
const btnRight = ref<HTMLSpanElement>(null)
const bgColor = ref("")
const config = ref({
    left: 30,
    top: 34,
    right: 73,
    bottom: 30
})

const dragConfig = ref({
    v: false,
    type: "",
    lastXY: 0,
    base: 1.0,
    baseP: 0.0,
})

onMounted(() => {
    btnTop.value.addEventListener("mousedown", (event) => {
        if (event.button == 0) {
            dragConfig.value.v = false;
            dragConfig.value.type = 't';
            dragConfig.value.lastXY = event.clientX;
            let l = coreBox.value.clientWidth + 4
            dragConfig.value.base = 100 / l;
            dragConfig.value.baseP = config.value.top
            window.addEventListener("mousemove", moved);
            event.preventDefault();
        }
    });
    btnTop.value.addEventListener("touchstart", (event: any) => {
        dragConfig.value.v = false;
        dragConfig.value.type = 't';
        dragConfig.value.lastXY = event.changedTouches[0].clientX;
        let l = coreBox.value.clientWidth + 4
        dragConfig.value.base = 100 / l;
        dragConfig.value.baseP = config.value.top
        window.addEventListener("touchmove", moved);
        event.preventDefault();
    });
    btnBottom.value.addEventListener("mousedown", (event) => {
        if (event.button == 0) {
            dragConfig.value.v = false;
            dragConfig.value.type = 'b';
            dragConfig.value.lastXY = event.clientX;
            let l = coreBox.value.clientWidth + 4
            dragConfig.value.base = 100 / l;
            dragConfig.value.baseP = config.value.bottom
            window.addEventListener("mousemove", moved);
            event.preventDefault();
        }
    });
    btnBottom.value.addEventListener("touchstart", (event: any) => {
        dragConfig.value.v = false;
        dragConfig.value.type = 'b';
        dragConfig.value.lastXY = event.changedTouches[0].clientX;
        let l = coreBox.value.clientWidth + 4
        dragConfig.value.base = 100 / l;
        dragConfig.value.baseP = config.value.bottom
        window.addEventListener("touchmove", moved);
        event.preventDefault();
    });
    btnLeft.value.addEventListener("mousedown", (event) => {
        if (event.button == 0) {
            dragConfig.value.v = true;
            dragConfig.value.type = 'l';
            dragConfig.value.lastXY = event.clientY;
            let l = coreBox.value.clientHeight + 4
            dragConfig.value.base = 100 / l;
            dragConfig.value.baseP = config.value.left
            window.addEventListener("mousemove", moved);
            event.preventDefault();
        }
    });
    btnLeft.value.addEventListener("touchstart", (event: any) => {
        dragConfig.value.v = true;
        dragConfig.value.type = 'l';
        dragConfig.value.lastXY = event.changedTouches[0].clientY;
        let l = coreBox.value.clientHeight + 4
        dragConfig.value.base = 100 / l;
        dragConfig.value.baseP = config.value.left
        window.addEventListener("touchmove", moved);
        event.preventDefault();
    });
    btnRight.value.addEventListener("mousedown", (event) => {
        if (event.button == 0) {
            dragConfig.value.v = true;
            dragConfig.value.type = 'r';
            dragConfig.value.lastXY = event.clientY;
            let l = coreBox.value.clientHeight + 4
            dragConfig.value.base = 100 / l;
            dragConfig.value.baseP = config.value.right
            window.addEventListener("mousemove", moved);
            event.preventDefault();
        }
    });
    btnRight.value.addEventListener("touchstart", (event: any) => {
        dragConfig.value.v = true;
        dragConfig.value.type = 'r';
        dragConfig.value.lastXY = event.changedTouches[0].clientY;
        let l = coreBox.value.clientHeight + 4
        dragConfig.value.base = 100 / l;
        dragConfig.value.baseP = config.value.right
        window.addEventListener("touchmove", moved);
        event.preventDefault();
    });
})

function moved(event) {
    let dist = 0.0;
    if (event.buttons == 0) {
        window.removeEventListener("mousemove", moved);
    } else {
        if (dragConfig.value.v) {
            if (event.type == 'touchmove') {
                dist = event.changedTouches[0].clientY - dragConfig.value.lastXY;
            } else {
                dist = event.clientY - dragConfig.value.lastXY;
            }
        } else {

            if (event.type == 'touchmove') {
                dist = event.changedTouches[0].clientX - dragConfig.value.lastXY;
            } else {
                dist = event.clientX - dragConfig.value.lastXY;
            }
        }
        let r = dragConfig.value.baseP + dragConfig.value.base * dist
        r = r < 0 ? 0 : (r > 100 ? 100 : r);

        if (dragConfig.value.type == 't') {
            config.value.top = (0 | r)
        } else if (dragConfig.value.type == 'b') {
            config.value.bottom = (0 | r)
        } else if (dragConfig.value.type == 'l') {
            config.value.left = (0 | r)
        } else if (dragConfig.value.type == 'r') {
            config.value.right = (0 | r)
        }
    }
}

function setBackground(e) {
    bgColor.value = e.srcElement.style.backgroundImage
}


function toCopy() {
    navigator.clipboard.writeText('border-radius: ' + config.value.top + '% ' + (100 - config.value.top) + '% ' + (100 - config.value.bottom) + '% ' + config.value.bottom + '% / ' + config.value.left + '% ' + config.value.right + '% ' + (100 - config.value.right) + '% ' + (100 - config.value.left) + '%;')
    $toast.success("复制成功")
}


useHead({
    title: "CSS边框可视化",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: 'CSS边框可视化,CSS花式边框,CSS花式背景,css不规则背景,CSS边框可视化,自定义css边框样式' },
        { name: 'description', content: '拖拽式可视化调整CSS边框样式，前端程序员必备的工具之一。css扇形背景、css圆角边框、css雨滴形状等自定义样式一键生成。' }
    ],
})
</script>

<style scoped>
.core-box {
    width: 100%;
    padding-bottom: 100%;
    border: 2px dashed rgba(32, 32, 32, 0.4);
    position: relative;
    z-index: 3;
    margin-left: auto;
    margin-right: auto;
}

.core-shape {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #f09;
    background-image: linear-gradient(45deg, #23ae3a 0%, rgb(88, 123, 236) 100%);
}


.core-btn {
    display: block;
    position: absolute;
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem
}

.core-btn:before {
    content: "";
    position: absolute;
    width: 1rem;
    height: 1rem;
    left: .75rem;
    top: .75rem;
    background: #fff;
    border: 2px solid #002;
    transition: box-shadow 0.2s ease-out;
    will-change: box-shadow
}

.core-btn.active:before,
.core-btn:hover:before {
    background: #0ff;
    box-shadow: 0 0 0 4px #FFF;
    border: 2px solid #002
}

.core-box #top {
    top: -1.25rem;
    left: 30%;
    transform: translateX(-50%)
}

.core-box #bottom {
    bottom: -1.25rem;
    left: 30%;
    transform: translateX(-50%)
}

.core-box #left {
    left: -1.25rem;
    top: 30%;
    transform: translateY(-50%)
}

.core-box #right {
    right: -1.25rem;
    top: 30%;
    transform: translateY(-50%)
}
</style>