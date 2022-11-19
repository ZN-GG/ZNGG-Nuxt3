<template>
    <div class="overflow-hidden">
        <div class="container px-4 mx-auto py-6">
            <iframe src="/tool/detail/office/word" width="100%" height="400px" class="overflow-hidden"
                ref="iframe"></iframe>
            <button @click="convert">Convert</button>
        </div>
    </div>
</template>
<script setup lang="ts">

const iframe = ref<HTMLIFrameElement>(null)

function convert() {
    iframe.value.contentWindow.postMessage({
        cmd: 'download',
        params: {
            "url": "https://api.zngg.net/api/common/office/wordConvert",
        }
    }, '*')
}

definePageMeta({
    layout: "empty"
})

</script>