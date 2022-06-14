<template>
    <div class="bg-white min-h-screen">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <p class="text-2xl text-black">时间戳在线转换</p>
                    </div>
                </div>
            </div>
        </section>
        <div class="container px-4 mx-auto py-6">
            <div class="flex items-center flex-wrap border-b py-2">
                <p class="mr-2 my-1">现在的Unix时间戳(Unix timestamp)是:</p> <input v-model="nowStamp"
                    class="bg-gray-100 outline-none px-2 py-1 mr-2 my-1 text-red-700" disabled type="text">
                <div>
                    <div @click="showTypeTimestamp()" class="relative bg-gray-100 px-3 mr-2 cursor-pointer rounded-md">
                        <span class="custom-font-14 leading-8 relative inline select-none">{{ typeTimestamp == 1 ? "秒" :
                                "毫秒"
                        }}
                            <span class="iconfont icon-arrow-down inline-block"
                                :class="showTypeTimestampFlag ? 'reverse' : ''" />
                        </span>
                    </div>
                    <div v-show="showTypeTimestampFlag" :class="showTypeTimestampFlag ? '' : 'hidden'"
                        class="flex flex-wrap w-20 items-center overflow-auto absolute">
                        <div @click="selectTypeTimeStamp(1)" class="btn-2 bg-gray-200 w-16 text-center my-1">
                            秒
                        </div>
                        <div @click="selectTypeTimeStamp(2)" class="btn-2 bg-gray-200 w-16 text-center">
                            毫秒
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div @click="start()"
                        class="my-2 mr-2 py-1 cursor-pointer rounded px-4 bg-blue-700 text-gray-100 select-none hover:bg-blue-900">
                        开始</div>
                    <div @click="pause()"
                        class="m-2 py-1 cursor-pointer rounded px-4 bg-blue-700 text-gray-100 select-none hover:bg-blue-900">
                        暂停</div>
                    <div @click="toCopy(nowStamp)"
                        class="m-2 py-1 cursor-pointer rounded px-4 bg-blue-700 text-gray-100 select-none hover:bg-blue-900">
                        复制</div>
                </div>
            </div>
            <div class="flex items-center flex-wrap border-b py-6">
                <p class="mr-2 my-1">日期转时间戳:</p>
                <input v-model="inputStr" class="bg-gray-100 outline-none px-2 py-1 mr-2 my-1 w-60" type="text" />
                <div>
                    <div @click="showTypeT2S()" class="relative bg-gray-100 px-3 mr-2 cursor-pointer rounded-md">
                        <span class="custom-font-14 leading-8 relative inline select-none">{{ typeT2S == 1 ? "秒" : "毫秒"
                        }}
                            <span class="iconfont icon-arrow-down inline-block"
                                :class="showTypeT2SFlag ? 'reverse' : ''" />
                        </span>
                    </div>
                    <div v-show="showTypeT2SFlag" :class="showTypeT2SFlag ? '' : 'hidden'"
                        class="flex flex-wrap w-20 items-center overflow-auto absolute">
                        <div @click="selectTypeT2S(1)" class="btn-2 bg-gray-200 w-16 text-center my-1">
                            秒
                        </div>
                        <div @click="selectTypeT2S(2)" class="btn-2 bg-gray-200 w-16 text-center">
                            毫秒
                        </div>
                    </div>
                </div>
                <div @click="strToTimestamp()"
                    class="my-2 mr-3 py-1 cursor-pointer rounded px-4 bg-blue-700 text-gray-100 select-none hover:bg-blue-900">
                    开始转换</div>
                <input v-model="strToTimestampResult" class="bg-gray-100 outline-none px-2 py-1 mr-2 my-1" disabled
                    type="text" />
                <div @click="toCopy(strToTimestampResult)"
                    class="my-2 mr-2 py-1 cursor-pointer rounded px-4 bg-blue-700 text-gray-100 select-none hover:bg-blue-900">
                    复制</div>
            </div>
            <div class="flex items-center flex-wrap border-b py-6">
                <p class="mr-2 my-1">时间戳转日期:</p>
                <input v-model="inputTimestamp" class="bg-gray-100 outline-none px-2 py-1 mr-2 my-1" type="text" />

                <div>
                    <div @click="showTypeS2T()" class="relative bg-gray-100 px-3 mr-2 cursor-pointer rounded-md">
                        <span class="custom-font-14 leading-8 relative inline select-none">{{ typeS2T == 1 ? "秒" : "毫秒"
                        }}
                            <span class="iconfont icon-arrow-down inline-block"
                                :class="showTypeS2TFlag ? 'reverse' : ''" />
                        </span>
                    </div>
                    <div v-show="showTypeS2TFlag" :class="showTypeS2TFlag ? '' : 'hidden'"
                        class="flex flex-wrap w-20 items-center overflow-auto absolute">
                        <div @click="selectTypeS2T(1)" class="btn-2 bg-gray-200 w-16 text-center my-1">
                            秒
                        </div>
                        <div @click="selectTypeS2T(2)" class="btn-2 bg-gray-200 w-16 text-center">
                            毫秒
                        </div>
                    </div>
                </div>

                <div @click="timestampToDate()"
                    class="my-2 mr-3 py-1 cursor-pointer rounded px-4 bg-blue-700 text-gray-100 select-none hover:bg-blue-900">
                    开始转换</div>
                <input v-model="timestampToStrResult" class="bg-gray-100 outline-none px-2 py-1 mr-2 my-1" disabled
                    type="text" />
                <div @click="toCopy(timestampToStrResult)"
                    class="my-2 mr-2 py-1 cursor-pointer rounded px-4 bg-blue-700 text-gray-100 select-none hover:bg-blue-900">
                    复制</div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { api } from '~/api/api';
