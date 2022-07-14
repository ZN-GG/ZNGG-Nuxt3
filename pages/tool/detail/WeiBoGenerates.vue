<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">微博图片生成</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12">
            <div class="weibo-container">
                <div>
                    <div class="flex flex-wrap mb-4">
                        <h2 class="w-full font-semibold text-gray-900">请选择VIP等级：</h2>
                        <button v-for="(item, index) in vipList" @click="setVip(index)"
                            class="cursor-pointer my-1 select-none mr-2 px-3 md:px-5 rounded-md custom-font-14 leading-8 hover:bg-blue-600 hover:text-white"
                            :class="index == vip ? 'bg-blue-600 text-white' : 'bg-gray-100'">
                            {{ item }}
                        </button>
                    </div>

                    <h2 class="font-semibold text-gray-900">请选择头像：</h2>
                    <div class="form-group">
                        <div class="text-center relative pt-6 pb-6 mb-4 border-2 hover:bg-gray-100 custom-font-14 rounded"
                            id="fileInput">
                            <span>拖拽文件到这里或者点击选择文件</span>
                            <input type="file" id="file" accept="image/*"
                                style="opacity: 0;position: absolute;cursor: pointer;width: 100%;height: 100%;left: 0;top: 0;"
                                @change="getAvatar">
                        </div>
                    </div>
                    <div>
                        <h2 class="mb-4 font-semibold text-gray-900">更多设置：</h2>
                        <ul
                            class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex">
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                <div class="flex items-center pl-3">
                                    <input id="vue-checkbox-list" type="checkbox" v-model="renzheng"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 y-600">
                                    <label for="vue-checkbox-list"
                                        class="py-3 ml-2 w-full text-sm font-medium text-gray-900">个人认证</label>
                                </div>
                            </li>
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
                                <div class="flex items-center pl-3">
                                    <input id="react-checkbox-list" type="checkbox" v-model="daren"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2">
                                    <label for="react-checkbox-list"
                                        class="py-3 ml-2 w-full text-sm font-medium text-gray-900">微博达人</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="weibo-box">
                        <div ref="nodeCore" class="c">
                            <div contenteditable="true" class="user-box">
                                <div class="header">
                                    <img :src="avatar" class="avatar">
                                    <div class="info">
                                        <div class="info-header">
                                            <span class="name">
                                                李宝宝
                                            </span>
                                            <i v-show="renzheng" class="icon_approve_gold"></i>
                                            <i v-show="daren" class="daren"></i>
                                            <i class="icon_member" :class="vip"></i>
                                        </div>
                                        <div class="line2">
                                            7月13日 12:00 来自 iPhone 13 Pro Max
                                        </div>
                                        <div class="content">
                                            热烈庆祝ZNGG在线工具上线微博图片生成器工具。。
                                        </div>
                                    </div>
                                </div>
                                <div class="footer">
                                    <div class="btn">
                                        <em class="W_ficon ficon_favorite S_ficon">
                                            û
                                        </em>
                                        <span class="text">
                                            收藏
                                        </span>
                                    </div>
                                    <div class="btn">
                                        <em class="W_ficon ficon_forward S_ficon">
                                            
                                        </em>
                                        <span class="text">
                                            77841
                                        </span>
                                    </div>
                                    <div class="btn">
                                        <em class="W_ficon ficon_repeat S_ficon">
                                            
                                        </em>
                                        <span class="text">
                                            26289
                                        </span>
                                    </div>
                                    <div class="btn">
                                        <em class="W_ficon ficon_praised S_txt2">
                                            ñ
                                        </em>
                                        <span class="text">
                                            46885
                                        </span>
                                    </div>
                                </div>
                                <i class="W_ficon ficon_arrow_down S_ficon">
                                    c
                                </i>
                            </div>
                        </div>
                    </div>
                    <button type="button" :disabled="loading" @click="conversion" class="flex mx-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg
                focus:outline-none hover:bg-gray-900 hover:shadow-none">
                        {{ loading ? '生成中' : '开始生成' }}
                    </button>
                </div>

                <div class="my-4">
                    <img :src="img" class="img mx-auto md:ml-0">
                </div>
            </div>

        </section>
        <section class="bg-white w-full container mx-auto  px-4 py-6">

            <article class="prose lg:prose-xl" style="max-width: none;">
                <h4>使用说明：</h4>
                <blockquote>
                    <p>图片相关信息在点击配置，文本相关修改可以直接在原文上修改。
                    </p>
                </blockquote>
                <ul>
                    <li>恶搞微博生成，仅用于娱乐使用。</li>
                    <li>本工具仅限于技术分享娱乐，严禁用于非法途径。</li>
                    <li>保存：生成图片之后，电脑用户可以右键保存图片，手机用户长按可以保存图片。</li>
                </ul>
            </article>
        </section>
    </div>
</template>
<script setup lang="ts">
let nodeCore = ref<HTMLDivElement>(null);
const vip = ref('icon_member7');
const daren = ref(true);
const renzheng = ref(true);
const loading = ref(false);
const vipList = ref({
    none: '无',
    icon_member1: 'VIP1',
    icon_member2: 'VIP2',
    icon_member3: 'VIP3',
    icon_member4: 'VIP4',
    icon_member5: 'VIP5',
    icon_member6: 'VIP6',
    icon_member7: 'VIP7'
});
const img = ref('');
const n = ref('');
const dataUrl = ref('');;
const rdata = ref('');;
const avatar = ref('/img/avatar.jpg');
const { $toast } = useNuxtApp()
let domtoimage;

