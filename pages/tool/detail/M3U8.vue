<template>
    <div>
        <textarea v-model="url" rows="2" cols="40" type="text"></textarea>
        <br>
        <button @click="downloadM3U8">download</button>
        <table>
            <tr v-for="(item, index) in tsList">
                <td>{{ item.name }}</td>
                <td>{{ item.status }}</td>
            </tr>
        </table>
    </div>
</template>
<script setup lang="ts">
const { isUrl } = await import("~/utils/validate");
const { $toast } = useNuxtApp();
//@ts-ignore
const AESDecryptor = (await import("~/utils/aes-decryptor")).default;

const tsList = ref<ITsItem[]>([]);
const url = ref("")
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
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/js/mux-mp4.min.js';
    document.getElementsByTagName('body')[0].appendChild(script)
})

async function downloadM3U8() {
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
                name: "video",
                m3u8Src: url.value,
                filePath: "",
                src,
                file: undefined,
                duration,
            });
        }
    })
    if (!tempArr.length) {
        $toast.error("未解析到相关内容");
        return;
    }
    tsList.value.push(...tempArr);
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
    const index = tsList.value.findIndex(v => v.status === DownloadStatus.WAITING);
    if (index === -1) {
        return;
    }
    const item = tsList.value[index];
    tsList.value[index].status = DownloadStatus.DOWNLOADING;
    try {
        let data = await ajax<Buffer>(item.src, "arraybuffer");
        if (aesConf.value.status) {
            data = decodeAES(data, index)
        }
        // 转码mp4
        const file: Uint8Array = await new Promise(resolve => {
            let { duration } = m3u8List.value.find(v => v.src === item.m3u8Src)!;
            const opts = duration
                ? {
                    keepOriginalTimestamps: true,
                    duration: duration,
                    remux: true
                }
                : undefined;

            //@ts-ignore
            const transmuxer = new muxjs.Transmuxer(opts);
            transmuxer.on("data", (segment: any) => {
                const data = new Uint8Array(segment.initSegment.byteLength + segment.data.byteLength);
                data.set(segment.initSegment, 0);
                data.set(segment.data, segment.initSegment.byteLength);
                resolve(data)

            });
            transmuxer.push(new Uint8Array(data));
            transmuxer.flush();
        });

        tsList.value[index].status = DownloadStatus.FINISHED;
        tsList.value[index].file = file;

        const m3u8 = m3u8List.value.find(v => v.src === item.m3u8Src);
        if (m3u8?.status === DownloadStatus.FINISHED) {
            downloadFile(m3u8);
        }
    } catch (e) {
        console.log(e);
        tsList.value[index].status = DownloadStatus.ERROR;
    } finally {
        downloadTs();
    }
}
// 文件下载
async function downloadFile(m3u8: IM3u8Item) {
    const fileDataList = tsList.value
        .filter(v => v.m3u8Src === m3u8.src)
        .map(v => v.file!)
        .filter(v => !!v);
    const fileBlob = new Blob(fileDataList, { type: "video/mp4" });
    const url = URL.createObjectURL(fileBlob);

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

definePageMeta({
    layout: 'empty'
})




</script>