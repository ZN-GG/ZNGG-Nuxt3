<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">造新词生成器</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12">
            <div class="flex flex-wrap mb-4">
                <h2 class="w-full font-semibold text-gray-900 text-lg">词语：</h2>
                <input v-model="word" autofocus class="bg-gray-100 outline-none px-2 py-1 mr-2 my-1 text-red-700"
                    type="text">
            </div>
            <div class="flex flex-wrap mb-4">
                <h2 class="w-full font-semibold text-gray-900 text-lg">释义：</h2>
                <textarea v-model="meta" placeholder=''
                    class="text-gray-600 w-full bg-gray-100 boder-left boder-bottom outline-none p-3"
                    rows="3"></textarea>
            </div>
            <div class="flex flex-wrap mb-4">
                <h2 class="w-full font-semibold text-gray-900 text-lg">拼音：</h2>
                <input v-model="pinyin" class="bg-gray-100 outline-none px-2 py-1 mr-2 my-1 w-full" type="text">
            </div>
            <div class="new_word">
                <div class="preview">
                    <div class="box" ref="nodeCore">
                        <div class="pinyin">
                            <div v-for="w in pinyin.split(' ')" class="text" v-text="w">
                            </div>
                        </div>
                        <div class="words">
                            <div v-for="w in word" class="word"><span class="line"></span><span
                                    class="line"></span><span class="text" v-text="w"></span></div>
                        </div>
                        <div class="paraphrase" :style="'width:' + word.length * 6.25 + 'rem'" v-text="meta">
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" :disabled="loading" @click="conversion" class="flex my-4 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg
                focus:outline-none hover:bg-gray-900 hover:shadow-none">
                {{ loading ? '生成中' : '开始生成' }}
            </button>

            <div class="my-4">
                <img :src="img" class="img mx-auto md:ml-0">
            </div>

        </section>
        <section class="bg-white w-full container mx-auto  px-4 py-6">

            <article class="prose lg:prose-xl" style="max-width: none;">
                <h4>使用说明：</h4>
                <blockquote>
                    <p>本工具纯属娱乐，切勿用做非法用途
                    </p>
                </blockquote>
                <ul>
                    <li>恶搞成语，仅用于娱乐使用。</li>
                    <li>保存：生成图片之后会自动下载图片。</li>
                    <li>注意：输入文字后会自动生成拼音，如果出现多音字错误需要手动输入拼音的话，拼音之间请用空格分开。</li>
                </ul>
            </article>
        </section>
    </div>
</template>
<script setup lang="ts">
let nodeCore = ref<HTMLDivElement>(null);

const { $toast } = useNuxtApp()

const word = ref("薪满意足")
const pinyin = ref("xīn mǎn yì zú")
const meta = ref("意思是指薪水、工资很合适，而让自己觉得很满足、很满意。")

const img = ref('');
const loading = ref(false);

const domtoimage = await import('dom-to-image');
const pinyinUtil = (await import('pinyin-pro/lib/pinyin')).pinyin;

watch(() => word, (o, n) => {
    console.log(word.value);
    pinyin.value = pinyinUtil(word.value)
}, {
    deep: true
})

function conversion() {
    img.value = '';
    loading.value = true;
    domtoimage
        .toPng(nodeCore.value, {})
        .then(e => {
            img.value = e;
            loading.value = false;
            domtoimage.toBlob(nodeCore.value, {}).then(function (blob) {
                var hyperlink = document.createElement("a");
                hyperlink.href = URL.createObjectURL(blob);
                hyperlink.download = word.value + '.png';
                if (typeof hyperlink.click === "function") {
                    hyperlink.click();
                } else {
                    hyperlink.target = "_blank";
                    hyperlink.dispatchEvent(new MouseEvent("click", {
                        view: window,
                        bubbles: true,
                        cancelable: true
                    }));
                }
                URL.revokeObjectURL(hyperlink.href)
            });
        })
        .catch(err => {
            loading.value = false;
        });
};



useHead({
    title: "造新词生成器",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: '成语生成器,新词生成器,造新词生成器,田字格成语生成器,流行成语生成解释' },
        { name: 'description', content: '流行的新词生成器，用来造新词的工具，有田字格背景、拼音和释义。' }
    ],
})


</script>

<style scoped>
.new_word .preview {
    border-radius: .25rem;
    justify-content: center;
    box-sizing: border-box;
    overflow-x: auto;
    text-align: center
}

.new_word .box,
.new_word .preview {
    background-color: #efebec;
    color: #020107
}

.new_word .box {
    display: inline-block;
    position: relative;
    padding: 1.875rem;
    text-align: left;
    margin: auto;
}

.new_word .pinyin {
    margin-bottom: .625rem;
    font-size: 0
}

.new_word .pinyin .text {
    font-size: 1.875rem;
    display: inline-block;
    width: 6.25rem;
    border: .125rem solid transparent;
    text-align: center;
    font-weight: 400;
    color: #756d63
}

.new_word .pinyin .text:not(:last-child) {
    border-right: 0
}

.new_word .words {
    font-size: 0
}

.new_word .words .word {
    position: relative;
    width: 6.25rem;
    height: 6.25rem;
    border: .125rem solid #e60b09;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 4.375rem;
    font-weight: 700
}

.new_word .words .word .text {
    position: absolute;
    z-index: 1;
    font-family: cursive, SimSun, NSimSun, FangSong, KaiTi
}

.new_word .words .word .line {
    position: absolute;
    transform-origin: center;
    border-left: .0625rem dashed #e60b09;
    height: 8.83883rem
}

.new_word .words .word .line:first-child {
    transform: rotate(45deg)
}

.new_word .words .word .line:nth-child(2) {
    transform: rotate(-45deg)
}

.new_word .words .word:not(:last-child) {
    border-right: 0
}

.new_word .words .word:after,
.new_word .words .word:before {
    z-index: 0;
    content: "";
    position: absolute;
    background-color: #e60b09
}

.new_word .words .word:after {
    left: 50%;
    width: .125rem;
    height: 100%
}

.new_word .words .word:before {
    top: 50%;
    width: 100%;
    height: .125rem
}

.new_word .paraphrase {
    position: relative;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    margin-top: .9375rem;
    display: inline-block;
    font-size: 1.125rem;
    line-height: 1.5
}

.new_word .paraphrase:before {
    content: "【释义】";
    display: inline-block;
    color: #867f77
}
</style>

