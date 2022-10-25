<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">文字里的秘密</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12">
            <div>
                <div class="text-xl md:text-2xl font-black my-6">
                    <span :class="show ? 'bg-yellow-300' : ''" @click="changeTab(true)"
                        class="inline-block p-2 cursor-pointer">显示秘密</span>
                    <span :class="show ? '' : 'bg-yellow-300'" @click="changeTab(false)"
                        class="inline-block mx-2 p-2 cursor-pointer">隐藏秘密</span>
                </div>
            </div>
            <div v-show="show">
                <div class="flex-container">
                    <div class="flex-item-lg">
                        <div class="textarea-container"><textarea placeholder="请粘贴待加密的文本"
                                v-model="data.result"></textarea>
                        </div>
                    </div>
                    <div class="flex-item-sm">
                        <div class="blue-bar relative"></div>
                    </div>
                    <div class="flex-item-lg">
                        <div class="textarea-container"><textarea placeholder="这里是小秘密哦！ (😆)" v-model="data.textHidden"
                                readonly class="readonly"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="!show">
                <div class="flex-container">
                    <div class="flex-item-lg">
                        <div class="textarea-container"><textarea placeholder="输入要显示的文字"
                                v-model="data.textShow"></textarea>
                        </div>
                        <div class="textarea-container"><textarea placeholder="输入要隐藏的文字 (😆)"
                                v-model="data.textHidden"></textarea>
                        </div>
                    </div>
                    <div class="flex-item-sm">
                        <div class="blue-bar relative"></div>
                        <div class="blue-bar relative"></div>
                    </div>
                    <div class="flex-item-lg">
                        <div class="textarea-container"><textarea readonly placeholder="结果" class="readonly"
                                v-model="data.result"></textarea>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row flex-wrap">
                    <button
                        class="flex my-2 mr-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                        @click="encode()">
                        一键隐藏
                    </button>
                    <button class="flex m-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-red-800 shadow-lg
                focus:outline-none hover:bg-red-900 hover:shadow-none" @click="changeTab(false)">
                        清空
                    </button>
                </div>
            </div>

        </section>
        <section class="bg-white w-full container mx-auto  px-4 py-6">

            <article class="prose lg:prose-xl" style="max-width: none;">
                <h4>不能说的 <span class="text-xl md:text-2xl font-black bg-green-400 px-2">秘密</span> ：</h4>
                <blockquote>
                    <p>这是一个能够把文字隐藏在文字中的有趣小工具，您可以输入要实现出来的文字，然后输入要隐藏的文字，点击一键隐藏后会把生成好的秘密文字复制下来，您可以在其他社交软件的聊天框中粘贴并发送给好友，让ta来本站解密吧。
                    </p>
                </blockquote>
                <ul>
                    <li>点击隐藏秘密即可进入隐藏模式</li>
                    <li>点击显示秘密即可进入解密模式（默认）</li>
                    <li>举例：点击"隐藏秘密"后，显示文字输入沈佳宜，隐藏文字输入我爱你，点击一键隐藏后粘贴发送给好友，让ta来解密查看属于你们的小秘密吧。</li>
                    <li>本工具仅限娱乐，切勿用作非法用途！</li>
                </ul>
            </article>
        </section>
    </div>
</template>
<script setup lang="ts">

const ZWSP = (await import("~/utils/ZWSP")).default
const show = ref(true)
const data = ref({
    "textShow": "",
    "textHidden": "",
    "result": ""
})
const copyText = ref("复制结果")
const { $toast } = useNuxtApp()
const copy = (await import('copy-to-clipboard')).default;


watch(() => data.value.result, (o, n) => {
    if (show.value) {
        data.value.textHidden = ZWSP.decode(data.value.result)
    }
})

function changeTab(status: boolean) {
    show.value = status;
    data.value.textShow = "";
    data.value.textHidden = "";
    data.value.result = "";
}

function encode() {
    if (data.value.textShow.length > 1) {
        data.value.result = data.value.textShow.substring(0, 1) + ZWSP.encode(data.value.textHidden) + data.value.textShow.substring(1)
    } else {
        data.value.result = data.value.textShow.toString() + ZWSP.encode(data.value.textHidden);
    }
    toCopy();
}

function toCopy() {
    copy(data.value.result)
    copyText.value = "复制完成"
    $toast.success("复制完成")
    window.setTimeout(function () {
        copyText.value = "一键复制"
    }, 800)

}

useHead({
    title: "文字里的秘密",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: '文字里的秘密,文字隐写术,隐藏文字,隐藏字符,把爱情藏进文字,零宽字符,属于两个人的秘密' },
        { name: 'description', content: '一个能够把一段文字隐藏于另一端文字的工具，基于零宽字符的原理，可以把一些小秘密藏起来发送给好友，让ta来本站解密揭晓答案。' }
    ],
})


</script>
<style scoped>
.flex-container textarea {
    width: 100%;
    font-size: 16px;
    height: 150px;
    border-radius: 3px;
    padding: 10px;
    box-sizing: border-box;
    border: none;
    background-color: #F3F4F6;
    color: #000;
}

.flex-container textarea {
    width: 100%;
    font-size: 16px;
    height: 150px;
    border-radius: 3px;
    padding: 10px;
    box-sizing: border-box;
    border: none;
    resize: none;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.flex-container textarea:not(.readonly):focus {
    outline: none;
    box-shadow: 0 0 0 2px #3399ff;
}

.flex-container textarea .readonly {
    background-color: #4da6ff;
    color: #fff;
}

.flex-container textarea.readonly:focus {
    outline: none;
}


.flex-container {
    display: flex;
    align-items: center;
}

.flex-item-sm {
    flex-grow: 1;
    flex-basis: 0;
}

.flex-item-lg {
    flex-grow: 10;
    flex-basis: 0;
}

.textarea-container:not(:last-child) .textarea {
    margin-bottom: 3px;
}

.blue-bar {
    height: 10px;
    background-color: #3399ff;
    margin-right: 6px;
}

.blue-bar::before {
    content: "";
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent transparent #3399ff;
    position: absolute;
    left: 100%;
    top: -3px;
}

.blue-bar:not(:last-child) {
    margin-bottom: 30px;
}

.placeholder {
    color: #777777;
}

.more {
    margin-top: 20px;
    text-align: center;
}

.more .dot-container {
    cursor: pointer;
    display: inline-block;
    width: 100px;
}

.more .dot-container .dot {
    display: inline-block;
    background-color: #4da6ff;
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.more .dot-container:hover .dot {
    animation: strong-color 560ms ease-in-out forwards;
}

@keyframes strong-color {
    0% {
        background-color: #4da6ff;
    }

    50% {
        background-color: #3399ff;
    }

    100% {
        background-color: #1a8cff;
    }
}

::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #777777;
    opacity: 1;
    /* Firefox */
}

:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #777777;
}

::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #777777;
}
</style>