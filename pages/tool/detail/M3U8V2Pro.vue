<template>
    <div class="bg-white">
        <div class="container mx-auto flex flex-wrap py-6">
            <div class="w-full md:w-8/12">
                <h1 class="font-bold text-3xl my-3">M3U8在线下载工具</h1>
                <textarea v-model="url" autofocus
                    class="text-gray-600 w-full bg-gray-100 boder-left boder-bottom outline-none p-3 my-3" rows="4"
                    placeholder="输入有效的M3U8地址"></textarea>
                <div class="flex justify-between items-center">
                    <div class=""><span class="font-bold text-lg text-gray-600"><span v-text="message"></span></span>
                    </div>
                    <div>
                        <button v-show="status == DownloadStatus.WAITING"
                            class="bg-blue-600 text-white py-2 text-center hover:bg-blue-800 cursor-pointer px-8 select-none"
                            @click="downloadM3U8">开始下载</button>
                        <button v-show="status == DownloadStatus.DOWNLOADING"
                            class="bg-red-600 text-white py-2 text-center hover:bg-red-800 cursor-pointer px-8 select-none"
                            @click="stop">停止</button>
                        <button v-show="status == DownloadStatus.FINISHED"
                            class="btn-bg-save text-white py-2 text-center hover:bg-blue-800 cursor-pointer px-8 select-none"
                            @click="save">保存</button>
                    </div>

                </div>
                <div class="item-box flex flex-wrap my-4 overflow-y-scroll pt-6">
                    <div v-show="tsList.length <= 0" class="flex w-full justify-center items-center">
                        <div>
                            <h1 class="text-xl font-bold text-gray-400">还未开始下载 😉</h1>
                            <br>
                            <br>
                        </div>
                    </div>
                    <div v-for="(item, index) in tsList" @click="reTry(index)"
                        class="cursor-pointer select-none w-12 h-8 m-1 leading-8 text-center text-white" :class="((item.status == DownloadStatus.WAITING || item.status == DownloadStatus.DOWNLOADING) ? 'bg-gray-500' : '') +
    (item.status == DownloadStatus.FINISHED ? 'bg-green-500' : '') +
    (item.status == DownloadStatus.ERROR ? 'bg-red-700' : '')
">
                        {{ index + 1 }}
                    </div>
                </div>
                <div class="py-2">
                    <br>
                    <hr>
                    <br>
                    <p>温馨提示：</p>
                    <span class="leading-4 inline-block"><span
                            class="inline-block select-none w-8 h-4 m-1 align-middle leading-8 text-center text-white bg-gray-500">
                        </span><span class="align-middle">表示下载中</span></span>
                    <span class="leading-4 inline-block"><span
                            class="inline-block select-none w-8 h-4 m-1 align-middle leading-8 text-center text-white bg-green-500">
                        </span><span class="align-middle">表示完成</span></span>
                    <span class="leading-4 inline-block"><span
                            class="inline-block select-none w-8 h-4 m-1 align-middle leading-8 text-center text-white bg-red-700">
                        </span><span class="align-middle">表示失败</span></span>
                    <p>点击<span class="leading-4 inline-block"><span
                                class="inline-block select-none w-8 h-4 m-1 align-middle leading-8 text-center text-white bg-red-700">
                            </span></span>可以重新下载该块内容。</p>
                    <br>
                    <p>将下载链接填入后，点击开始下载，开始解析视频内容，之后出现很多颜色块，等到所有色块均变成后绿色后表示下载完成，此时会自动弹出下载框，并且显示保存按钮，您也可以点击保存按钮进行下载（下载后的视频格式为mp4）。
                    </p>

                </div>
                <div class="mt-14 pb-10">
                    <br>
                    <hr>
                    <br>
                    <p class="font-bold text-lg">相关文章</p>
                    <div class="flex flex-wrap mt-2">
                        <div class="w-4/12">
                            <div class="bg-gray-200 w-full h-full">
                                <img class="p-2" src="https://cdn.zngg.net/upload/image/cover/1059422373599510528.png"
                                    alt="">
                                <h2 class="p-2 hover:font-bold"><a
                                        href="https://www.zngg.net/read/post/1059422545926684672"
                                        target="_blank">如何获取到视频网站的视频资源地址？</a></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-4/12 px-5 py-20">
                <adsbygoogle/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { isUrl } = await import("~/utils/validate");
