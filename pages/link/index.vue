<template>
    <div class="bg-white min-h-screen">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <p class="text-2xl text-black">友情链接</p>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="container px-4 mx-auto">
                <div class="py-5">
                    <ul class="w-full flex flex-wrap">
                        <li v-for="item in friendLinks?.data" class="w-full md:w-4/12">
                            <div class="hover:bg-gray-100 hover:text-gray-700 transition duration-300 ease-in-out p-3">
                                <a :href="item.url" target="_blank">
                                    <div class="flex items-start">
                                        <div class="grow">
                                            <p class="text-gray-800 font-bold mb-1">{{ item.name }}</p>
                                            <p class="text-gray-500">
                                                {{ item.description }}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { api } from "~/api/api";

const { data: friendLinks, pending, refresh, error } = await useAsyncData("web_FriendLinks", () => api.web.getFriendLinks());
if (friendLinks.value!.success) {
    console.log(friendLinks.value);
    
}

useHead({
    title: "友链",
    titleTemplate: (title) => `${title} - ZNGG在线工具`,
    meta: [
        { name: 'Keywords', content: '友情链接，优质网站推荐' },
        { name: 'description', content: '友情链接页面，高质量网站推荐。' }
    ],
})
</script>