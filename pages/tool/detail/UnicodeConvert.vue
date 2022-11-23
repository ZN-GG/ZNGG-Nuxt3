<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">Unicode中文转换</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12">
            <div class="w-full flex flex-wrap">
                <div class="relative w-full md:w-6/12 md:pr-2">
                    <div class="relative">
                        <textarea v-model="text" autofocus
                            class="text-gray-600 w-full bg-gray-100 boder-left boder-bottom outline-none p-3"
                            rows="8"></textarea>
                        <span class="absolute px-2 py-1 text-xs text-white bg-blue-500 rounded right-4 bottom-6">{{
                        text.length
                        }}</span>
                    </div>
                </div>
                <div class="relative w-full md:w-6/12 md:pl-2">
                    <div class="relative">
                        <textarea v-model="result"
                            class="text-gray-600 w-full bg-gray-100 boder-left boder-bottom outline-none p-3"
                            rows="8"></textarea>
                        <span class="absolute px-2 py-1 text-xs text-white bg-blue-500 rounded right-4 bottom-6">{{
                        result.length
                        }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-row flex-wrap">
                <button
                    class="flex my-2 mr-2 py-2 px-4 font-medium tracking-widest text-white bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                    @click="toChinese()">
                    转中文
                </button>
                <button
                    class="flex m-2 py-2 px-4 font-medium tracking-widest text-white bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                    @click="toUnicode()">
                    转Unicode
                </button>
                <button class=" flex m-2 py-2 px-4 font-medium tracking-widest text-white bg-black shadow-lg
                focus:outline-none hover:bg-gray-900 hover:shadow-none" @click="toCopy()">
                    {{ copyText }}
                </button>
                <button class="flex md:m-2 my-2 py-2 px-4 font-medium tracking-widest text-white bg-red-800 shadow-lg
                focus:outline-none hover:bg-red-900 hover:shadow-none" @click="text = ''; result = ''">
                    清空
                </button>
            </div>
        </section>
        <section class="bg-white w-full container mx-auto  px-4 py-6">

            <article class="prose lg:prose-xl" style="max-width: none;">
                <h4>使用说明：</h4>
                <blockquote>
                    <p>开发过程中我们难免遇到转码的问题，最主要的就是中文这块，很多程序在编译时会把中文转换成Unicode编码，其典型特征就是编码就是"\uxxxx",因此做了这个小工具。</p>
                </blockquote>
                <ul>
                    <li>Unicode转中文</li>
                    <li>中文转Unicode。</li>
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

function toChinese() {
    // Unicode => 中文
    result.value = text.value.replace(/(\\u)(\w{1,4})/gi, function ($0) {
        return (String.fromCharCode(parseInt((encodeURIComponent($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)));
    });
    result.value = result.value.replace(/(&#x)(\w{1,4});/gi, function ($0) {
        return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
    });
    result.value = result.value.replace(/(&#)(\d{1,6});/gi, function ($0) {
        return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
    });
}

function toUnicode() {
    // 中文 => Unicode
    var value = '';
    for (var i = 0; i < text.value.length; i++) {
        value += '\\u' + left_zero_4((text.value.charCodeAt(i)).toString(16));
    }
    result.value = value;
}

function left_zero_4(str: string | any[] | null) {
    if (str != null && str != '' && str != 'undefined') {
        if (str.length == 2) {
            return '00' + str;
        }
    }
    return str;
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
    title: "Unicode中文转换",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    meta: [
        { name: 'Keywords', content: 'Unicode转中文,中文转Unicode,Unicode与中文互转,在线Unicode转换工具' },
        { name: 'description', content: '在线一键Unicode转中文，一键中文转Unicode，一键Unicode与中文互转，程序员必备的转换神器。' }
    ],
})


</script>