const { $toast } = useNuxtApp();
const route = useRoute()
//@ts-ignore
const AESDecryptor = (await import("~/utils/aes-decryptor")).default;

const tsList = ref<ITsItem[]>([]);
const url = ref("")
const message = ref("空闲")
const status = ref(DownloadStatus.WAITING)
// AES 视频解密配置
const aesConf = ref<AesConf>({
    status: false,
    method: '', // 加密算法
    uri: '', // key 所在文件路径
    iv: '', // 偏移值
    key: '', // 秘钥
    decryptor: null, // 解码器对象
    stringToBuffer: function (str: string | undefined) {
        return new TextEncoder().encode(str)
    }
})

interface AesConf {
    status: boolean;
    method: string;
    uri: string;
    iv: string | Uint8Array;
    key: string;
    decryptor: any;
    stringToBuffer: (string: string | undefined) => Uint8Array;
}
const enum DownloadStatus {
    WAITING,
    DOWNLOADING,
    FINISHED,
    ERROR,
}
interface ITsItem {
    status: DownloadStatus;
    times: number;
    src: string;
    m3u8Src: string;
    name: string;
    filePath: string;
    file?: Uint8Array;
    duration: number;
}
interface IM3u8Item {
    status: DownloadStatus;
    src: string;
    name: string;
    filePath: string;
    percentage: number;
    total: number;
    doneNum: number;
    duration: number;
}
const m3u8List = computed<IM3u8Item[]>(() => {
    const arr = [...new Set(tsList.value.map(v => v.m3u8Src))];
    const data: IM3u8Item[] = arr.map(m3u8Src => {
        const list = tsList.value.filter(v => v.m3u8Src === m3u8Src)!;
        const [item] = list;
        let status = item.status;
        const total = list.length;
        const doneNum = list.filter(li => li.status === DownloadStatus.FINISHED).length;
        const percentage = Number(((doneNum / total) * 100).toFixed(2));
        const duration = list.reduce((t, v) => t + v.duration, 0);
        if (tsList.value.some(t => t.status === DownloadStatus.DOWNLOADING)) {
            status = DownloadStatus.DOWNLOADING;
        } else if (tsList.value.some(t => t.status === DownloadStatus.ERROR)) {
            status = DownloadStatus.ERROR;
        } else if (percentage >= 100) {
            status = DownloadStatus.FINISHED;
        }
        return {
            name: item.name,
            src: m3u8Src,
            filePath: item.filePath,
            status,
            percentage,
            total,
            doneNum,
            duration,
        };
    });
    return data;
});


onMounted(() => {
    let urlParam = route.query.url
    if (urlParam) {
        url.value = urlParam as string;
    }

    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/js/mux-mp4.min.js';
    document.getElementsByTagName('body')[0].appendChild(script)
})

async function downloadM3U8() {
    tsList.value = ([]);
    status.value = DownloadStatus.DOWNLOADING;
    message.value = "正在解析URL";
    const { origin } = new URL(url.value);
    let data = await ajax(url.value);
    if (data.indexOf('#EXT-X-KEY') > -1) {
        aesConf.value.status = true
        aesConf.value.method = (data.match(/(.*METHOD=([^,\s]+))/) || ['', '', ''])[2]
        aesConf.value.uri = (data.match(/(.*URI="([^"]+))"/) || ['', '', ''])[2]
        aesConf.value.iv = (data.match(/(.*IV=([^,\s]+))/) || ['', '', ''])[2]
        aesConf.value.iv = aesConf.value.iv ? aesConf.value.stringToBuffer(aesConf.value.iv) : ''
        aesConf.value.uri = applyURL(aesConf.value.uri, url.value)
        await getAES();
    }
    if (data.indexOf("#EXT-X-STREAM-INF") > -1) {
        console.log("origin", origin);
        let resUrl = (data.match(/(.+?m3u8)/) || ['', '', ''])[0];
        url.value = applyURL(resUrl, origin)
        downloadM3U8()
        return
    }
    const lines = data.split(/\s/);
    const tempArr: ITsItem[] = [];
    lines.forEach((item, index) => {
        if (/((\.ts)|(\.jpg)|(\.png)|(\.gif)|(\.image))(\?.+)?$/i.test(item)) {
            // 计算持续时间
            let duration = 0;
            const durationItem = lines[index - 1];
            const extinf = "#EXTINF:";
            if (durationItem.includes(extinf)) {
                duration = parseFloat(durationItem.split(extinf)[1]) || 0;
            }
            const src = getFullUrl(origin, item);
            tempArr.push({
                status: DownloadStatus.WAITING,
                times: 0,
                name: "ZNGG.NET_" + new Date().getTime(),
                m3u8Src: url.value,
                filePath: "",
                src,
                file: undefined,
                duration,
            });
        }
    })
    if (!tempArr.length) {
        message.value = "未解析到相关内容"
        $toast.error("未解析到相关内容");
        return;
    }
    tsList.value.push(...tempArr);
    message.value = "正在下载 🚀"
    // 批量下载
    downloadTsList();

}

