<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">银河OS动态码</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12 h-32">
            当前动态码：<span class="font-bold" v-text="code"></span>
        </section>
        <section class="w-full container px-4 mx-auto">
            <adsbygoogle/>
        </section>
        <section class="bg-white w-full container mx-auto  px-4 py-6">

            <article class="prose lg:prose-xl" style="max-width: none;">
                <h4>使用说明：</h4>
                <blockquote>
                    <p>这是吉利银河OS车机系统进入开发者调试工具的动态码生成器，在车机内打开电话，输入这段代码即可进入。
                    </p>
                </blockquote>
                <ul>
                    <li>吉利银河OS安装第三方APP工具</li>
                    <li>本工具基于网络流传的算法</li>
                    <li>悠着点，别把车机搞成砖！</li>
                </ul>
            </article>
        </section>
    </div>
</template>
<script setup lang="ts">

const code = ref("")

setInterval(function () {
    let date = new Date();
    let hour = (date.getHours() > 12 ? date.getHours() - 12 : date.getHours())
    code.value = "#*" + (date.getMonth() + 11).toString() + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString()) + (hour < 10 ? '0' + hour : hour)
}, 100);




useHead({
    title: "银河OS动态码生成工具",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    meta: [
        { name: 'Keywords', content: '银河OS打开ADB动态码,银河OS安装第三方软件,银河车机动态码工具' },
        { name: 'description', content: '这是一个自动生成吉利银河OS进入开发者工具动态码的工具。' }
    ],
    script: [
    ]
})


</script>