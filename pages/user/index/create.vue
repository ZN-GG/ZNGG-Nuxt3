<template>
    <div>
        <div class="my-6 flex justify-between items-center">
            <p class="font-bold text-2xl">创作</p>
            <NuxtLink to="/writer"><button class="btn-normal">写文章</button></NuxtLink>
        </div>
        <div>
            <ul>
                <li v-for="(item, index) in articleList" :key="index" class="mt-4 border-b pb-2">
                    <div class="flex relative">
                        <div class="flex-1 mr-2">
                            <nuxt-link target="_blank" :to="'/read/post/' + item.id">
                                <p class=" font-semibold text-base h-8 leading-8 w-full overflow-y-hidden"
                                    v-text="item.title">
                                </p>
                            </nuxt-link>
                            <p class=" custom-font-14 leading-8 overflow-hidden h-6 text-gray-400 mb-2"
                                v-text="item.summary"></p>
                        </div>
                        <nuxt-link :to="'/writer?id=' + item.id" class="font-bold text-xl">编辑
                        </nuxt-link>
                    </div>
                </li>
            </ul>
        </div>
        <div class="flex justify-center my-4">
            <button v-show="page > 1" class="btn-normal mx-2" @click="pageFn(false)">上一页</button>
            <button v-show="totalPages > page" class="btn-normal mx-2" @click="pageFn(true)">下一页</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { api } from "~/api/api";
const { $toast } = useNuxtApp();
const page = ref(1)
const articleList = ref([])
const totalPages = ref(0)
const { data: articleData, pending: articlePending, refresh: ArticleRefresh, error: articleError } = await useAsyncData("index_GetArticleList", () => api.article.getUserList(1, 10, null));
if (articleData.value.success) {
    totalPages.value = articleData.value.data.totalPages
    articleList.value = articleList.value.concat(articleData.value.data.content)
}


async function pageFn(type: boolean) {
    if (!type) {
        if (page.value < 2) {
            $toast.error("没有上一页了")
            return
        }
        page.value = page.value - 1;
    } else {
        page.value = page.value + 1;
    }
    const result = (await api.article.getList(page.value, 10, null));

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

<style>

</style>