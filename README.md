# ZNGG在线工具Nuxt3版

基于nuxt3开发的在线工具网站，目前包括了在线工具和文章分享，就目前而言说是一个在线工具网站，不如说是一个个人博客+在线工具的网站。我的目标是开发一个**简单漂亮**的在线工具网站。

- 简单
- 漂亮
- 利于使用
- 利于阅读
- 利于书写

技术栈：springboot + redis + mysql + nuxt3 + tailwind

![](https://img.shields.io/github/languages/count/ZN-GG/ZNGG-Nuxt3)
![](https://img.shields.io/github/languages/top/ZN-GG/ZNGG-Nuxt3)

> 目前后端没有开源的打算。

## 工具列表
- 英文大小写转换
- 时间戳在线转换
- 图片转Base64
- flv直播播放器
- NPlayer播放器（m3u8）
- 文本去重
- 微博图片生成
- 在线录屏
- 造新词生成器
- CSS边框可视化
- CSS渐变背景工具
- Unicode中文互转
- Base64编码解码
- 国庆头像生成器
- ...


## 安装

克隆项目后先安装依赖:

```bash
# yarn
yarn install
```
安装完成之后就可以启动来看看效果了。

## 启动

```bash
yarn dev
```

在浏览器中输入: http://localhost:3000 即可访问。

## 生产

打包:

```bash
yarn build
```

预览:

```bash
yarn preview
```

## 依赖
项目的package.json中有所有的依赖项目。
