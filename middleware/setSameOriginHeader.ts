
export default function (req: any, res: any, next: any) {
    const uList = [
        '/tool/detail/DownloadM3U8'
    ]
    if (uList.indexOf(req.url) > -1) {
        res?.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
        res?.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
        res?.setHeader('cross-origin-resource-policy', 'cross-origin')
    }
    next();
}
