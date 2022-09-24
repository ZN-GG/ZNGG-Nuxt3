<template>
    <div class="bg-white">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">Unicode中文转换</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full container px-4 mx-auto py-12">
            <div class="w-full flex flex-wrap">
                <div class="relative w-full md:w-6/12 md:pr-2">
                    <div class="relative">
                        <textarea v-model="text" autofocus
                            class="text-gray-600 w-full bg-gray-100 boder-left boder-bottom outline-none p-3"
                            rows="8"></textarea>
                        <span class="absolute px-2 py-1 text-xs text-white bg-blue-500 rounded right-4 bottom-6">{{
                                text.length
                        }}</span>
                    </div>
                </div>
                <div class="relative w-full md:w-6/12 md:pl-2">
                    <div class="relative">
                        <textarea v-model="result"
                            class="text-gray-600 w-full bg-gray-100 boder-left boder-bottom outline-none p-3"
                            rows="8"></textarea>
                        <span class="absolute px-2 py-1 text-xs text-white bg-blue-500 rounded right-4 bottom-6">{{
                                result.length
                        }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-row flex-wrap">
                <button
                    class="flex my-2 mr-2 py-2 px-4 font-medium tracking-widest text-white bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                    @click="toChinese()">
                    转中文
                </button>
                <button
                    class="flex m-2 py-2 px-4 font-medium tracking-widest text-white bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                    @click="toUnicode()">
                    转Unicode
                </button>
                <button class=" flex m-2 py-2 px-4 font-medium tracking-widest text-white bg-black shadow-lg
                focus:outline-none hover:bg-gray-900 hover:shadow-none" @click="toCopy()">
                    {{ copyText }}
                </button>
                <button class="flex md:m-2 my-2 py-2 px-4 font-medium tracking-widest text-white bg-red-800 shadow-lg
                focus:outline-none hover:bg-red-900 hover:shadow-none" @click="text = ''; result = ''">
                    清空
                </button>
            </div>
        </section>
        <section class="bg-white w-full container mx-auto  px-4 py-6">

            <article class="prose lg:prose-xl" style="max-width: none;">
                <h4>使用说明：</h4>
                <blockquote>
                    <p>开发过程中我们难免遇到转码的问题，最主要的就是中文这块，很多程序在编译时会把中文转换成Unicode编码，其典型特征就是编码就是"\uxxxx",因此做了这个小工具。</p>
                </blockquote>
                <ul>
                    <li>Unicode转中文</li>
                    <li>中文转Unicode。</li>
                </ul>
            </article>
        </section>
    </div>
</template>
<script setup lang="ts">

const text = ref("")
const result = ref("")
const copyText = ref("一键复制")
const { $toast } = useNuxtApp()

function toChinese() {
    // Unicode => 中文
    result.value = Base64.encode(text.value);
}

function toUnicode() {
    // 中文 => Unicode
    result.value = Base64.decode(text.value);
}

//string encoding-decoding
let Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (input) {
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function (input) {
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },
    _utf8_encode: function (string: string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    _utf8_decode: function (utftext: string) {
        let string = "";
        let i = 0;
        let c = 0, c1 = 0, c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                let c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

function toCopy() {
    navigator.clipboard.writeText(result.value)
    copyText.value = "复制完成"
    $toast.success("复制完成")
    window.setTimeout(function () {
        copyText.value = "一键复制"
    }, 800)

}


useHead({
    title: "Unicode中文转换",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: 'Unicode转中文,中文转Unicode,Unicode与中文互转,在线Unicode转换工具' },
        { name: 'description', content: '在线一键Unicode转中文，一键中文转Unicode，一键Unicode与中文互转，程序员必备的转换神器。' }
    ],
})


</script>