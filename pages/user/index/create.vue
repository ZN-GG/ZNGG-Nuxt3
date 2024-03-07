<template>
    <div>
        <div class="my-6 flex justify-between items-center">
            <p class="font-bold text-2xl">创作</p>
            <NuxtLink to="/writer"><button class="btn-normal">写文章</button></NuxtLink>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div style="height: 560px;">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                文章名称
                            </th>
                            <th scope="col" class="px-6 py-3">
                                阅读量
                            </th>
                            <th scope="col" class="px-6 py-3">
                                状态
                            </th>
                            <th scope="col" class="px-6 py-3">
                                操作
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in articleList" :key="index"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                style="max-width: 400px;">
                                <nuxt-link target="_blank" :to="'/read/post/' + item.id">
                                    <p class="whitespace-nowrap text-ellipsis overflow-hidden">{{ item.title }}</p>
                                </nuxt-link>
                            </th>
                            <td class="px-6 py-4">
                                {{ item.viewCount }}
                            </td>
                            <td class="px-6 py-4">
                                {{ getState(item.state) }}
                            </td>
                            <td class="px-6 py-4">
                                <nuxt-link target="_blank" :to="'/writer?id=' + item.id"
                                    class="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">编辑</nuxt-link>
                                <a href="#" class="mx-2 font-medium text-red-600 dark:text-blue-500 hover:underline">删除</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <nav class="flex items-center justify-between p-4" aria-label="Table navigation">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">共 <span
                        class="font-semibold text-gray-900 dark:text-white">{{ articleData?.data.totalElements }}</span>
                    条内容，当前{{ page }}页，共{{ totalPages }}页</span>
                <ul class="inline-flex -space-x-px text-sm h-8">
                    <li>
                        <div @click="pageFn(false)"
                            class="flex cursor-pointer items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            上一页</div>
                    </li>

                    <li>
                        <div @click="pageFn(true)"
                            class="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            下一页</div>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { api } from "~/api/api";
const { $toast } = useNuxtApp();
const page = ref(1)
const articleList = ref<any[]>([])
const totalPages = ref(0)
const { data: articleData, pending: articlePending, refresh: ArticleRefresh, error: articleError } = await useAsyncData("index_GetUserArticleList", () => api.article.getUserList(1, 10, ""));
if (articleData.value!.success) {
    totalPages.value = articleData.value!.data.totalPages
    articleList.value = articleList.value.concat(articleData.value!.data.content)
    console.log(articleData.value);

}

function getState(params: string): String {
    switch (params) {
        case '0':
            return '正常';
        case '1':
            return '草稿';
        case '2':
            return '删除';
        default:
            return '未知';
    }
}

async function pageFn(type: boolean) {
    if (!type) {
        if (page.value < 2) {
            $toast.error("没有上一页了")
            return
        }
        page.value = page.value - 1;
    } else {
        if (page.value == totalPages.value) {
            $toast.error("没有下一页了")
            return
        }
        page.value = page.value + 1;
    }
    const result = (await api.article.getUserList(page.value, 10, ""));

    if (result.success) {
        articleList.value.length = 0;
        articleList.value = articleList.value.concat(result.data.content);
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    } else if (!type) {
        page.value = page.value + 1;
    } else if (type) {
        page.value = page.value - 1;
    }
}

</script>

<style></style>