<template>
    <div class="w-full bg-slate-50 h-screen relative">
        <div v-show="relaseCardShow" class="relaseCard w-screen h-screen fixed t-0 l-0 z-40">
            <div class="flex items-center h-screen">
                <div class="card bg-white mx-auto px-4 border-2">
                    <div>
                        <p class="text-xl font-bold my-4">发布文章</p>
                    </div>
                    <hr>
                    <div class="flex my-4">
                        <div class="w-20 text-right mr-3">
                            <span class="text-red-500">*</span> 分类:
                        </div>
                        <ul class="flex-1">
                            <li v-for="(item, index) in categoryList" :key="index" @click="selectCategory(item.id)"
                                class="inline-block mr-2 mb-3 px-2 bg-slate-100 text-gray-400 cursor-pointer w-24 h-7 text-center leading-7 custom-font-14 whitespace-nowrap"
                                :class="item.id == article.category_id ? 'text-blue-500 bg-blue-100' : ''">
                                {{ item.name }}
                            </li>
                        </ul>
                    </div>
                    <div class="flex my-4">
                        <div class="w-20 text-right mr-3">
                            封面:
                        </div>
                        <div class="relative w-20 h-10 cursor-pointer overflow-hidden">
                            <button class="w-20 h-10 bg-blue-400 text-white rounded">上传图片</button>
                            <input class="w-20 h-20 absolute cursor-pointer opacity-90 bottom-0 left-0" type="file"
                                id="file" multiple @change="uploadImageCover">
                        </div>
                        <img class="w-32 h-16 mx-4" v-show="article.image.length > 0" :src="article.image" />

                    </div>
                    <div class="flex my-4">
                        <div class="w-20 text-right mr-3">
                            <span class="text-red-500">*</span> 摘要:
                        </div>
                        <textarea v-model="article.summary" class="w-64 h-16 border-2 outline-none p-2"></textarea>
                    </div>
                    <div class="flex my-4">
                        <div class="w-20 text-right mr-3">
                            状态:
                        </div>
                        <div><select v-model="article.state"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="0">发布</option>
                                <option value="1">草稿</option>
                            </select></div>
                    </div>
                    <hr>
                    <div class="flex justify-end">
                        <button @click="close()"
                            class="mx-1 px-4 custom-text-14 py-1 my-4 border-2 border-blue-400 text-blue-400 rounded">取消</button>
                        <button @click="postArticle()"
                            class="mx-1 px-4 custom-text-14 py-1 my-4 bg-blue-400 text-white rounded">发布</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex border-solid border-b-2 px-4 bg-white py-3 items-center h-16">
            <input v-model="article.title" class="flex-1 border-none outline-none text-2xl py-2 px-6 font-bold" type="text"
                placeholder="输入文章标题...">
            <button @click="open()" class="btn-normal bg-blue-500 px-5 mx-4 h-9">发布</button>
        </div>
        <div>
            <Editor :locale="zhHans" :uploadImages="uploadImage" :value="article.content" :plugins="plugins"
                @change="handleChange" />
        </div>

    </div>
</template>
<script setup lang="ts">
// import { Editor } from '@bytemd/vue-next'

import "highlight.js/styles/atom-one-dark.css";
import zhHans from 'bytemd/locales/zh_Hans.json';
import { api } from '~/api/api';
import router from "~~/plugins/router";
import { dataToEsm } from "@rollup/pluginutils";

const { Editor } = await import("@bytemd/vue-next");

