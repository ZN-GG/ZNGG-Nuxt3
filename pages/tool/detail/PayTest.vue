<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">扫码支付测试</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12">
            <div class="w-full flex flex-wrap">
                <div class="relative w-full md:w-6/12 md:pr-2">
                    <div class="relative w-full">
                        <p class="mx-auto text-center">支付二维码</p>
                        <img class="mx-auto" :src="QrCodeUrl" alt="">
                        <button class=" flex mx-auto m-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg
                focus:outline-none hover:bg-gray-900 hover:shadow-none leading" @click="createOrder()">
                            生成订单
                        </button>
                    </div>
                </div>
                <div class="relative w-full md:w-6/12 md:pl-2">
                    <div class="relative">
                        <textarea ref="textareaRef" v-model="msg" readonly
                            class=" text-green-700 w-full bg-black boder-left boder-bottom outline-none p-3"
                            rows="12"></textarea>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-white w-full container mx-auto  px-4 py-6">

            <article class="prose lg:prose-xl" style="max-width: none;">
                <h4>使用说明：</h4>
                <blockquote>
                    <p>本工具用于演示如何使用支付接口创建扫码支付功能。</p>
                </blockquote>
                <ul>
                    <li>生成的二维码只能使用手机摄像头扫描！！！</li>
                    <li>仅用于支付测试，金额固定为0.1元，测试金额不进行退款！</li>
                    <li>文章地址：<a
                            href="/read/post/1260995610887061504">https://www.zngg.net/read/post/1260995610887061504</a>
                    </li>
                </ul>
            </article>
        </section>
    </div>
</template>
<script setup lang="ts">
import http from '~/api/request';


const msg = ref("等待生成订单...")
const order = ref({
    uid: "",
    codeUrl: "",
    status: ""
})
const QrCodeUrl = ref("/img/paytest.gif")
const textareaRef = ref<HTMLTextAreaElement>();
let timer: any;



onUpdated(() => {
    textareaRef.value!.scrollTop = textareaRef.value!.scrollHeight;
});

function createOrder() {
    clearInterval(timer)
    msg.value = msg.value + "\r正在生成订单..."
    fetch(http.baseUrl + "/api/common/payTest/0.1", {
        method: 'GET'
    }).then(res => res.json()).then(data => {
        if (data.success) {
            order.value.uid = data.data.uid;
            order.value.codeUrl = data.data.codeUrl;
            order.value.status = data.data.status;
            QrCodeUrl.value = http.baseUrl + '/api/common/createQRCode?url=' + data.data.codeUrl + '&width=240&height=240'
            msg.value = msg.value + "\r订单已生成，请扫码支付"
            timer = setInterval(() => {
                fetch(http.baseUrl + "/pay/test/" + order.value.uid, {
                    method: 'GET'
                }).then(res => res.json()).then(data => {
                    if (data.success) {
                        msg.value = msg.value + "\r支付成功！"
                        clearInterval(timer)
                    } else {
                        msg.value = msg.value + "\r订单请求结果: " + data.message
                    }
                })
            }, 1000)
        } else {
            msg.value = msg.value + "\r订单生成失败: " + data.message
        }
    })
}

useHead({
    title: "支付测试",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    meta: [
        { name: 'Keywords', content: '支付测试' },
        { name: 'description', content: '用于测试扫码支付' }
    ],
})

</script>