<template>
    <div class="bg-white min-h-screen">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">图片转base64</h1>
                    </div>
                </div>
            </div>
        </section>
        <div class="container px-4 mx-auto py-6">
            <div class="form-group">
                <div class="text-center relative pt-6 pb-6 mb-4 border-2 hover:bg-gray-100 custom-font-14 rounded"
                    id="fileInput">
                    <span>拖拽文件到这里或者点击选择文件</span>
                    <input type="file" id="file" accept="image/*"
                        style="opacity: 0;position: absolute;cursor: pointer;width: 100%;height: 100%;left: 0;top: 0;"
                        @change="selectFile">
                </div>
            </div>
            <div class="flex flex-wrap">
                <div class="w-full md:w-6/12 md:pr-2">
                    <img :src="base64Data.length == 0 ? '/logo-black.png' : base64Data"
                        class="w-full h-72 object-contain border-2">
                </div>
                <div class="w-full md:w-6/12 md:pl-2 mt-4 md:mt-0">
                    <textarea v-model="base64Data"
                        class="w-full bg-gray-100 outline-none p-2 h-72 text-gray-700 custom-font-14" name="" id=""
                        cols="30" rows="10"></textarea>
                </div>
            </div>

            <div class="flex flex-row flex-wrap justify-around">
                <button
                    class="flex my-2 mr-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                    Base64转图片
                </button>
                <div class="flex flex-row flex-wrap">
                    <button @click="addHeader()"
                        class="flex m-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                        加头
                    </button>
                    <button @click="clear()"
                        class="flex m-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                        清空
                    </button>
                    <button class=" flex m-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg
                focus:outline-none hover:bg-gray-900 hover:shadow-none" @click="toCopy()">
                        复制
                    </button>
                </div>

            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
let CryptoJS = await import("crypto-js");
const { $toast } = useNuxtApp();
const base64Data = ref("");
function encode(file) {
    return new Promise((resolve, reject) => {
        try {
            let reader = new FileReader();
            reader.onload = (e) => {
                const wordArray = CryptoJS.lib.WordArray.create(reader.result);
                let r = CryptoJS.enc.Base64.stringify(wordArray);
                if (file.type.startsWith('image')) {
                    r = `data:${file.type};base64,${r}`;
                } else {
                    r = `data:image/jpeg;base64,${r}`;
                }
                $toast.success("转换成功")
                return resolve(r)
            }
            reader.readAsArrayBuffer(file)
        } catch (e) {
            $toast.error("转换失败")
            return reject(e)
        }
    })
}

async function selectFile(e) {

    if (e.target.files.length > 0) {
        encode(e.target.files[0]).then(res => {
            base64Data.value = res.toString()
        }).catch(e => {
        })
    }
}

function addHeader() {
    base64Data.value = "data:image/*;base64," + base64Data.value
}

function clear() {
    base64Data.value = ""
    $toast.success("清除成功")
}
function toCopy() {
    navigator.clipboard.writeText(base64Data.value)
    $toast.success("复制成功")
}


useHead({
    title: "图片转Base64",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: '在线Base64转图片,图片转Base64编码,在线图片转换' },
        { name: 'description', content: '一个可以将图片和Base64编码相互转换的工具，在图片格式转换时会用到。' }
    ],
})
</script>