// 批量下载ts
function downloadTsList() {
    for (let i = 0; i < 30 - tsList.value.filter(v => v.status === DownloadStatus.DOWNLOADING).length; i++) {
        downloadTs();
    }
}

async function downloadTs() {
    if (tsList.value.length <= 0) {
        return
    }
    const index = tsList.value.findIndex(v => v.status === DownloadStatus.WAITING && v.times < 12);
    if (index === -1) {
        return;
    }
    const item = tsList.value[index];
    tsList.value[index].status = DownloadStatus.DOWNLOADING;
    try {
        let r = '?r=' + new Date().getTime() + Math.random() + Math.random();
        let data = await ajax<Buffer>(item.src + r, "arraybuffer");
        if (tsList.value.length <= 0) {
            return
        }
        if (aesConf.value.status) {
            data = decodeAES(data, index)
        }
        // 转码mp4
        const file: Uint8Array = await new Promise(resolve => {
            let { duration } = m3u8List.value.find(v => v.src === item.m3u8Src)!;
            //@ts-ignore
            const transmuxerAudio = new muxjs.Transmuxer({
                keepOriginalTimestamps: true,
                duration: duration,
                remux: false
            });
            //@ts-ignore
            const transmuxerVideo = new muxjs.Transmuxer({
                keepOriginalTimestamps: true,
                duration: duration,
            });
            let isAudio = true;
            transmuxerVideo.on("data", (segment: any) => {
                isAudio = false;
                const data = new Uint8Array(segment.initSegment.byteLength + segment.data.byteLength);
                data.set(segment.initSegment, 0);
                data.set(segment.data, segment.initSegment.byteLength);
                resolve(data)
            });
            transmuxerVideo.push(new Uint8Array(data));
            transmuxerVideo.flush();
            if (isAudio) {
                transmuxerAudio.on("data", (segment: any) => {
                    isAudio = true;
                    const data = new Uint8Array(segment.initSegment.byteLength + segment.data.byteLength);
                    data.set(segment.initSegment, 0);
                    data.set(segment.data, segment.initSegment.byteLength);
                    resolve(data)
                });
                transmuxerAudio.push(new Uint8Array(data));
                transmuxerAudio.flush();
            }
        });
        tsList.value[index].status = DownloadStatus.FINISHED;
        tsList.value[index].file = file;

        const m3u8 = m3u8List.value.find(v => v.src === item.m3u8Src);
        if (m3u8?.status === DownloadStatus.FINISHED) {
            downloadFile(m3u8);
        }
    } catch (e) {
        console.log(e);
        if (tsList.value.length <= 0) {
            return
        }
        if (tsList.value[index].times >= 10) {
            tsList.value[index].status = DownloadStatus.ERROR;
        } else {
            tsList.value[index].times = tsList.value[index].times + 1
            tsList.value[index].status = DownloadStatus.WAITING;
        }
    } finally {
        downloadTs();
    }
}

function reTry(index: number) {
    tsList.value[index].status = DownloadStatus.WAITING;
    downloadTs();
}

