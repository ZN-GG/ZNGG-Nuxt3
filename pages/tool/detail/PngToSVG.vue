<template>
    <div class="bg-white min-h-screen">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">Png转SVG</h1>
                    </div>
                </div>
            </div>
        </section>
        <div class="container px-4 mx-auto py-6">
            <div class="form-group">
                <div class="text-center relative py-12 mb-4 border-2 hover:bg-gray-100 custom-font-14 rounded"
                    id="fileInput">
                    <span>拖拽文件到这里或者点击选择文件</span>
                    <input type="file" id="file" accept="image/*"
                        style="opacity: 0;position: absolute;cursor: pointer;width: 100%;height: 100%;left: 0;top: 0;"
                        @change="selectFile($event as any)">
                </div>
            </div>
            <div class="flex items-center pl-3">
                <input id="react-checkbox-list" type="checkbox" v-model="isZip"
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="react-checkbox-list"
                    class="py-3 ml-2 w-full text-sm font-medium text-gray-900">压缩SVG（开启压缩后请勿上传过大的Png，会卡死。）</label>
            </div>
            <div class="flex flex-wrap">
                <div class="w-full md:w-6/12 md:pr-2">
                    <div class="w-full h-72 object-contain border-2" v-html="svgData == '' ? emptyData : svgData"></div>
                </div>
                <div class="w-full md:w-6/12 md:pl-2 mt-4 md:mt-0">
                    <textarea v-model="svgData"
                        class="w-full bg-gray-100 outline-none p-2 h-72 text-gray-700 custom-font-14" name="" id=""
                        cols="30" rows="10"></textarea>
                </div>
            </div>

            <div class="flex flex-row flex-wrap justify-around">
                <div></div>
                <div class="flex flex-row flex-wrap">
                    <button class=" flex m-2 py-2 px-4 font-medium tracking-widest text-white uppercase bg-black shadow-lg
                focus:outline-none hover:bg-gray-900 hover:shadow-none leading" @click="toCopy()">
                        复制
                    </button>
                </div>
            </div>

            <section class="w-full container px-4 mx-auto py-12 bg-white rounded-l mb-12">
                <div class="text-xl md:text-2xl font-black my-3">Q：为什么要做一个Png转SVG的工具？
                </div>
                <div class="text-base md:text-xl mt-3 mb-12">A：不知道，做完才发现<span
                        class="inline-block bg-orange-400 px-1 mx-1">没啥用</span>。
                </div>
                <div class="text-xl md:text-2xl font-black my-3">Q：<span class="inline-block bg-yellow-300">不要</span>
                    做的事情有哪些？
                </div>
                <div class="text-base md:text-xl my-12">A：千万别转换太大的png图，否则就等着卡死吧。转换一个小图标就得了。
                </div>
            </section>

        </div>
    </div>
</template>
<script setup lang="ts">
// import init, { get_svg } from '~/utils/wasm/png-to-svg-wasm';
const init = (await import("png-to-svg-wasm")).default;
const get_svg = (await import("png-to-svg-wasm")).get_svg;
// const optimize = (await import('~/utils/svgo.browser.js')).optimize;
const { optimize } = (await import('svgo')).default;

const copy = (await import('copy-to-clipboard')).default;
const isZip = ref(false)
onMounted(() => {
    init();
})

const { $toast } = useNuxtApp();
const emptyData = "<p style=\"line-height:18rem;text-align:center;\">SVG展示区域</p>";
const svgData = ref("");

async function selectFile(e: { target: { files: string | any[]; }; }) {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = async (evt: any) => {
            const u8buffer = new Uint8Array(evt.target.result);
            let data = await get_svg(u8buffer);
            if (!isZip.value) {
                svgData.value = data;
                return
            }
            console.log(data)
            const result = optimize(data, {
                multipass: true,
                plugins: [
                    'minifyStyles',
                    'convertShapeToPath',
                    'convertEllipseToCircle',
                    'convertPathData',
                    'mergePaths',
                ],
                js2svg: {
                    indent: 2,
                    pretty: true,
                },
            }).data;
            console.log(result)
            svgData.value = result
        };
        file && reader.readAsArrayBuffer(file);



    }
}

useHead({
    title: "Png转SVG",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    meta: [
        { name: 'Keywords', content: 'Png转SVG,在线将PNG转换成SVG格式,免费PNG转换成SVG,Png to SVG,png conver to svg' },
        { name: 'description', content: '一个可以在线将PNG图片转换成SVG格式的工具。A tool that can convert PNG images to SVG format online.' }
    ],
})



function toCopy() {
    copy(svgData.value)
    $toast.success("复制成功");
}



</script>