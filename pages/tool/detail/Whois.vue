<template>
    <div class="bg-gray-100">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">Whois查询</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12 bg-white rounded-l mb-12">
            <div class="flex w-full text-xl md:text-2xl">
                <div class="bg-gray-100 py-2 w-full rounded">
                    <input ref="inputBox" class="bg-gray-100 px-2 border-0 focus:outline-none w-full font-black" foucus
                        type="text" placeholder="请输入要查询的域名" @keyup.enter="search" />
                </div>
                <div class="relative">
                    <div class="searchBtn rounded-r whitespace-nowrap px-8 cursor-pointer hover:shadow-lg leading-7 md:leading-8 py-2 bg-black font-black text-white"
                        @click="search">
                        查询</div>
                </div>
            </div>

            <hr v-show="showInfo" class="container mx-auto my-10" />

            <div>
                <p class="p-4 text-lg whitespace-pre-wrap" style="white-space: pre-wrap;">{{result}}</p>
            </div>

        </section>

        <section class="w-full container px-4 mx-auto py-12 bg-white rounded-l mb-12">
            <div class="text-xl md:text-2xl font-black my-3">Q：什么是 <span class="inline-block bg-yellow-300">Whois</span>
                查询？
            </div>
            <div class="text-base md:text-xl mt-3 mb-12">A：简单来说whois查询就是用来查看域名是否注册，以及已注册域名的所有人、注册商、注册日期和过期日期等信息。
            </div>
            <div class="text-xl md:text-2xl font-black my-3">Q：<span class="inline-block bg-yellow-300">Whois</span>
                查询的原理是什么？
            </div>
            <div class="text-base md:text-xl my-12">A：根据域名后缀获取到域名服务器，之后去使用TCP连接对应的域名服务器，端口为34，发送命令内容为域名 + \r\n，接受对应的返回信息作为域名的whois信息。
            </div>
        </section>


    </div>
</template>
<script setup lang="ts">
import { api } from "~/api/api";
const { $toast } = useNuxtApp()
const inputBox = ref<HTMLInputElement>();
const showInfo = ref(false);
const result = ref("");

onMounted(() => {
    inputBox.value!.focus();
})

function search() {
    if (inputBox.value!.value.length < 3) {
        $toast.error("请输入正确的域名")
        return
    }
    result.value = "查询中...";
    showInfo.value = true;
    api.fun.getWhois(inputBox.value!.value).then(res => {
        if (res.success) {
            let data: string = res.data
            if (data.indexOf("URL of the") != -1) {
                data = data.split("URL of the")[0];
            }
            data = data.replaceAll(/\n(.*?)(REDACTED FOR PRIVACY|queried domain name.)/g, "");
            result.value = data;
        } else {
            $toast.error("抱歉：" + res.message)
            result.value = res.message;
        }
    })
}

</script>

<style scoped>
.searchBtn:before {
    content: "";
    border-width: 6px;
    border-style: solid;
    border-color: transparent #000 transparent transparent;
    position: absolute;
    right: 100%;
    top: 38%;
}
</style>