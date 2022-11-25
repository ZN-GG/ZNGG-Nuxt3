<template>
    <div class="">
        <div class="convert-bg"></div>
        <div class="office-bg pb-28">
            <div class="container mx-auto">
                <div class="bg-white px-6 rounded-2xl relative shadow-lg">
                    <div class="pt-4">
                        <div class="text-center">
                            <h1 class="text-2xl font-bold">Word 转 PDF</h1>
                        </div>
                    </div>
                    <div v-show="fileList.length == 0" class="upload-box py-6">
                        <div class="border-gray-500 border-2 border-dashed relative h-72">
                            <div class="in-upload-box">
                                <img src="/img/office/upload-btn.svg" class="mx-auto w-32 h-32 mb-4" alt="">
                            </div>
                            <input ref="inputElement" type="file" id="file"
                                accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                style="opacity: 0;position: absolute;cursor: pointer;width: 100%;height: 100%;left: 0;top: 0;"
                                @change="selectFile">
                            <div class="in-upload-box">
                                <div @click="inputElement?.click"
                                    class="mt-32 btn-3 bg-blue-600 text-white py-2 text-center hover:bg-blue-800 cursor-pointer px-8">
                                    选择文件
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="fileList.length > 0" class="py-6">
                        <div class="border-gray-500 border-2 border-dashed relative p-4 md:p-6">
                            <ul v-if="!isConverting">
                                <li v-for="(item, index) in fileList"
                                    class="flex flex-wrap border-b-2 py-1 w-full mb-2 justify-between">
                                    <div class="w-full md:w-4/12 flex items-center">
                                        <p class="font-bold break-words">{{ item.name }}</p>
                                    </div>

                                    <div v-show="item.status == 1" class="md:w-4/12 flex items-center justify-center"><i
                                            class="iconfont icon-ok text-green-600"
                                            style="font-size: 24px;"></i><span>&nbsp;上传完成</span></div>
                                    <div v-show="item.status == 0" class="md:w-4/12 flex items-center justify-center"><i
                                            class="iconfont icon-upload text-blue-600"
                                            style="font-size: 24px;"></i><span>&nbsp;正在上传</span></div>

                                    <div class="md:w-4/12 flex items-center justify-end"><i @click="deleteFile(index)"
                                            class="iconfont icon-ashbin" style="font-size: 24px;"></i></div>
                                </li>
                            </ul>
                            <ul v-show="isConverting">
                                <li v-for="(item, index) in fileList"
                                    class="flex flex-wrap border-b-2 py-1 w-full mb-2 justify-between">
                                    <div class="w-full md:w-4/12 flex items-center">
                                        <p class="font-bold break-words">{{ item.name }}</p>
                                    </div>

                                    <div v-show="item.status == 1" class="md:w-4/12 flex items-center justify-center"><i
                                            class="iconfont icon-ok text-green-600"
                                            style="font-size: 24px;"></i><span>&nbsp;转换完成</span></div>
                                    <div v-show="item.status == 0" class="md:w-4/12 flex items-center justify-center"><i
                                            class="iconfont icon-upload text-blue-600"
                                            style="font-size: 24px;"></i><span>&nbsp;正在转换</span></div>

                                    <div class="md:w-4/12 flex items-center justify-end"><a v-show="item.status == 1"
                                            target="_blank"
                                            :href="'https://api.zngg.net/api/common/download/taskTempFile/' + item.resultId + '/' + item.name.substring(0, item.name.lastIndexOf('.')) + '.pdf'"><i
                                                class="iconfont icon-falling" style="font-size: 24px;"></i></a></div>
                                </li>
                            </ul>
                            <div class="mt-24">
                                <div v-show="!isDone" @click="convert"
                                    class="bg-blue-600 text-white py-2 text-center hover:bg-blue-800 cursor-pointer px-8">
                                    {{ isConverting ? "正在转换" : "开始转换" }}</div>
                                <div v-show="isDone" @click="reset"
                                    class="bg-gray-600 text-white py-2 text-center hover:bg-green-900 cursor-pointer px-8">
                                    重新开始</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { $toast } = useNuxtApp()
const inputElement = ref<HTMLInputElement>()
type FileBean = {
    name: string,
    suffixName: string,
    // 0 正在，1成功，2上传
    status: number,
    fileId: string,
    resultId: any
}
const isConverting = ref(false)
const isDone = ref(false)
const fileList = ref<FileBean[]>([])

async function selectFile(e: any) {

    if (e.target.files.length > 0) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = async (evt: any) => {
                let item: FileBean = {
                    name: file.name,
                    suffixName: '',
                    status: 0,
                    fileId: '',
                    resultId: ''
                };
                fileList.value.push(item);
                const index = fileList.value.length - 1;

                let formData = new FormData();
                formData.append("inputFile", file)

                fetch("https://api.zngg.net/api/common/upload/tempFile", {
                    method: "POST",
                    body: formData,
                }).then(res => res.json()).then(data => {
                    if (data.success) {
                        fileList.value[index].status = 1
                        fileList.value[index].fileId = data.data.id
                    } else {
                        fileList.value[index].status = 2
                    }
                    console.log(fileList);

                })

            };
            file && reader.readAsArrayBuffer(file);
            inputElement.value!.value = ""

        }
    }
}

function convert() {
    if (isConverting.value) {
        return
    }
    isConverting.value = true;
    isDone.value = false;
    fileList.value.forEach((item, index) => {
        if (fileList.value[index].status != 1) {
            if (fileList.value[index].status == 0) {
                $toast.error("还有文件未上传成功")
            } else {
                $toast.error("请删除上传失败的文件")
            }
            return
        }
        fileList.value[index].status = 0
        fetch("https://api.zngg.net/api/common/office/wordToPDF/" + item.fileId, {
            method: "GET",
        }).then(res => res.json()).then(data => {
            if (data.success) {
                fileList.value[index].resultId = data.data.id
                console.log(fileList.value)
            } else {

            }
        })
    })
    queryTask()
}


function queryTask() {
    setTimeout(() => {

        let formData = new FormData();
        let done = true;
        fileList.value.forEach((item, index) => {
            if (item.status == 0) {
                formData.append("ids", item.resultId)
                done = false
            }
        })
        if (done) {
            isDone.value = true;
            return
        }


        fetch("https://api.zngg.net/api/common/taskDetail", {
            method: "POST",
            body: formData
        }).then(res => res.json()).then(data => {
            if (data.success) {
                console.log(data);

                data.data.forEach((item: any, index: number) => {
                    if (item.state == 1) {
                        fileList.value.forEach((list, i) => {
                            if (list.resultId == item.id) {
                                fileList.value[i].status = 1
                            }
                        })
                    }
                });

            } else {

            }
            queryTask()
        })
    }, 2000);

}
function reset() {
    isConverting.value = false
    isDone.value = false
    fileList.value = []
}
async function deleteFile(index: number) {
    fileList.value.splice(index, 1)
}

definePageMeta({
    layout: "empty"
})

</script>
<style scoped>
.convert-bg {
    height: 130px;
    background: url(/img/office/office_banner.svg) bottom no-repeat;
    background-color: #f1f3fe;
}

.office-bg {
    background-color: #f1f3fe;
}

.in-upload-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>