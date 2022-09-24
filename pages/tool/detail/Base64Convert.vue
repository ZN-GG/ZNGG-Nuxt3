<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">Base64编码解码</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12">
            <div class="w-full flex flex-wrap">
                <div class="relative w-full md:w-6/12 md:pr-2">
                    <div class="relative">
                        <textarea v-model="text" autofocus
                            class="text-gray-600 w-full bg-gray-100 boder-left boder-bottom outline-none p-3 h-full"
                            rows="8"></textarea>
                        <span class="absolute px-2 py-1 text-xs text-white bg-blue-500 rounded right-4 bottom-6">{{
                                text.length
                        }}</span>
                    </div>
                </div>
                <div class="relative w-full md:w-6/12 md:pl-2">
                    <div class="relative">
                        <textarea v-model="result"
                            class="text-gray-600 w-full bg-gray-100 boder-left boder-bottom outline-none p-3 h-full"
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
                    @click="encoder()">
                    编码
                </button>
                <button
                    class="flex m-2 py-2 px-4 font-medium tracking-widest text-white bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                    @click="decoder()">
                    解码
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
                    <p>Base64是一种常见的加密方式，吾爱破解论坛内某些板块在帖子里经常使用这种加密方式来加密一些如软件名、网址等敏感信息，（个人理解）一般看到一段没有规律的英文，且最后是==或/xx，那么大概率是base64加密，就不妨使用本工具试试看能否解密成明文。
                    </p>
                </blockquote>
                <ul>
                    <li>Base64加密</li>
                    <li>Base64解密</li>
                    <li>相关工具：<a href="ImageToBase64">Base64图片转换</a></li>
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

let CryptoJS;
onMounted(async () => {
    CryptoJS = (await import("crypto-js"));
})

function encoder() {
    let str = CryptoJS.enc.Utf8.parse(text.value);
    let base64 = CryptoJS.enc.Base64.stringify(str);
    result.value = base64;
}

function decoder() {
    let words = CryptoJS.enc.Base64.parse(text.value);
    result.value = words.toString(CryptoJS.enc.Utf8);
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
    title: "Base64编码解码",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: 'Base64,Base64编码,Base64解码,Base64加密,Base64解密' },
        { name: 'description', content: '在线Base64编码解码 在线Base64加密解密工具。' }
    ],
})


</script>