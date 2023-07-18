<template>
    <div ref="html">
        <div class="mx-auto container my-8">
            <div class="flex flex-wrap relative">
                <div class="bg-white p-6 rounded-md mt-4 w-full lg:w-8/12">
                    <div v-if="isSuccess" class="">
                        <div class="">
                            <h1 class="font-semibold w-full text-xl lg:text-3xl">
                                {{ article.title }}
                            </h1>
                            <div class="flex py-4 w-fll justify-between items-center">
                                <div class="flex items-center">
                                    <img :src="article.user.avatar" class="w-10 h-10 rounded-full" />
                                    <div class="ml-2">
                                        <p class="custom-font-16" v-text="article.user.name"></p>
                                        <p class="custom-font-14 text-gray-500">
                                            {{ article.updateTime }}&nbsp;&nbsp;&nbsp;&nbsp;<span
                                                class="block md:inline-block">阅读：{{ article.viewCount }}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="">
                                    <a href="#">
                                        <p class="btn-2 w-auto">{{ article.category.name }}</p>
                                    </a>
                                </div>
                            </div>
                            <div v-show="!isSuccessViewer && !isSpeader" class="block w-full animate-pulse">
                                <div class="flex mt-6 mb-2">
                                    <div class="w-2/12"></div>
                                    <div class="w-10/12 h-6 bg-gray-200">
                                    </div>
                                </div>
                                <div class="w-full h-6 bg-gray-200 my-6">
                                </div>
                                <div class="w-full h-64 bg-gray-200 my-6">
                                </div>
                                <div class="w-full h-6 bg-gray-200 my-6">
                                </div>
                                <div class="w-8/12 h-6 bg-gray-200 my-6">
                                </div>
                            </div>
                            <div v-if="isSpeader" v-is="'style'">{{ themes.juejin.style }}</div>
                            <div v-show="isSpeader" class="markdown-body overflow-auto"
                                v-bind:class="isSpeader ? '' : 'opacity-0'" v-html="mdHTMl"></div>

                            <Viewer v-show="isSuccessViewer" v-if="isRender && !isSpeader" id="markdown-body"
                                :value="articleHtmlContent" :plugins="plugins" @change="handleChange" />

                        </div>
                    </div>
                    <div class="h-80 relative" v-else>
                        <div class="absolute empty items-center text-2xl">
                            <span class="iconfont icon-cry" style="font-size: 24px" />
                            <p class="text-gray-700">没有找到该文章！</p>
                            <p>
                                <a href="/" class="text-blue-600 custom-font-14 my-4">返回首页</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-md mt-4 w-full lg:w-8/12">
                    <div v-if="isSuccess" class="">
                        <div class="">
                            <p class="font-bold text-xl my-2">评论</p>
                            <div class="flex w-fll justify-between items-center mt-4">
                                <div class="flex w-full">
                                    <img :src="article.user.avatar" class="w-10 h-10 rounded-full" />
                                    <div class="w-full px-4">
                                        <div contenteditable="true"
                                            class=" w-full min-h-20 bg-gray-50 border-0 border-transparent focus:outline-none custom-font-14 text-gray-600 p-2 ">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 hidden lg:block w-full lg:w-4/12 absolute right-0">
                    <div class="pl-6 w-full" ref="rightNormalContainer">
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
                        <div class="blick mt-4">
                            <adsbygoogle />
                        </div>
                    </div>

                    <div v-bind:style="{
                        width: rightFixedContainerWidth,
                    }" class="h-20 pl-6 my-4 hidden lg:block w-full" ref="rightFixedContainer">
                        <div v-show="docMenu.length > 0" class="bg-white rounded-md">
                            <div class="flex justify-between items-center p-6">
                                <div class="flex items-center">
                                    <p class="font-semibold text-2xl">目录</p>
                                    <p class="
                      hidden
                      lg:inline
                      leading-8
                      mx-4
                      text-sm text-gray-400
                    ">
                                        Contents
                                    </p>
                                </div>
                            </div>
                            <hr class="mx-6" />
                            <div>
                                <ul class="article-contents overflow-y-auto py-2 px-6" ref="articleContents">
                                    <li v-for="(item, index) in docMenu" :key="item.id" :class="`level_${item.level}`"
                                        class="leading-9 relative">
                                        <a :href="'#' + item.id" :class="{ 'text-blue-600 active': tocActive === index }">{{
                                            item.text }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { api } from "../../../api/api";


import "highlight.js/styles/atom-one-dark.css";
//import "~/assets/fonts/katex.min.css";

const { Viewer } = await import("@bytemd/vue-next");


// import { Viewer } from '@bytemd/vue-next';
const breaks = (await import('@bytemd/plugin-breaks')).default;
const gemoji = (await import('@bytemd/plugin-gemoji')).default;
const gfm = (await import('@bytemd/plugin-gfm')).default;
const highlight = (await import('@bytemd/plugin-highlight')).default;
const math = (await import('@bytemd/plugin-math-ssr')).default;
const medium = (await import('@bytemd/plugin-medium-zoom')).default;
const mermaid = (await import('@bytemd/plugin-mermaid')).default;
const frontmatter = (await import('@bytemd/plugin-frontmatter')).default;
const { marked } = await import('marked');

const themes = (await import('~/assets/theme')).themes;

const isSuccess = ref(false)
const isSuccessViewer = ref(false)
const isRender = ref(false)
const scrollToTop = ref(true);
const rightFixedContainerWidth = ref("100%");
const docMenu = ref<any[]>([]);
const tocActive = ref(0);
const route = useRoute()
let rightNormalContainer = ref<HTMLInputElement>();
let rightFixedContainer = ref<HTMLInputElement>()
let articleContents = ref<HTMLInputElement>()
const isSpeader = ref(false)
const headers = useRequestHeaders();
const userAgent = headers?.["user-agent"] ?? navigator.userAgent;

const article = ref()
const plugins = [
    breaks(),
    frontmatter(),
    {

        viewerEffect({ file }) {
            if (typeof (file.value) != "object") {
                return
            }
            let theme = "juejin";
            const $style = document.createElement('style');

            try {
                $style.innerHTML = themes[file.value.frontmatter.theme]?.style ?? themes.juejin.style;
            } catch (e) {
                $style.innerHTML = themes.juejin.style;
            }

            document.head.appendChild($style);
            return () => {
                $style.remove();
            };
        },
    },
    gemoji(),
    gfm(),
    highlight(),
    math(),
    medium(),
    mermaid(),
];
const articleHtmlContent = ref()
let mdHTMl = ""
const { data: articleData, pending, refresh, error } = await useAsyncData("read_Detail", () => api.article.getDetail((route.params.id).toString()));
if (articleData.value!.success) {
    mdHTMl = marked.parse(articleData.value!.data.content);
    article.value = articleData.value!.data
    isSuccess.value = true;
    if (userAgent.indexOf("Baiduspider") != -1) {
        isSpeader.value = true
    }
}
onMounted(() => {

    if (articleData.value?.success) {
        handleChange(article.value.content)
        isRender.value = true;
        isSuccessViewer.value = true;
    }
    window.addEventListener("scroll", handleScroll, false); // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
    setTimeout(() => {
        initTop();
    }, 1);

})
onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
})