const breaks = (await import('@bytemd/plugin-breaks')).default;
const gemoji = (await import('@bytemd/plugin-gemoji')).default;
const gfm = (await import('@bytemd/plugin-gfm')).default;
const highlight = (await import('@bytemd/plugin-highlight')).default;
const math = (await import('@bytemd/plugin-math-ssr')).default;
const medium = (await import('@bytemd/plugin-medium-zoom')).default;
const mermaid = (await import('@bytemd/plugin-mermaid')).default;
const frontmatter = (await import('@bytemd/plugin-frontmatter')).default;
const themes = (await import('~/assets/theme')).themes;
const route = useRoute()
const { $toast } = useNuxtApp();
const categoryList = ref<any[]>([])
const article = ref({
    id: "",
    title: "",
    category_id: "",
    state:"0",
    image: "",
    content: "",
    type: 1,
    summary: "",
    labels: ""
})
const edit = ref(false)
const relaseCardShow = ref(false)
const plugins = [
    breaks(),
    frontmatter(),
    {
        //@ts-ignore
        viewerEffect({ file }) {
            if (typeof (file.value) != "string") {
                return
            }
            let theme = "juejin";
            const $style = document.createElement('style');

            try {
                //@ts-ignore
                $style.innerHTML = themes[file.frontmatter.theme]?.style ?? themes.juejin.style;
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

    // Add more plugins here
];


if (route.query.id) {
    const { data: articleData, pending, refresh, error } = await useAsyncData("editor_Detail", () => api.article.getDetail((route.query.id!).toString()));
    if (articleData.value!.success) {
        article.value.id = articleData.value!.data.id
        article.value.title = articleData.value!.data.title
        article.value.category_id = articleData.value!.data.category_id
        article.value.image = articleData.value!.data.image
        article.value.content = articleData.value!.data.content
        article.value.type = articleData.value!.data.type
        article.value.summary = articleData.value!.data.summary
        article.value.labels = articleData.value!.data.labels
        edit.value = true;
    }

} else {
    edit.value = false;
}


definePageMeta({
    layout: 'empty',
    middleware: ['auth']
})

useHead({
    title: "写作",
    titleTemplate: (title) => `${title} - ZNGG在线工具`,
    meta: [
        { name: 'Keywords', content: '前端技术分享，后端技术分享，在线小工具，设计技巧' },
        { name: 'description', content: 'ZNGG在线工具是一个持续提供高质量内容输出平台，并将输出内容转变为成果，提供各种各样的在线工具。' }
    ],
    link: [
        { rel: 'stylesheet', href: '/fonts/katex.min.css' },
        { rel: 'stylesheet', href: '/css/bytemd.css' }
    ],
    style: [{ children: '.bytemd { height: calc(100vh - 4rem); }' }]

})

let categoryResult = await api.article.getCategories();
categoryList.value = categoryResult.data;

function handleChange(v: string) {
    article.value.content = v;
}

async function postArticle() {
    if (article.value.title == "") {
        $toast.error("请输入标题")
        return
    }
    if (article.value.content == "") {
        $toast.error("请输入内容")
        return
    }
    if (article.value.category_id == "") {
        $toast.error("请选择分类")
        return
    }
    if (article.value.summary == "") {
        $toast.error("请填写摘要")
        return
    }
    let result: ApiResponse;
    if (edit.value) {
        result = await api.article.updateArticle(article.value)
    } else {
        result = await api.article.postArticle(article.value)
    }
    if (result.success) {
        $toast.success("发布成功")
        navigateTo("/user/create")
        return
    } else {
        $toast.error("发布失败")
        return

    }


}

function selectCategory(id: string) {
    article.value.category_id = id;
}



async function uploadImage(file: (string | Blob)[]) {
    const formData = new FormData();
    formData.append('file', file[0]);
    const result = await api.upload.uploadImage(formData)
    console.log(result)

    return [
        {
            title: result.message,
            url: 'https://cdn.zngg.net/upload/image/' + result.message
        }
    ]
}

async function uploadImageCover(event: any) {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    const result = await api.upload.uploadImageCover(formData)
    console.log(result)
    article.value.image = 'https://cdn.zngg.net/upload/image/cover/' + result.message
}


function open() {
    relaseCardShow.value = true;
}
function close() {
    relaseCardShow.value = false;

}

</script>
<style>
.relaseCard {
    background: rgba(0, 0, 0, 0.25);
}

.relaseCard .card {
    width: 560px;
}
</style>