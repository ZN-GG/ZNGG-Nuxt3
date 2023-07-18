<template>
    <div ref="html">
        <div class="mx-auto container px-4 my-8 min-h-screen">
            <!-- 今日推荐 -->
            <!-- <div ref="container" class="bg-white p-6 rounded-md my-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <p class="font-semibold text-2xl">今日推荐</p>
                    </div>
                    <div>
                        <div class="btn-1">更多</div>
                    </div>
                </div>
            </div> -->
            <!-- 在线工具 -->
            <div class="bg-white p-6 rounded-md mt-8 mb-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <p class="font-semibold text-2xl">在线工具</p>
                    </div>
                    <div class="flex">
                        <NuxtLink to="/tool">
                            <div class="btn-1">更多</div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div class="w-full flex flex-wrap justify-between">
                <NuxtLink :to="'/tool/detail/' + item.content" v-for="(item, index) in toolList" :key="index"
                    target="_blank" class="w-4/12 md:w-2/12 flex mb-4"
                    :class="[(index + 6) % 6 == 0 ? 'md:pr-1 md:pl-0' : '', (index + 1) % 6 == 0 ? 'md:pl-1 md:pr-0' : '', ((index + 7) % 6 != 0) && ((index + 1) % 6 != 0) ? 'md:px-1' : '', (index + 2) % 3 == 0 ? 'px-1' : '', (index + 3) % 3 == 0 ? 'pr-2' : '', (index + 1) % 3 == 0 ? 'pl-2' : '']">
                    <div class="w-full relative tool-border">
                        <div class="tool-box absolute">
                            <div class="tool-icon" :style="'background-image: url(/img/' + item.image + ');'">
                            </div>
                            <p class="tool-title" v-text="item.title"></p>
                            <p class="tool-des" v-text="item.summary"></p>
                        </div>
                    </div>
                </NuxtLink>
                <div v-for="item in 11" class="w-4/12 md:w-2/12"></div>
            </div>
            <!-- 最新文章 -->
            <div class="flex flex-wrap relative">
                <div class="bg-white p-6 rounded-md mt-4 w-full lg:w-8/12" ref="leftNormalContainer">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <p class="font-semibold text-2xl">最新文章</p>
                        </div>
                        <nuxt-link to="read">
                            <div class="btn-1">更多</div>
                        </nuxt-link>
                    </div>
                    <ul>
                        <li v-for="(item, index) in articleList" :key="index" class="mt-4">
                            <div class="border-b pb-2">
                                <div class="flex relative">
                                    <div class="flex-1 mr-2">
                                        <nuxt-link target="_blank" :to="'/read/post/' + item.id">
                                            <p class=" font-semibold text-base h-8 leading-8 w-full overflow-y-hidden"
                                                v-text="item.title">
                                            </p>
                                        </nuxt-link>
                                        <p class=" custom-font-14 leading-8 overflow-hidden h-6 text-gray-400 mb-2"
                                            v-text="item.summary"></p>
                                        <ul class="flex items-center mt-6">
                                            <li class="flex items-center leading-4">
                                                <span class="flex items-center iconfont icon-browse" />
                                                <span class="custom-font-12 ml-1" v-text="item.viewCount"></span>
                                            </li>
                                            <!-- <li class="flex items-center leading-4 ml-1">
                                                <span class="flex items-center iconfont icon-good" /><span
                                                    class="custom-font-12 ml-1">1887</span>
                                            </li>
                                            <li class="flex items-center leading-4 ml-1">
                                                <span class="flex items-center iconfont icon-comments" /><span
                                                    class="custom-font-12 ml-1">1887</span>
                                            </li> -->
                                        </ul>
                                    </div>
                                    <!-- <div v-if="item.image == ''" class="flex-none w-32 h-24"></div> -->
                                    <img v-if="item.image != ''" class="w-32 h-24 right-0 object-contain" :src="item.image"
                                        alt="" srcset="" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- 广而告之 -->
                <div class="mt-4 w-full lg:w-4/12 lg:absolute lg:right-0">
                    <div class="lg:pl-6 w-full" ref="rightNormalContainer">
                        <div class="w-full py-6 rounded text-center bg-gradient-to-r from-cyan-500 to-blue-500">
                            <nuxt-link to="/nav">
                                <div class="mx-auto">
                                    <p class="text-2xl font-bold text-white">优质网址导航</p>
                                </div>
                            </nuxt-link>
                        </div>
                        <div class="w-full my-2 py-6 rounded text-center bg-gradient-to-r from-violet-500 to-fuchsia-500">
                            <nuxt-link to="/tool/detail/FlvPlayer">
                                <div class="mx-auto">
                                    <p class="text-2xl font-bold text-white">FLV播放器</p>
                                </div>
                            </nuxt-link>
                        </div>
                        <div class="w-full my-2 py-6 rounded text-center bg-gradient-to-r from-orange-500 to-fuchsia-700">
                            <nuxt-link to="/tool/detail/ScreenRec">
                                <div class="mx-auto">
                                    <p class="text-2xl font-bold text-white">PC在线录屏</p>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>

                    <div class="lg:pl-6 w-full" ref="rightNormalContainer">
                        <div class="w-full my-4 p-4 bg-white">
                            <p class="text-xl font-bold mb-4">关于我们</p>
                            <a href="http://beian.miit.gov.cn/">豫ICP备17050064号-4</a>
                        </div>
                    </div>
                    <div v-bind:style="{ width: rightFixedContainerWidth }" class="h-20 pl-6 my-4 hidden lg:block w-full"
                        ref="rightFixedContainer">
                        <div class="bg-white rounded-md p-6">
                            <div class="flex justify-between items-center">
                                <div class="flex items-center">
                                    <p class="font-semibold text-2xl">AD</p>
                                    <p class=" hidden lg:inline leading-8 mx-4 text-sm text-gray-400">
                                        悬浮小框框
                                    </p>
                                </div>
                                <div>
                                    <div class="btn-1">更多</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api } from '~/api/api';


