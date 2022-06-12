<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <p class="text-2xl text-black">英文大小写在线转换</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12">
            <div class="relative">
                <textarea v-model="text" autofocus
                    class="text-gray-600 w-full bg-gray-100 boder-left boder-bottom outline-none p-3"
                    rows="8"></textarea>
                <span class="absolute px-2 py-1 text-xs text-white bg-blue-500 rounded right-4 bottom-6">{{ text.length
                }}</span>
            </div>
            <div class="flex flex-row flex-wrap">
                <button
                    class="flex my-2 mr-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                    @click="toUpperCaseAll()">
                    单词大写
                </button>
                <button
                    class="flex m-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                    @click="toLowerCaseAll()">
                    单词小写
                </button>
                <button class=" flex m-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg
                focus:outline-none hover:bg-gray-900 hover:shadow-none" @click="toFirstLetterCase()">
                    首字母大写
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
                    <p>有做跨境电商的小伙伴说需要一款英文大小写转换的工具，说白了就是英文首字母转大写，于是就利用JavaScript写下了这个工具。</p>
                </blockquote>
                <ul>
                    <li>转大写：全部字母转大写。</li>
                    <li>转小写：全部字母转小写。</li>
                    <li>首字母大写：英文句子中每个单词的第一个字母转成大写，其它字母转成小写。例如：this is my girl转换后为：This Is My Girl</li>
                </ul>
            </article>
        </section>
    </div>
</template>
<script setup lang="ts">

const text = ref("")
const copyText = ref("一键复制")
const { $toast } = useNuxtApp()


function toUpperCaseAll() {
    text.value = text.value.toUpperCase()
}

function toLowerCaseAll() {
    text.value = text.value.toLowerCase()
}

function toFirstLetterCase() {
    text.value = text.value.replace(/ +/g, ' ')
    let index = 0;
    let tmpStr = "";
    let tmpChar = "";
    let preString = "";
    let postString = "";
    let strLen = 0;
    tmpStr = text.value.toLowerCase();
    strLen = tmpStr.length;
    if (strLen > 0) {
        for (index = 0; index < strLen; index++) {
            if (index == 0) {
                tmpChar = tmpStr.substring(0, 1).toUpperCase();
                postString = tmpStr.substring(1, strLen);
                tmpStr = tmpChar + postString;
            } else {
                tmpChar = tmpStr.substring(index, index + 1);
                if (tmpChar == " " && index < (strLen - 1)) {
                    tmpChar = tmpStr.substring(index + 1, index + 2).toUpperCase();
                    preString = tmpStr.substring(0, index + 1);
                    postString = tmpStr.substring(index + 2, strLen);
                    tmpStr = preString + tmpChar + postString;
                }
            }
        }
    }
    text.value = tmpStr;
}

function toCopy() {
    navigator.clipboard.writeText(text.value)
    copyText.value = "复制完成"
    $toast.success("复制完成")
    window.setTimeout(function () {
        copyText.value = "一键复制"
    }, 800)

}


useHead({
    title: "英文字母大小写转换",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: '英文字母大小写转换工具,英文字母转大写,英文字母转小写,英文首字母大写' },
        { name: 'description', content: '这是一个英文大小写转换的工具，可以一键将英文句子或标题的单词首字母转换成大写，跨境电商商品名必备在线工具之一。' }
    ],
})


</script>