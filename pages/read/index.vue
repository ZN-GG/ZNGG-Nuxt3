<template>
    <div ref="html">
        <div class="mx-auto container my-8">
            <div class="flex flex-wrap relative">
                <div class="bg-white p-6 rounded-md mt-4 w-full lg:w-8/12" ref="leftNormalContainer">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <p class="font-semibold text-2xl">最新文章</p>
                        </div>
                        <div>
                            <div @click="showCategory()" class="relative bg-gray-100 px-3 cursor-pointer rounded-md">
                                <span class="custom-font-14 leading-8 relative inline select-none">分类
                                    <span class="iconfont icon-arrow-down inline-block"
                                        :class="isShowCategory ? 'reverse' : ''" />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div v-show="isShowCategory" :class="isShowCategory ? '' : 'hidden'"
                        class="flex py-3 space-x-4 flex-none overflow-auto">
                        <div class="btn-2" @click="selectCategoryId('')"
                            :class="categoryId == '' ? 'bg-blue-600 text-white' : ''">全部</div>
                        <div v-for="(item, index) in categoryList" :key="index" @click="selectCategoryId(item.id)"
                            class="btn-2" :class="categoryId == item.id ? 'bg-blue-600 text-white' : ''">
                            {{ item.name }}
                        </div>
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
                                    <img v-if="item.image != ''" class="w-32 h-24 right-0 object-contain"
                                        :src="item.image" alt="" srcset="" />
                                </div>
                            </div>
                            <ins v-if="index == 5" class="adsbygoogle" style="display:block" data-ad-format="fluid"
                                data-ad-layout-key="-h8-2h-1d-6s+z6" data-ad-client="ca-pub-6667301035180632"
                                data-ad-slot="6020177581"></ins>
                        </li>
                        <li v-show="empty" class="mt-4 text-center">
                            <p>到底了</p>
                        </li>
                        <div v-show="loading" class="w-full animate-pulse">

                            <div class="flex items-center mb-6">
                                <div class="w-8/12">
                                    <div class="w-10/12 h-6 bg-gray-200 my-3">
                                    </div>
                                    <div class="w-10/12 h-6 bg-gray-200 my-3">
                                    </div>
                                </div>
                                <div class="flex-1 bg-gray-200 w-2/12 md:w-1/12 h-16">
                                </div>
                            </div>
                            <div class="flex items-center mb-6">
                                <div class="w-8/12">
                                    <div class="w-10/12 h-6 bg-gray-200 my-3">
                                    </div>
                                    <div class="w-10/12 h-6 bg-gray-200 my-3">
                                    </div>
                                </div>
                                <div class="flex-1 bg-gray-200 w-2/12 md:w-1/12 h-16">
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>

                <!-- 广而告之 -->
                <div class="mt-4 hidden lg:block w-full lg:w-4/12 absolute right-0">
                    <div class="pl-6 w-full" ref="rightNormalContainer">
                        <nuxt-link to="/tool/detail/ScreenRec"><img src="/ad/ScreenRecAD.jpg" alt="" srcset="">
                        </nuxt-link>
                        <nuxt-link to="/tool/detail/Nplayer" class="block mt-4"><img src="/ad/NplayerAD.jpg" alt=""
                                srcset=""></nuxt-link>
                    </div>
                    <div v-bind:style="{
                        width: rightFixedContainerWidth,
                    }" class="h-20 pl-6 my-4 hidden lg:block w-full" ref="rightFixedContainer">
                        <div class="bg-white rounded-md p-6">
                            <div class="flex justify-between items-center">
                                <div class="flex items-center">
                                    <p class="font-semibold text-2xl">AD</p>
                                    <p class=" hidden lg:inline leading-8 mx-4 text-sm text-gray-400 ">
                                        广而告之
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
import { api } from "~/api/api";

let isShowCategory = ref(true);
let rightFixedContainerWidth = ref("100%");
let loading = ref(false);
let empty = ref(false);
let page = ref(2);
let size = ref(10);
let categoryId = ref("")
const articleParams = ref("")
let articleList = ref<any[]>([])
let categoryList = ref<any[]>([])
let rightNormalContainer = ref<HTMLInputElement>();
let rightFixedContainer = ref<HTMLInputElement>()

let categoryResult = await api.article.getCategories();
categoryList.value = categoryResult.data;

const { data: articleData, pending, refresh, error } = await useAsyncData("read_GetList", () => api.article.getList(1, 10, articleParams.value));
if (articleData.value!.success) {
    articleList.value = articleList.value.concat(articleData.value!.data.content)
}

onMounted(async () => {
    await refresh()
    articleList.value = articleData.value!.data.content
    window.addEventListener("scroll", handleScroll, false);

    //@ts-ignore
    (adsbygoogle = window.adsbygoogle || []).push({});
})

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
})

async function selectCategoryId(id: string) {
    page.value = 2;
    empty.value = false
    articleList.value = []
    loading.value = true
    categoryId.value = id
    if (id == "") {
        articleParams.value = "";
    } else {
        articleParams.value = categoryId.value;
    }
    await refresh();
    articleList.value = articleData.value!.data.content
    loading.value = false
}

function setFloatContainer() {
    if (rightNormalContainer.value!.getBoundingClientRect().bottom <= 0) {
        rightFixedContainer.value!.style.position = "fixed";
        rightFixedContainer.value!.style.top = "0.5rem";
        rightFixedContainerWidth.value = rightNormalContainer.value!.offsetWidth + "px";
    } else if (rightNormalContainer.value!.getBoundingClientRect().bottom > 0) {
        rightFixedContainerWidth.value = "100%";
        rightFixedContainer.value!.style.top = "";
        rightFixedContainer.value!.style.position = "absolute";
    }
}
function handleScroll() {
    let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    if (scrollTop > 20) {
        setFloatContainer();
    }
    let documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
    );
    if (documentHeight - scrollTop - window.innerHeight < 60 && !empty.value) {
        loadMore();
    }
}


function showCategory() {
    isShowCategory.value = !isShowCategory.value;
}

async function loadMore() {
    if (loading.value) {
        return;
    }
    loading.value = true;
    const result = (await api.article.getList(page.value, 10, ""));
    if (result.success) {
        if (result.data.content.length == 0) {
            empty.value = true;
        }
        articleList.value = articleList.value.concat(result.data.content);
        page.value = page.value + 1;
    }
    loading.value = false;
}


useHead({
    title: "文章",
    titleTemplate: (title) => `${title} - ZNGG在线工具`,
    meta: [
        { name: 'Keywords', content: 'ZNGG在线工具文章,IT文章分享,高质量内容输出,高质量文章分享' },
        { name: 'description', content: 'ZNGG在线工具是一个持续提供高质量内容输出平台，并将输出内容转变为成果，提供各种各样的在线工具。' }
    ],
    script: [
        { async: "true", src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6667301035180632', crossorigin: "anonymous" }
    ]
})
</script>

<style>
.RightFixedContainer-absolute {
    @apply absolute;
}

.RightFixedContainer-fixed {
    @apply fixed top-2;
}

.border-t-1 {
    border-top-width: 1px;
}

.icon-arrow-down {
    @apply duration-100;
}

.reverse {
    transform: rotate(180deg);
}
</style>