let isRightFixedContainer = ref(false), rightFixedContainerRight = ref(0), rightFixedContainerWidth = ref("100%");
let rightNormalContainer = ref<HTMLInputElement>();
let rightFixedContainer = ref<HTMLInputElement>()

const toolList = ref<any[]>([])
const articleList = ref<any[]>([])

const { data: toolData, pending: toolPending, refresh: ToolRefresh, error: toolError } = await useAsyncData("index_GetToolList", () => api.tool.getList(1, 12, ""));
if (toolData.value!.success) {
    toolList.value = toolList.value.concat(toolData.value!.data.content)
}

const { data: articleData, pending: articlePending, refresh: ArticleRefresh, error: articleError } = await useAsyncData("index_GetArticleList", () => api.article.getList(1, 10, ""));
if (articleData.value!.success) {
    articleList.value = articleList.value.concat(articleData.value!.data.content)
}

onMounted(async () => {
    // await ToolRefresh()
    // await ArticleRefresh()
    // toolList.value = toolData.value!.data.content
    // articleList.value = articleData.value!.data.content
    window.addEventListener("scroll", handleScroll, false);
})
onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
})

function handleScroll() {
    let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    if (scrollTop > 20) {
        setFloatContainer();
    }
}



function setFloatContainer() {

    if (rightNormalContainer.value!.getBoundingClientRect().bottom <= 0) {
        rightFixedContainer.value!.style.position = "fixed";
        rightFixedContainer.value!.style.top = "5.5rem";
        rightFixedContainerWidth.value = rightNormalContainer.value!.offsetWidth + "px";
    } else if (rightNormalContainer.value!.getBoundingClientRect().bottom > 0) {
        rightFixedContainerWidth.value = "100%";
        rightFixedContainer.value!.style.top = "";
        rightFixedContainer.value!.style.position = "absolute";
    }
}

definePageMeta({
    title: 'Some Page'
})
useHead({
    title: "ZNGG在线工具",
    titleTemplate: (title) => `${title} - 持续高质量内容输出`,
    meta: [
        { name: 'Keywords', content: '前端技术分享，后端技术分享，在线小工具，设计技巧' },
        { name: 'description', content: 'ZNGG在线工具是一个持续提供高质量内容输出平台，并将输出内容转变为成果，提供各种各样的在线工具。' }
    ],
})
</script>
<style>
.RightFixedContainer-absolute {
    @apply absolute;
}

.RightFixedContainer-fixed {
    @apply fixed top-2;
}
</style>