// 文件下载
async function downloadFile(m3u8: IM3u8Item) {
    const fileDataList = tsList.value
        .filter(v => v.m3u8Src === m3u8.src)
        .map(v => v.file!)
        .filter(v => !!v);
    const fileBlob = new Blob(fileDataList, { type: "video/mp4" });
    const url = URL.createObjectURL(fileBlob);
    message.value = "下载完成，请保存 🤪"
    status.value = DownloadStatus.FINISHED;
    downLoad(url, `${m3u8.name}.mp4`);

}

// 下载
let a: HTMLAnchorElement;
function downLoad(url: string, fileName = "") {
    if (!a) {
        a = document.createElement("a");
    }
    a.href = url;
    a.download = fileName;
    a.click();
}

// 合成URL
function applyURL(targetURL: string, baseURL: string) {
    baseURL = baseURL || location.href
    if (targetURL.indexOf('http') === 0) {
        // 当前页面使用 https 协议时，强制使 ts 资源也使用 https 协议获取
        if (location.href.indexOf('https') === 0) {
            return targetURL.replace('http://', 'https://')
        }
        return targetURL
    } else if (targetURL[0] === '/') {
        let domain = baseURL.split('/')
        return domain[0] + '//' + domain[2] + targetURL
    } else {
        let domain = baseURL.split('/')
        domain.pop()
        return domain.join('/') + '/' + targetURL
    }
}

// 获取AES配置
async function getAES() {
    // alert('视频被 AES 加密，点击确认，进行视频解码')
    let res = await ajax(aesConf.value.uri, "arraybuffer")
    aesConf.value.key = res
    aesConf.value.decryptor = new AESDecryptor()
    // aesConf.value.decryptor.constructor()
    aesConf.value.decryptor.expandKey(aesConf.value.key);
}

// ts 片段的 AES 解码
function decodeAES(data: any, index: number) {
    let iv: any = aesConf.value.iv || new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, index])
    return aesConf.value.decryptor.decrypt(data, 0, iv.buffer || iv)
}


function ajax<T = string>(url: string, type: XMLHttpRequestResponseType = "") {
    return new Promise<T>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        if (type) {
            xhr.responseType = type;
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                const status = xhr.status;
                if (status >= 200 && status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(new Error("请求失败"));
                }
            }
        };

        xhr.open("GET", url, true);
        xhr.send(null);
    });
}

function stop() {
    message.value = "空闲";
    status.value = DownloadStatus.WAITING;
    tsList.value = ([]);
}

function save() {
    const m3u8 = m3u8List.value.find(v => v.status === DownloadStatus.FINISHED);
    if (m3u8?.status === DownloadStatus.FINISHED) {
        downloadFile(m3u8);
    }
}

const getFullUrl = (...urls: string[]): string => {
    urls.slice(1).forEach((value, index) => {
        if (isUrl(value)) {
            urls.slice(0, index + 1).forEach((v, k) => {
                urls[k] = "";
            });
        }
    });
    const arr = urls.filter(v => !!v).map(v => v.replace(/\/$/, "").replace(/^\//, ""));
    return arr.join("/");
}

useHead({
    title: 'M3U8 视频下载V2Pro版',
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    meta: [
        {
            name: 'Keywords',
            content: 'M3U8 视频下载V2Pro版是一个在线电影网站视频下载工具，解决在线视频电影网站无法下载视频的问题。',
        },
        {
            name: 'description',
            content: '在线M3U8视频下载,在线电影视频下载,视频网站视频下载V2Pro版',
        },
    ],
});
</script>
<style scoped>
.item-box {
    min-height: 8rem;
    max-height: 24rem;
}

/* 整个滚动条 */
.item-box::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

/* 滚动条上的滚动滑块 */
.item-box::-webkit-scrollbar-thumb {
    background-color: #49b1f5;
    /* 关键代码 */
    background-image: -webkit-linear-gradient(45deg,
            rgba(255, 255, 255, 0.4) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.4) 75%,
            transparent 75%,
            transparent);
    border-radius: 32px;
}

/* 滚动条轨道 */
.item-box::-webkit-scrollbar-track {
    background-color: #dbeffd;
    border-radius: 32px;
}

.btn-bg-save {
    background-color: #49b1f5;
    /* 关键代码 */
    background-image: -webkit-linear-gradient(45deg,
            rgba(255, 255, 255, 0.4) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.4) 75%,
            transparent 75%,
            transparent);
}
</style>