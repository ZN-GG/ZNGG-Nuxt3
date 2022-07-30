<template>
    <div class="mx-auto container my-8 min-h-screen">
        <div class="bg-white p-6 rounded-md mt-8 mb-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <p class="font-semibold text-2xl">在线工具</p>
                </div>
                <div class="flex">
                    <div class="hidden md:flex">
                        <div class="btn-1" :class="categoryId == '' ? 'bg-blue-600 text-white' : ''"
                            @click="selectCategoryId('')">
                            全部
                        </div>
                        <div class="btn-1" :class="categoryId == item.id ? 'bg-blue-600 text-white' : ''"
                            v-for="(item, index) in toolCategoryList" :key="index" @click="selectCategoryId(item.id)">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex flex-wrap justify-between">
                <NuxtLink :to="'/tool/detail/' + item.content" v-for="(item, index) in toolList" :key="index"
                    class="w-4/12 md:w-2/12 flex mb-4"
                    :class="(index + 6) % 6 == 0 ? 'md:pr-1 md:pl-0' : '', (index + 1) % 6 == 0 ? 'md:pl-1 md:pr-0' : '', ((index + 7) % 6 != 0) && ((index + 1) % 6 != 0) ? 'md:px-1' : '', (index + 2) % 3 == 0 ? 'px-1' : '', (index + 3) % 3 == 0 ? 'pr-2' : '', (index + 1) % 3 == 0 ? 'pl-2' : ''">
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
        <div v-show="loading" class="w-full flex flex-wrap justify-between">
            <div v-for="(item, index) in 4" class="w-4/12 md:w-2/12 flex mb-4 animate-pulse"
                :class="(item + 5) % 6 == 0 ? 'md:pr-1 md:pl-0' : '', (item) % 6 == 0 ? 'md:pl-1 md:pr-0' : '', ((item + 6) % 6 != 0) && ((item) % 6 != 0) ? 'md:px-1' : '', (item + 1) % 3 == 0 ? 'px-1' : '', (item + 2) % 3 == 0 ? 'pr-2' : '', (item) % 3 == 0 ? 'pl-2' : ''">
                <div class="w-full relative tool-border">
                    <div class="tool-box absolute">
                        <div class="tool-icon bg-gray-200">
                        </div>
                        <p class="tool-title bg-gray-200 h-4 w-6/12"></p>
                        <p class="tool-title bg-gray-200 h-4 w-6/12"></p>
                    </div>
                </div>
            </div>
            <div v-for="item in 2" class="w-4/12 md:w-2/12"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { api } from '~/api/api';

let loading = ref(false);
let empty = ref(false);
let page = ref(2);
let categoryId = ref("")

// 初始化工具分类
let toolCategoryList = ref([])
let toolCategoryResult = await api.tool.getCategories();
toolCategoryList.value = toolCategoryResult.data;

const toolParams = ref({})

const toolList = ref([])
const { data: toolData, pending: toolPending, refresh: ToolRefresh, error: toolError } = await useAsyncData("tool_GetToolList", () => api.tool.getList(1, 24, toolParams.value));
if (toolData.value.success) {
    toolList.value = toolList.value.concat(toolData.value.data.content)
}

onMounted(async () => {
    await ToolRefresh()
    toolList.value = toolData.value.data.content
})


async function selectCategoryId(id: string) {
    page.value = 2;
    empty.value = false
    toolList.value = []
    loading.value = true
    categoryId.value = id
    if (id == "") {
        toolParams.value = {
        }
    } else {
        toolParams.value = {
            categoryId: categoryId.value
        }
    }
    await ToolRefresh();
    toolList.value = toolData.value.data.content
    loading.value = false
}


useHead({
    title: "工具",
    titleTemplate: (title) => `${title} - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: 'ZNGG在线工具,时间戳工具,在线转换工具,Json在线解析格式化' },
        { name: 'description', content: 'ZNGG在线工具是一个持续提供高质量内容输出平台，并将输出内容转变为成果，提供各种各样的在线工具。' }
    ],
})
</script>