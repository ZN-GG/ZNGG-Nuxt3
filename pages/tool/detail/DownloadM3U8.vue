<template>
  <div class="bg-white">
    <section class="bg-gray-100">
      <div class="container px-4 mx-auto">
        <div class="md:flex md:-mx-4 md:items-center py-8">
          <div class="md:w-1/2 px-4">
            <h1 class="text-2xl text-black">在线下载 M3U8 视频</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="w-full container px-4 mx-auto py-12">
      <div class="w-full flex flex-wrap bg-black text-sm">
        <video controls v-if="state.videoUrl" :src="state.videoUrl"></video>
        <div class="overflow-auto h-20 w-full" v-else>
          <div v-for="msg in state.logs">
            <div class="text-white">{{ msg }}</div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-wrap">
        <div class="relative w-full">
          <div class="relative">
            <textarea
              v-model="text"
              autofocus
              class="text-gray-600 w-full bg-gray-100 boder-left boder-bottom outline-none p-3 h-full"
              rows="8"
              placeholder="输入有效的M3U8地址"
            ></textarea>
            <span
              class="absolute px-2 py-1 text-xs text-white bg-blue-500 rounded right-4 bottom-6"
              >{{ text.length }}</span
            >
          </div>
        </div>
      </div>
      <button
        class="flex my-2 mr-2 py-2 px-4 font-medium tracking-widest text-white bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
        @click="startDownload"
      >
        开始下载
      </button>
    </section>
    <section class="bg-white w-full container mx-auto px-4 py-6">
      <article class="prose lg:prose-xl" style="max-width: none">
        <h4>使用说明：</h4>
        <blockquote>
          <p>输入 m3u8 地址，点击下载就好了。</p>
        </blockquote>
        <ul>
          <li>Base64加密</li>
          <li>Base64解密</li>
          <li>相关工具：<a href="ImageToBase64">在线下载 M3U8 视频</a></li>
        </ul>
      </article>
    </section>
  </div>
</template>
<script setup lang="ts">
import m3u8tomp4, { setLogger } from '@zackdk/m3u8tomp4';
import { reactive } from 'vue';

const state = reactive({ videoUrl: '', logs: [] });
const text = ref('');
const { $toast } = useNuxtApp();

const startDownload = async () => {
  console.log(m3u8tomp4);
  console.log(setLogger);
  if (!text.value) {
    $toast.error('请输入有效的 M3U8 地址');
    return;
  }
  //m3u8tomp4.setLogger((msg) => console.log(msg));
  setLogger((msg) => {
    state.logs.unshift(msg);
  });
  const data = await m3u8tomp4(text.value);
  const url = URL.createObjectURL(
    new Blob([data.buffer], { type: 'video/mp4' }),
  );

  state.videoUrl = url;
};

useHead({
  title: '在线下载 M3U8 视频',
  titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    {
      name: 'Keywords',
      content: 'm3u8,download m3u8 online',
    },
    {
      name: 'description',
      content: '在线下载 M3U8 视频, 合并为 MP4',
    },
  ],
});
</script>
