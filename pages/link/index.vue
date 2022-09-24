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
                    <div class="grid md:grid-cols-3 gap-6">
                        <ul class="w-full">
                            <li class="hover:bg-gray-100 hover:text-gray-700 transition duration-300 ease-in-out p-3 ">
                                <a href="https://www.qingqingblog.com/" target="_blank">
                                    <div class="flex items-start">
                                        <div class="grow">
                                            <p class="text-gray-800 font-bold mb-1">杨青青博客</p>
                                            <p class="text-gray-500">
                                                优秀女站长，高质量帝国模板创造者。
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li class="hover:bg-gray-100 hover:text-gray-700 transition duration-300 ease-in-out p-3 ">
                                <a href="https://www.usuuu.com/" target="_blank">
                                    <div class="flex items-start">
                                        <div class="grow">
                                            <p class="text-gray-800 font-bold mb-1">悠悠博客</p>
                                            <p class="text-gray-500">
                                                记录一个文艺女青年的IT之路。
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <ul class="w-full">
                            <li class="hover:bg-gray-100 hover:text-gray-700 transition duration-300 ease-in-out p-3 ">
                                <a href="https://www.aqwdzy.com/" target="_blank">
                                    <div class="flex items-start">
                                        <div class="grow">
                                            <p class="text-gray-800 font-bold mb-1">通天技术网</p>
                                            <p class="text-gray-500">
                                                聚焦前沿技术，探索行业未来。
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <ul class="w-full">
                            <li class="hover:bg-gray-100 hover:text-gray-700 transition duration-300 ease-in-out p-3 ">
                                <a href="https://hu60.cn" target="_blank">
                                    <div class="flex items-start">
                                        <div class="grow">
                                            <p class="text-gray-800 font-bold mb-1">虎绿林</p>
                                            <p class="text-gray-500">
                                                虎绿林 编程学院。
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
useHead({
    title: "友链",
    titleTemplate: (title) => `${title} - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: '友情链接，优质网站推荐' },
        { name: 'description', content: '友情链接页面，高质量网站推荐。' }
    ],
})
</script>