const { $toast } = useNuxtApp()

const nowStamp = ref(Date.parse(new Date().toString()) / 1000)
const isRunning = ref(true)

const inputStr = ref("")
const strToTimestampResult = ref("")

const inputTimestamp = ref(Date.parse(new Date().toString()) / 1000)
const timestampToStrResult = ref("")

const showTypeTimestampFlag = ref(false)
const typeTimestamp = ref(1)

const showTypeS2TFlag = ref(false)
const typeS2T = ref(1)

const showTypeT2SFlag = ref(false)
const typeT2S = ref(1)

const dateFormat = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    const config = {
        YYYY: date.getFullYear(),
        MM: date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
        DD: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        HH: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        mm: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        ss: date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
    }
    for (const key in config) {
        format = format.replace(key, config[key])
    }
    return format
}
inputStr.value = dateFormat(new Date)


setInterval(function () {
    if (isRunning.value) {
        if (typeTimestamp.value == 1) {
            nowStamp.value = Date.parse(new Date().toString()) / 1000;
        } else {
            nowStamp.value = Date.now();
        }
    }
}, 1000);

function start() {
    isRunning.value = true
}

function pause() {
    isRunning.value = false
}

function showTypeTimestamp() {
    showTypeTimestampFlag.value = !showTypeTimestampFlag.value
    showTypeS2TFlag.value = false
    showTypeT2SFlag.value = false
}

function showTypeS2T() {
    showTypeS2TFlag.value = !showTypeS2TFlag.value
    showTypeTimestampFlag.value = false
    showTypeT2SFlag.value = false
}


function showTypeT2S() {
    showTypeT2SFlag.value = !showTypeT2SFlag.value
    showTypeTimestampFlag.value = false
    showTypeS2TFlag.value = false
}

function selectTypeTimeStamp(params: number) {
    typeTimestamp.value = params
    showTypeTimestampFlag.value = false
}

function selectTypeT2S(params: number) {
    typeT2S.value = params
    showTypeT2SFlag.value = false
}


function selectTypeS2T(params: number) {
    typeS2T.value = params
    showTypeS2TFlag.value = false
}


async function strToTimestamp() {
    strToTimestampResult.value = ""
    let str = await api.tool.stringToTimestamp(inputStr.value)
    if (str.code == 200) {
        strToTimestampResult.value = (Number.parseInt(str.data) / (typeT2S.value == 1 ? 1000 : 1)).toString()
        $toast.success("转换成功")
    } else {
        $toast.error("转换失败")
    }
}

function timestampToDate() {
    let date = new Date(inputTimestamp.value * (typeS2T.value == 1 ? 1000 : 1))
    let result = dateFormat(date)
    timestampToStrResult.value = result
}

function toCopy(params: any) {
    navigator.clipboard.writeText(params)
    $toast.success("复制成功")
}

useHead({
    title: "时间戳在线转换工具",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: '时间戳工具,时间转换,时间戳转换,时间戳在线转换工具' },
        { name: 'description', content: '一个时间戳转换工具，用于将时间戳转换成时间或者将时间转换成时间。' }
    ],
})
</script>