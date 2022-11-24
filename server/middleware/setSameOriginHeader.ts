
export default defineEventHandler((event) => {
    const uList = [
        '/tool/detail/DownloadM3U8'
    ]
    if (uList.indexOf(event.node.req.url!) > -1) {
        event.node.res?.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
        event.node.res?.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
        event.node.res?.setHeader('cross-origin-resource-policy', 'cross-origin')
    }
})