function initTop() {
    // 生成目录
    let markMenu = [];
    const articleDom = document.querySelector("#markdown-body");
    //console.log(articleDom);

    if (articleDom) {
        for (let ele of articleDom.children) {
            const i = ["h1", "h2", "h3", "h4", "h5", "h6"].indexOf(
                ele.tagName.toLowerCase()
            );
            if (i > -1 && ele.textContent) {
                ele.setAttribute("id", "markMenu_" + markMenu.length);
                ele.setAttribute("name", "markMenu_" + markMenu.length);
                markMenu.push({
                    level: i,
                    text: ele.textContent,
                    id: "markMenu_" + markMenu.length,
                    name: "markMenu_" + markMenu.length,
                });
            }
        }
    }
    //docMenu为目录数据
    docMenu.value = markMenu;
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
function handleScroll() {
    let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

    if (scrollTop > 20) {
        setFloatContainer();
        setContentsActive();
    }
}
function handleChange(v: any) {
    articleHtmlContent.value = v;
}

function setContentsActive() {
    // 获取所有锚点元素
    const titleNavList = document.querySelectorAll(
        "#markdown-body h1,#markdown-body h2,#markdown-body h3,#markdown-body h4,#markdown-body h5,#markdown-body h6"
    );

    // 计算所有锚点元素的 offsetTop 的高度
    const offsetTopList: any[] = [];
    titleNavList.forEach((item) => {
        offsetTopList.push((item as any).offsetTop);
    });

    // 获取当前文档流的 scrollTop
    const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    // 定义当前所在的目录下标
    let navIndex = 0;
    // 比较当前文章滚动的距离scrollTop与各锚点标题的offsetTop ,当scrollTop超过当前元素的scrollTop,则定位到当前标题
    for (let n = 0; n < offsetTopList.length; n++) {
        if (scrollTop >= offsetTopList[n]) {
            navIndex = n;
        }
    }
    //当前高亮的目录索引,默认为0
    tocActive.value = navIndex;

    let cateList = Array.prototype.slice.call(
        articleContents.value!.querySelectorAll("li")
    );
    for (let i = 0; i < cateList.length; i++) {
        if (navIndex === i) {
            const top = getElementTop(
                cateList[i],
                articleContents.value!
            );
            articleContents.value!.scrollTop =
                top - articleContents.value!.offsetHeight / 2;
        }
    }
}
function getElementTop(el: { offsetTop: any; }, by: HTMLInputElement) {
    let top = el.offsetTop;
    if (by) {
        top = top - by.offsetTop;
    }
    return top;
}


useHead({
    title: isSuccess.value ? article.value.title : "文章不存在",
    titleTemplate: (title) => `${title} - 文章 - ZNGG在线工具`,
    meta: [
        { name: 'Keywords', content: '前端技术分享，后端技术分享，在线小工具，设计技巧' },
        { name: 'description', content: isSuccess.value ? article.value.summary : 'ZNGG在线工具是一个持续提供高质量内容输出平台，并将输出内容转变为成果，提供各种各样的在线工具。' }
    ],
    link: [
        { rel: 'stylesheet', href: '/fonts/katex.min.css' },
        { rel: 'stylesheet', href: '/css/bytemd.css' }
    ],
    script: [
    ]
})
</script>

<style scoped>
.container {
    width: 100%;
    padding-right: 1rem
        /* 16px */
    ;
    padding-left: 1rem
        /* 16px */
    ;
}



@media (min-width: 640px) {
    .container {
        max-width: 640px;
        padding-right: 2rem
            /* 32px */
        ;
        padding-left: 2rem
            /* 32px */
        ;
    }
}

@media (min-width: 768px) {
    .container {
        max-width: 768px;
    }
}

@media (min-width: 1024px) {
    .container {
        max-width: 1024px;
        padding-right: 4rem
            /* 64px */
        ;
        padding-left: 4rem
            /* 64px */
        ;
    }
}

.container {
    max-width: 1236px;
}

.empty {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.article-contents {
    max-height: 460px;
}

.article-contents::-webkit-scrollbar {
    width: 6px;
    height: 80px;
}

.article-contents::-webkit-scrollbar-track {
    box-shadow: none;
    border-radius: 4px;
}

.article-contents::-webkit-scrollbar-thumb {
    background-color: #e4e6eb;
    outline: none;
    border-radius: 4px;
}

.article-contents .level_1 {
    padding-left: 10px;
}

.article-contents .level_2 {
    padding-left: 20px;
}

.article-contents .level_3 {
    padding-left: 30px;
}

.article-contents .level_4 {
    padding-left: 40px;
}

.article-contents .level_5 {
    padding-left: 50px;
}

.article-contents .level_6 {
    padding-left: 60px;
}

.article-contents .active:before {
    content: "";
    position: absolute;
    left: -25px;
    margin-top: 10px;
    width: 4px;
    height: 16px;
    background: #1e80ff;
    border-radius: 0 4px 4px 0;
}
</style>