onMounted(async () => {
    domtoimage = await import('dom-to-image')
})

function conversion() {
    img.value = '';
    loading.value = true;
    domtoimage
        .toPng(nodeCore.value)
        .then(e => {
            img.value = e;
            loading.value = false;
        })
        .catch(err => {
            loading.value = false;
        });
};
function getAvatar(e) {
    dataUrl.value = '';
    rdata.value = '';
    let files = e.target.files;
    if (!files.length) return false;
    const blobUrl = URL.createObjectURL(files[0]);
    avatar.value = blobUrl;
}
function setVip(index) {
    vip.value = index
}


useHead({
    title: "微博图片生成器",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: '微博图片生成,名人微博图片生成,生成微博图片。' },
        { name: 'description', content: '可以在线生成任意微博信息，恶搞微博图片生成。' }
    ],
})


</script>

<style scoped>
@font-face {
    font-family: 'WBficon';
    src: url('/fonts/weibo_icon2.woff2') format('woff2'),
        url('/fonts/weibo_icon.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.weibo-container .weibo-box {
    margin: 15px 0;
    width: 100%;
    overflow-x: auto;
}

.weibo-container .weibo-box .c {
    width: 680px;
    padding: 40px;
    box-sizing: border-box;
    background-color: #f5f5f5;
    font-family: 'Microsoft Yahei';
}

.weibo-container .weibo-box .W_ficon {
    font-family: 'WBficon' !important;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
}

.weibo-container .weibo-box .info-header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.weibo-container .weibo-box .page-weibo {
    font-size: 14px;
    color: #333;
}

.weibo-container .weibo-box .user-box {
    position: relative;
    width: 600px;
    min-height: 136px;
    -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    background-color: #fff;
}

.weibo-container .weibo-box .user-box .header {
    position: relative;
    min-height: 97px;
    padding: 20px 20px 4px;
    border-bottom: 1px solid #f2f2f5;
}

.weibo-container .weibo-box .user-box .avatar {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.weibo-container .weibo-box .user-box .name {
    margin-right: 6px;
    color: #333;
    font-weight: 700;
}

.weibo-container .weibo-box .user-box .icon_approve_gold {
    width: 15px;
    height: 14px;
    margin-right: 6px;
    background-image: url("/img/weibo/weibo_icon.png");
    background-size: 475px 14px;
}

.weibo-container .weibo-box .user-box .daren {
    background-position: 0 -125px;
    width: 16px;
    height: 14px;
    margin-right: 4px;
    background-image: url("/img/weibo/weibo_icon_2.png");
    background-repeat: no-repeat;
}

.weibo-container .weibo-box .user-box .icon_member {
    background-position: -125px -125px;
    width: 16px;
    height: 16px;
    margin-right: 4px;
    display: inline-block;
    background-image: url("/img/weibo/weibo_icon_2.png");
    background-repeat: no-repeat;
}

.weibo-container .weibo-box .user-box .icon_member.none {
    display: none;
}

.weibo-container .weibo-box .user-box .icon_member.icon_member1 {
    background-position: -25px 0;
}

.weibo-container .weibo-box .user-box .icon_member.icon_member2 {
    background-position: -25px -25px;
}

.weibo-container .weibo-box .user-box .icon_member.icon_member3 {
    background-position: -25px -50px;
}

.weibo-container .weibo-box .user-box .icon_member.icon_member4 {
    background-position: -25px -75px;
}

.weibo-container .weibo-box .user-box .icon_member.icon_member5 {
    background-position: -25px -100px;
}

.weibo-container .weibo-box .user-box .icon_member.icon_member6 {
    background-position: -25px -125px;
}

.weibo-container .weibo-box .user-box .icon_member.icon_member7 {
    background-position: -125px -125px;
}

.weibo-container .weibo-box .tip {
    color: #999;
    margin-bottom: 16px;
}

.weibo-container .weibo-box .info {
    padding-left: 56px;
}

.weibo-container .weibo-box .line2 {
    margin-top: 4px;
    margin-bottom: 2px;
    color: gray;
    font-size: 12px;
}

.weibo-container .weibo-box .content {
    margin-bottom: 8px;
    width: 500px;
    color: #333;
    line-height: 23px;
    word-wrap: break-word;
}

.weibo-container .weibo-box .footer {
    height: 38px;
}

.weibo-container .weibo-box .btn {
    float: left;
    height: 22px;
    margin: 7px 0;
    line-height: 22px;
    width: 24%;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    color: #808080;
    font-size: 12px;
}

.weibo-container .weibo-box .btn:last-child {
    border: none;
}

.weibo-container .weibo-box .W_ficon {
    position: relative;
    top: 2px;
    margin-right: 2px;
    font-style: normal;
    font-size: 15px;
    vertical-align: top;
}

.weibo-container .weibo-box .text {
    position: relative;
    top: 1px;
    line-height: 22px;
}

.weibo-container .weibo-box .ficon_arrow_down {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #333;
}

.weibo-container .weibo-box .btns {
    margin-bottom: 16px;
}

.weibo-container .img {
    display: block;
    max-width: 100%;
}
</style>