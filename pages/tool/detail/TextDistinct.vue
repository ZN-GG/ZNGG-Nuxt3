<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">文本去重</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12">
            <div class="relative">
                <p>原文本：</p>
                <textarea v-model="text" placeholder='aaa&#10;aaa&#10;bbb' autofocus
                    class="text-gray-600 w-full bg-gray-100 boder-left boder-bottom outline-none p-3"
                    rows="8"></textarea>
                <span class="absolute px-2 py-1 text-xs text-white bg-blue-500 rounded right-4 bottom-6">{{
                text.split('\n').length
                }} 行</span>
            </div>
            <div class="relative">
                <p>结果：</p>
                <textarea v-model="result" placeholder="aaa&#10;bbb"
                    class="text-gray-600 w-full bg-gray-100 boder-left boder-bottom outline-none p-3"
                    rows="8"></textarea>
                <span class="absolute px-2 py-1 text-xs text-white bg-blue-500 rounded right-4 bottom-6">{{
                result.split('\n').length
                }} 行</span>
            </div>
            <div class="flex flex-row flex-wrap">
                <button class="flex m-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg
                focus:outline-none hover:bg-gray-900 hover:shadow-none" @click="toClear()">
                    清空
                </button>
                <button class=" flex m-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg
                focus:outline-none hover:bg-gray-900 hover:shadow-none" @click="toCopy()">
                    {{ copyText }}
                </button>
            </div>
        </section>
        <section class="bg-white w-full container mx-auto  px-4 py-6">

            <article class="prose lg:prose-xl" style="max-width: none;">
                <h4>使用说明：</h4>
                <blockquote>
                    <p>文本去重工具在日常生活中真的很方便，记录人数时图方便进来一个人写一个人的名字，但是有人多次进来，就导致了一个人的名字写了两次，那么现在只需要将记录的所有人的名字都写入这个工具，则会自动去重，防止多次统计。
                    </p>
                </blockquote>
                <ul>
                    <li>你只管录入，剩下的交给工具。</li>
                    <li>使用方便，按行统计。</li>
                    <li>班级签到、聚会人数统计等生活场景。</li>
                </ul>
            </article>
        </section>
    </div>
</template>
<script setup lang="ts">

const text = ref("")
const result = ref("")
const copyText = ref("一键复制")
const { $toast } = useNuxtApp()
const uniq = (await import('lodash/uniq')).default;
const join = (await import('lodash/join')).default;


watch(text, (count, prevCount) => {
    result.value = join(uniq(text.value.split('\n')), '\n')
})


function toClear() {
    text.value = "";
}


function toCopy() {
    navigator.clipboard.writeText(result.value)
    copyText.value = "复制完成"
    $toast.success("复制完成")
    window.setTimeout(function () {
        copyText.value = "一键复制"
    }, 800)
}


useHead({
    title: "在线文本去重",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: '文本去重工具,批量去重,在线去除重复。' },
        { name: 'description', content: '在线文本去除重复工具，快速批量去重，使用场景广泛。' }
    ],
})


</script>