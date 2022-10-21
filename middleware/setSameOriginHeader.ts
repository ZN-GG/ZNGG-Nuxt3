export default function (req: any, res: any, next: any) {
    res?.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
    res?.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
    next();
}