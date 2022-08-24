<template>
    <div>
        <header class="page-header header-app">
            <div class="header-app__background-transparent"></div>
            <div class="header-app__background-color js-header"
                :style="'background-image: ' + styleConfig.type + '-gradient(' + customColor + ');'"></div>
        </header>
        <main class="js-body-content">
            <section class="panel-app">
                <section class="app-gradient">
                    <div class="app-gradient__color">
                        <div class="app-gradient__color-background js-background"
                            :style="'background-image: linear-gradient(' + customColor.replace(/[0-9]\d*deg/g, '90deg').replace('circle', '90deg') + ');'">
                        </div>
                        <div class="app-gradient__points js-drag" @click="addPoint">
                            <div v-for="(item, index) in appGradientPointList" class="js-draggable app-gradient__point"
                                :class="item.isActive ? 'is-active' : ''" touch-action="none" v-bind:data-x="item.tranX"
                                v-bind:index="index" :style="'transform: translateX(' + item.tranX + 'px);'"
                                @mousedown.native="selectPoint(index)">
                                <div class="app-gradient__point-background"></div>
                                <div class="app-gradient__point-visual"></div>
                                <div class="app-gradient__point-color"
                                    :style="'background-color: rgb(' + item.rgb.r + ', ' + item.rgb.g + ', ' + item.rgb.b + ', ' + item.a + ');'">
                                </div><label class="app-gradient__point-label">
                                    <div class="app-gradient__point-label-bg"></div><input
                                        class="app-gradient__point-input" disabled :value="item.percent">
                                </label>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="app-color">
                    <div class="row">
                        <div class="col-xs-24 col-lg-8">
                            <div class="colorPicker">
                            </div>
                        </div>
                        <div class="col-xs-24 col-md-12 col-lg-8">
                            <div class="app-color__inputs js-controls">
                                <div class="controls-title">Color Code</div>
                                <div class="extras">
                                    <div class="hex"><input class="" type="text" maxlength="7"
                                            v-model="appGradientPointList[selectPointConfig.index].hex"
                                            @input="hexChange"><label class="">hex</label>
                                    </div>
                                    <div class="colorFields">
                                        <div class="color r"><input class="" type="text" maxlength="15"
                                                @input="rgbChange"
                                                v-model="appGradientPointList[selectPointConfig.index].rgb.r"><label
                                                class="">r</label></div>
                                        <div class="color g"><input class="" type="text" maxlength="15"
                                                @input="rgbChange"
                                                v-model="appGradientPointList[selectPointConfig.index].rgb.g"><label
                                                class="">g</label></div>
                                        <div class="color b"><input class="" type="text" maxlength="15"
                                                @input="rgbChange"
                                                v-model="appGradientPointList[selectPointConfig.index].rgb.b"><label
                                                class="">b</label></div>
                                        <div class="color a"><input class="" type="text" maxlength="15"
                                                @input="rgbChange"
                                                v-model="appGradientPointList[selectPointConfig.index].a"><label
                                                class="">a</label></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-24 col-md-12 col-lg-8">
                            <div class="app-color__stops">
                                <div class="app-color__stops-title">
                                    <div class="app-color__stop-color"></div>
                                    <div class="app-color__stop-hex">
                                        <h3>Hex</h3>
                                    </div>
                                    <div class="app-color__stop-position">
                                        <h3>Stop</h3>
                                    </div>
                                    <div class="app-color__stop-action">
                                        <h3>⊕</h3>
                                    </div>
                                </div>
                                <div class="js-stops">
                                    <div v-for="(item, index) in tempSortList" class="app-color__stop"
                                        :class="item.isActive ? 'is-active' : ''">
                                        <div class="app-color__stop-color">
                                            <div class="app-color__stop-color-bg">
                                                <div class="app-color__stop-color-tile"
                                                    :style="'background-color: rgb(' + item.rgb.r + ', ' + item.rgb.g + ', ' + item.rgb.b + ', ' + item.a + ');'">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="app-color__stop-hex"><input disabled :value="item.hex"></div>
                                        <div class="app-color__stop-position"><input disabled :value="item.percent">
                                        </div>
                                        <div class="app-color__stop-action"><button
                                                @click="clearPoint(item.percent, item.hex)"
                                                class="app-color__stop-action-button">×</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="app-options">
                    <div class="row">
                        <div class="col-xs-24">
                            <div class="app-options__content">
                                <div class="app-option"> <button @click="selectStyleType('linear')"
                                        class="app-option__button app-option__button--linear js-button-linear"
                                        :class="styleConfig.type == 'linear' ? 'is-active' : ''">
                                        <span class="app-option__button-icon"></span> Linear </button> <button
                                        @click="selectStyleType('radial')"
                                        class="app-option__button app-option__button--radial js-button-radial"
                                        :class="styleConfig.type == 'radial' ? 'is-active' : ''"> <span
                                            class="app-option__button-icon"></span> Radial </button>
                                </div>
                                <div class="app-option"
                                    :style="'display: ' + (styleConfig.type == 'linear' ? 'block' : 'none') + ';'">
                                    <div class="app-option__angles">
                                        <div class="app-option__angle js-angle">
                                            <div class="app-option__angle-center js-pointer"
                                                :style="'transform: translateZ(0px) rotate(' + customDeg + 'deg);'">
                                                <div class="app-option__angle-pointer"></div>
                                            </div>
                                        </div>
                                        <input class="app-option__input js-angle-input" @input="degChange"
                                            :value="customDeg + '°'">
                                    </div>
                                </div>

                                <div class="app-option">
                                    <img class="input-file js-upload"> <label for="file" @click="downloadImg()">
                                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                            <g stroke="#BBBFC5" stroke-width="2" fill="none" fill-rule="evenodd">
                                                <path d="M1 1h14v14H1z"></path>
                                                <path d="M1 9l3-3 9 9"></path>
                                                <path d="M8 10l3-3 4 4"></path>
                                            </g>
                                        </svg> Download </label>
                                </div>
                                <div class="app-option">
                                    <h1 class="">CSS渐变背景工具</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section class="panel-code">
                <div class="row">
                    <div class="col-xs-24 col-md-24">
                        <section class="code-editor">
                            <div class="code-editor__column">
                                <div class="code-editor__column-tabs"></div>
                                <div class="code-editor__column-numbers">1<br>2<br>3<br>4<br>5<br>6<br></div>
                            </div>
                            <div class="code-editor__block">
                                <div class="code-editor__tabs">
                                    <div class="code-editor__tab is-active">
                                        CSS
                                    </div>
                                    <div class="code-editor__compat"> <label> <input type="checkbox" class="js-compat">
                                            <div class="compat__text">
                                                Max Compatibility <span>(IE6+)</span>
                                            </div>
                                            <div class="compat__checkbox"></div>
                                        </label>
                                    </div>
                                </div>
                                <div class="code-editor__input"> <code class="code-editor__input-code js-code"
                                        id="code"><span class="blue">background</span>: rgb(131,58,180);<br><span class="blue">background</span>: {{ styleConfig.type }}-gradient({{ customColor }});</code>
                                </div>
                            </div>
                        </section>
                        <section class="code-options"> <button @click="copyStyle()" class="code-option__button js-copy">
                                <div class="code-option__button-bg js-button-copy"
                                    :style="'background-image: linear-gradient(' + customColor.replace(/[0-9]\d*deg/g, '90deg').replace('circle', '90deg') + ');'">
                                </div>
                                <svg class="code-option__button-svg" width="13" height="17"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g stroke="#ffffff" stroke-width="2" fill="none" fill-rule="evenodd">
                                        <path d="M5 5h7v11H5z"></path>
                                        <path d="M1 15V1h10"></path>
                                    </g>
                                </svg> <span>Copy to Clipboard</span>
                            </button>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp()
let interact: any;
let dragUtil: any;
let colorUtil: any;
let domtoimage: any;

const selectPointConfig = ref({
    index: 0,
    // rgb: {
    //     r: 0,
    //     g: 0,
    //     b: 0
    // },
    // hsv: {
    //     h: 0,
    //     s: 0,
    //     v: 0
    // },
    // a: 1.0,
})
const appGradientPointList = ref([
    {
        "tranX": 0,
        "percent": 10,
        rgb: {
            r: 0,
            g: 201,
            b: 255,
        },
        hsv: {
            h: 0.53,
            s: 1,
            v: 1,
        },
        "hex": "#00c9ff",
        "a": 1.0,
        "isActive": true
    },
    {
        "tranX": 0,
        "percent": 90,
        rgb: {
            r: 146,
            g: 254,
            b: 157,
        },
        hsv: {
            h: 0.35,
            s: 0.42,
            v: 0.99,
        },
        "hex": "#92fe9e",
        "a": 1.0,
        "isActive": false
    }
])
const hsvaGroup = ref({
    hue: (null as HTMLDivElement),
    alpha: (null as HTMLDivElement),
    bgAlpha: (null as HTMLDivElement),
    sv: (null as HTMLDivElement),
    svPointer: (null as HTMLDivElement),
})
const styleConfig = ref({
    type: 'linear',//linear，radial

})
const customDeg = ref(90)
const customColor = ref(customDeg.value + 'deg, rgb(0, 201, 255) 10%, rgb(146, 254, 157) 90%')

onMounted(async () => {
    dragUtil = (await import('~/utils/Drag'))
    colorUtil = (await import('~/utils/color'))
    interact = (await import('interactjs')).default;
    setInitColor();
    // Gradient Pointer
    const point = interact('.app-gradient__point')
    point
        .draggable({
            origin: "parent",
            inertia: {
                resistance: 3,
                minSpeed: 60
            },
            restrict: {
                restriction: "parent",
                elementRect: {
                    top: 0,
                    left: 0,
                    bottom: 1,
                    right: 1
                }
            },
            listeners: {
                start(event) {
                    let index = parseInt(event.target.getAttribute("index"));
                    selectPoint(index);
                    updateCustomColor();
                },
                move(event) {
                    let index = parseInt(event.target.getAttribute("index"))
                    let n = (appGradientPointList.value[index].tranX || 0) + event.dx;
                    appGradientPointList.value[index].tranX = n
                    let width = parseInt(event.target.parentNode.clientWidth);
                    appGradientPointList.value[index].percent = Math.round(n / (width - 28) * 100);
                    // appGradientPointList.value[index].percent = (n / (width - 26) * 100 | 0)
                    updateCustomColor();
                }
            }
        })
    // Hue Pointer X 
    const onedContainer = document.getElementsByClassName("app-color__inputs js-controls")[0];
    let hueContainer = dragUtil.slider({
        parent: onedContainer,
        "class": "oned",
        cbs: {
            begin: () => {
            },
            change: ({ x, pointer }) => {
                const newX = clamp(x * 100, 0, 100).toFixed(2) + "%";
                if (pointer) {
                    pointer.style.left = newX;
                    let hue = Math.round(clamp(x, 0, 1) * 360)
                    let rgb = colorUtil.hsv2rgb(hue, 1, 1);
                    // selectPointConfig.value.rgb = rgb
                    // selectPointConfig.value.hsv = {
                    //     h: hue,
                    //     s: 1,
                    //     v: 1
                    // }
                    appGradientPointList.value[selectPointConfig.value.index].hsv.h = Math.round(clamp(x, 0, 1) * 100) / 100;
                    appGradientPointList.value[selectPointConfig.value.index].rgb = rgb;
                    updateCustomColor()
                }
            },
            end: () => {
            },
        },
    });
    hsvaGroup.value.hue = hueContainer.pointer;
    // Alpha Pointer X
    let alphaP = dragUtil.slider({
        parent: onedContainer,
        "class": "oned alpha",
        cbs: {
            begin: () => {
            },
            change: ({ x, pointer }) => {
                const newX = clamp(x * 100, 0, 100).toFixed(2) + "%";
                if (pointer) {
                    pointer.style.left = newX;
                    appGradientPointList.value[selectPointConfig.value.index].a = Math.round((1 - clamp(x, 0, 1)) * 100) / 100
                    updateCustomColor();
                }
            },
            end: () => {
            },
        },
    });
    hsvaGroup.value.alpha = alphaP.pointer;
    let bgAlpha = document.createElement('div');
    bgAlpha.className = 'bg-color js-alpha-color';
    (alphaP.background as HTMLDivElement).lastElementChild.appendChild(bgAlpha);
    hsvaGroup.value.bgAlpha = bgAlpha;
    // SV Pointer XY
    const twodContainer = document.getElementsByClassName("colorPicker")[0];
    let svSlider = dragUtil.xyslider({
        parent: twodContainer,
        "class": "twod",
        cbs: {
            begin: () => {
            },
            change: ({ x, y, pointer }) => {
                const newX = clamp(x * 100, 0, 100).toFixed(2) + "%";
                const newY = clamp(y * 100, 0, 100).toFixed(2) + "%";
                if (pointer) {
                    pointer.style.left = newX;
                    pointer.style.top = newY;
                    let s = Math.round(clamp(x, 0, 1) * 100) / 100
                    let v = Math.round((1 - clamp(y, 0, 1)) * 100) / 100
                    let rgb = colorUtil.hsv2rgb(appGradientPointList.value[selectPointConfig.value.index].hsv.h * 360, s, v);
                    appGradientPointList.value[selectPointConfig.value.index].hsv.s = s
                    appGradientPointList.value[selectPointConfig.value.index].hsv.v = v
                    appGradientPointList.value[selectPointConfig.value.index].rgb = rgb
                    updateCustomColor();
                }
            },
            end: () => {
            },
        },
    });
    hsvaGroup.value.sv = svSlider.background
    hsvaGroup.value.svPointer = svSlider.pointer

    document.querySelector('.app-option__angle').addEventListener('mousedown', (event: MouseEvent) => {
        let ele = (event.target as HTMLElement);
        ele.addEventListener('mousemove', angleMove)
    })


    document.querySelector('.app-option__angle').addEventListener('mouseup', (event: MouseEvent) => {
        document.querySelector('.app-option__angle').removeEventListener('mousemove', angleMove)
    })

    selectPoint(0);
    updateCustomColor();
    domtoimage = await import('dom-to-image')
})

function angleMove(event: MouseEvent) {
    //console.log(event);
    let ele = (event.target as HTMLElement);
    // 获取中心
    let cX = ele.getBoundingClientRect().left + ele.offsetWidth / 2;
    let cY = ele.getBoundingClientRect().top + ele.offsetHeight / 2;
    event.preventDefault();
    //console.log("moveb: " + cX + ',' + cY);
    //console.log('movee: ' + event.clientX + ',' + event.clientY);
    //指定坐标点与正北方向的夹角
    //圆周上任意2点之间的弧度公式：θ=arctan[(y2-y0)/(x2-x0)]-arctan[(y1-y0)/(x1-x0)]
    var radian1 = Math.atan((event.clientY - cY) / (event.clientX - cX));//指定坐标点弧度
    var radian0 = 0;//正北方向弧度
    var angle = (radian1 - radian0) * 180 / Math.PI;//弧度转角度
    if (event.clientX < cX) {//指定坐标点落在第3、4象限，
        angle += 180;
    }
    customDeg.value = Math.round(angle) + 90
    updateCustomColor();
}

function clamp(a: number, min: number, max: number) {
    return Math.min(Math.max(a, min), max);
}

const tempSortList = ref([]);

function updateCustomColor() {
    let deg = customDeg.value + 'deg';
    if (styleConfig.value.type == 'radial') {
        deg = 'circle';
    }
    let color = '';
    tempSortList.value = JSON.parse(JSON.stringify(appGradientPointList.value));
    tempSortList.value = tempSortList.value.sort(function (a, b) { return a.percent - b.percent });
    tempSortList.value.forEach(item => {
        color = color + ', rgb(' + item.rgb.r + ', ' + item.rgb.g + ', ' + item.rgb.b + ', ' + item.a + ') ' + item.percent + '%'
    })
    customColor.value = deg + color;
    let rgb = colorUtil.hsv2rgb(appGradientPointList.value[selectPointConfig.value.index].hsv.h * 360, 1, 1);
    hsvaGroup.value.sv.style.background = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    let hexRgb = appGradientPointList.value[selectPointConfig.value.index].rgb;
    appGradientPointList.value[selectPointConfig.value.index].hex = colorUtil.rgb2hex(parseInt(hexRgb.r.toString()), parseInt(hexRgb.g.toString()), parseInt(hexRgb.b.toString()));

}

// 设置三个滑块位置
function setPosition() {
    hsvaGroup.value.hue.style.left = appGradientPointList.value[selectPointConfig.value.index].hsv.h * 100 + '%';
    hsvaGroup.value.svPointer.style.left = appGradientPointList.value[selectPointConfig.value.index].hsv.s * 100 + '%';
    hsvaGroup.value.svPointer.style.top = (1 - appGradientPointList.value[selectPointConfig.value.index].hsv.v) * 100 + '%';
    hsvaGroup.value.alpha.style.left = (1 - appGradientPointList.value[selectPointConfig.value.index].a) * 100 + '%';
}

function setInitColor() {
    let w = document.querySelector('.app-gradient__points').clientWidth
    appGradientPointList.value.forEach(item => {
        item.tranX = item.percent / 100 * w;
    })
}

function rgbChange() {
    let hsv = colorUtil.rgb2hsv(appGradientPointList.value[selectPointConfig.value.index].rgb.r, appGradientPointList.value[selectPointConfig.value.index].rgb.g, appGradientPointList.value[selectPointConfig.value.index].rgb.b)
    hsv.h = hsv.h / 360
    appGradientPointList.value[selectPointConfig.value.index].hsv = hsv;
    updateCustomColor();
    setPosition();
}

function degChange(e: any) {
    let input: HTMLInputElement = document.querySelector('.js-angle-input')
    customDeg.value = parseInt(input.value);
    updateCustomColor();
}

function downloadImg() {
    let node = document.querySelector('.header-app__background-color')
    domtoimage
        .toPng(node)
        .then(e => {
            domtoimage.toBlob(node).then(function (blob) {
                var hyperlink = document.createElement("a");
                hyperlink.href = URL.createObjectURL(blob);
                hyperlink.download = 'bg-gradient.png';
                if (typeof hyperlink.click === "function") {
                    hyperlink.click();
                } else {
                    hyperlink.target = "_blank";
                    hyperlink.dispatchEvent(new MouseEvent("click", {
                        view: window,
                        bubbles: true,
                        cancelable: true
                    }));
                }
                URL.revokeObjectURL(hyperlink.href)
            });
        })
        .catch(err => {

        });

}

// 添加滑块
function addPoint(e: PointerEvent) {
    if (!(e.target as HTMLElement).classList.contains('app-gradient__points')) {
        return
    }
    let percent = Math.round(e.offsetX / (e.target as HTMLElement).clientWidth * 100);
    let hex = '';
    if (percent < tempSortList.value[0].percent) {
        hex = tempSortList.value[0].hex.toLowerCase()
    } else if (percent > tempSortList.value[tempSortList.value.length - 1].percent) {
        hex = tempSortList.value[tempSortList.value.length - 1].hex.toLowerCase()
    } else {
        let startP = {
            percent: 0,
            hex: ''
        }
        let endP = {
            percent: 0,
            hex: ''
        }
        for (let index = 0; index <= tempSortList.value.length - 1; index++) {
            if (percent > tempSortList.value[index].percent && percent < tempSortList.value[index + 1].percent) {
                startP.percent = tempSortList.value[index].percent;
                startP.hex = tempSortList.value[index].hex;
                endP.percent = tempSortList.value[index + 1].percent;
                endP.hex = tempSortList.value[index + 1].hex;
                let colorList = gradient(startP.hex, endP.hex, endP.percent - startP.percent)
                hex = colorList[percent - startP.percent].toLowerCase()
                break;
            }
        }
    }

    let rgb = colorUtil.hex2rgb(hex);
    let hsv = colorUtil.rgb2hsv(rgb.r, rgb.g, rgb.b)
    hsv.h = hsv.h / 360
    appGradientPointList.value.push({
        "tranX": e.offsetX - 18,
        "percent": percent,
        rgb: rgb,
        hsv: hsv,
        "hex": hex,
        "a": 1.0,
        "isActive": false
    })
    selectPoint(appGradientPointList.value.length - 1)
}

function copyStyle() {
    let style = 'background-image: linear-gradient(' + customColor.value.replace(/[0-9]\d*deg/g, '90deg').replace('circle', '90deg') + ');'
    navigator.clipboard.writeText(style)
    $toast.success("复制成功")
}

// 设置Point为active
function selectPoint(index: number) {
    appGradientPointList.value.forEach(element => {
        element.isActive = false;
    });
    selectPointConfig.value.index = index
    //selectPointConfig.value.a = appGradientPointList.value[index].a
    appGradientPointList.value[index].isActive = true;
    setPosition();
    updateCustomColor();
}

function selectStyleType(str: string) {
    styleConfig.value.type = str;
    updateCustomColor();
}

function hexChange() {
    if (!/^#([a-f\d]{3}|[a-f\d]{6})$/i.test(appGradientPointList.value[selectPointConfig.value.index].hex)) {
        return
    }
    appGradientPointList.value[selectPointConfig.value.index].rgb = colorUtil.hex2rgb(appGradientPointList.value[selectPointConfig.value.index].hex)
    appGradientPointList.value[selectPointConfig.value.index].hsv = colorUtil.rgb2hsv(appGradientPointList.value[selectPointConfig.value.index].rgb.r, appGradientPointList.value[selectPointConfig.value.index].rgb.g, appGradientPointList.value[selectPointConfig.value.index].rgb.b)
    setPosition();
    updateCustomColor();

}

function clearPoint(percent: number, hex: string) {
    if (appGradientPointList.value.length <= 2) {
        return
    }
    let indexCut = 1;
    for (let index = 0; index <= appGradientPointList.value.length - 1; index++) {
        let temp = appGradientPointList.value[index];
        if (temp.isActive) {
            indexCut = 0;
        }
        if (temp.percent == percent && temp.hex.toLowerCase() == hex.toLowerCase()) {
            if (temp.isActive) {
                selectPoint(0)
            } else {
                selectPoint(selectPointConfig.value.index -= (indexCut + 1))
            }
            appGradientPointList.value.splice(index, 1)
            break
        }
    }
    updateCustomColor();
}

function gradient(startColor, endColor, step) {
    // 将 hex 转换为rgb
    let sColor = colorUtil.hex2rgb(startColor),
        eColor = colorUtil.hex2rgb(endColor);

    // 计算R\G\B每一步的差值
    let rStep = (eColor.r - sColor.r) / step,
        gStep = (eColor.g - sColor.g) / step,
        bStep = (eColor.b - sColor.b) / step;

    let gradientColorArr = [];
    for (var i = 0; i < step; i++) {
        // 计算每一步的hex值
        gradientColorArr.push(colorUtil.rgb2hex(parseInt(rStep * i + sColor.r), parseInt(gStep * i + sColor.g), parseInt(bStep * i + sColor.b)));
    }
    return gradientColorArr;
}


useHead({
    title: "CSS渐变背景工具",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'Keywords', content: 'CSSGradient渐变背景,css渐变背景工具,在线制作css渐变背景,渐变工具在线版,渐变色取样,linear-gradient' },
        { name: 'description', content: '一个功能强大的css渐变背景在线生成工具，帮助你快速调试出漂亮的渐变色。' }
    ],
})

</script>




<style>
/*! normalize.css v2.0.1 | MIT License | git.io/normalize */
header,
main,
section {
    display: block
}

html {
    font-family: sans-serif;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%
}

body {
    margin: 0
}

code {
    font-family: monospace, serif;
    font-size: 1em
}

svg:not(:root) {
    overflow: hidden
}

button,
input {
    font-family: inherit;
    font-size: 100%;
    margin: 0
}

button,
input {
    line-height: normal
}

button {
    -webkit-appearance: button;
    cursor: pointer
}

input[type="checkbox"] {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0
}

button::-moz-focus-inner,
input::-moz-focus-inner {
    border: 0;
    padding: 0
}

.colorPicker {
    display: block;
    margin-top: 20px
}

.app-color__inputs .controls-title {
    margin: 1em 0 22px;
    font-weight: bold;
    font-size: 12px;
    color: #BBBFC5;
    letter-spacing: 0.2em;
    text-transform: uppercase
}

.app-color__inputs .extras {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 76px
}

.app-color__inputs .extras .colorFields {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    margin-left: auto
}

.app-color__inputs .extras .color {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    text-align: center;
    margin-left: 0.5em
}

.app-color__inputs .extras .color label {
    margin-top: 0.5em;
    font-weight: bold;
    font-size: 12px;
    color: #BBBFC5;
    letter-spacing: 0.2em;
    text-transform: uppercase
}

.app-color__inputs .extras .colorFields input {
    width: 48px;
    text-align: center
}

@media only screen and (max-width: 320px) {
    .app-color__inputs .extras .colorFields input {
        width: 40px;
        padding: 0
    }
}

.app-color__inputs .extras .hex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    text-align: center
}

.app-color__inputs .extras .hex input {
    width: 92px
}

@media only screen and (max-width: 320px) {
    .app-color__inputs .extras .hex input {
        width: 84px;
        padding: 0
    }
}

.app-color__inputs .extras .hex label {
    margin-top: 0.5em;
    font-weight: bold;
    font-size: 12px;
    color: #BBBFC5;
    letter-spacing: 0.2em;
    text-transform: uppercase
}

.colorPicker .twod {
    position: relative;
    width: 100%;
    border-radius: 6px
}

.colorPicker .twod,
.colorPicker .twod .bg {
    width: 100%;
    height: 200px;
    border-radius: 6px
}

.app-color__inputs .oned,
.app-color__inputs .oned .bg {
    height: 32px
}

.app-color__inputs .oned,
.app-color__inputs .oned .bg,
.app-color__inputs .oned .pointer .shape {
    width: 100%
}

.colorPicker .twod .bg {
    position: absolute
}

.colorPicker .twod .pointer {
    position: relative;
    z-index: 2;
    width: 8px
}

.colorPicker .twod .pointer .shape {
    position: absolute
}

.colorPicker .twod .pointer .shape1 {
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border: 3px solid black;
    border-radius: 10px
}

.colorPicker .twod .pointer .shape2 {
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    border: 3px solid white;
    border-radius: 8px
}

.app-color__inputs .oned {
    float: left;
    margin: 0.5em 0
}

.app-color__inputs .oned .bg {
    border-radius: 4px
}

.app-color__inputs .oned .pointer {
    position: relative;
    z-index: 2
}

.app-color__inputs .oned .pointer .shape {
    position: absolute;
    width: 12px;
    margin-left: -6px;
    margin-top: -4px;
    height: 40px;
    border: 3px solid black;
    border-radius: 6px
}

.app-color__inputs .oned .pointer .shape:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 34px;
    border: 2px solid #fff;
    border-radius: 2px
}

.app-color__inputs .oned .bg {
    background: -webkit-gradient(linear, left top, right top, from(red), color-stop(17%, #ff0), color-stop(33%, lime), color-stop(50%, cyan), color-stop(66%, blue), color-stop(83%, #f0f), to(red));
    background: linear-gradient(to right, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%)
}

.colorPicker .twod .bg1 {
    z-index: 0;
    background: -webkit-gradient(linear, left top, right top, from(#fff), to(rgba(255, 255, 255, 0)));
    background: linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%)
}

.colorPicker .twod .bg2 {
    z-index: 1;
    background: -webkit-gradient(linear, left top, left bottom, from(transparent), to(#000));
    background: linear-gradient(to bottom, transparent 0%, #000 100%)
}

.oned.alpha .bg {
    position: relative;
    background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px
}

.oned.alpha .bg .bg-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-image: -webkit-gradient(linear, left top, right top, from(#090979), to(rgba(9, 9, 121, 0)));
    background-image: linear-gradient(to right, #090979 0%, rgba(9, 9, 121, 0) 100%)
}

*,
*:before,
*:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}

.row {
    width: 100%;
    max-width: 76rem;
    margin: 0 auto
}

.row:before,
.row:after {
    content: " ";
    display: table
}

.row:after {
    clear: both
}

@media only screen {
    .col-xs-24 {
        position: relative;
        padding-right: 1rem;
        padding-left: 1rem;
        float: left;
        width: 100%
    }
}

@media only screen and (min-width: 770px) {
    .col-md-12 {
        position: relative;
        padding-right: 1rem;
        padding-left: 1rem;
        float: left;
        width: 50%
    }

    .col-md-24 {
        position: relative;
        padding-right: 1rem;
        padding-left: 1rem;
        float: left;
        width: 100%
    }
}

@media only screen and (min-width: 1025px) {
    .col-lg-8 {
        position: relative;
        padding-right: 1rem;
        padding-left: 1rem;
        float: left;
        width: 33.33333%
    }
}

h3 {
    margin: 0
}

html,
body {
    margin: 0;
    padding: 0;
    font-family: "Work Sans", "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    font-weight: 400;
    background: #F5F6F7;
    color: #1F2667;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    overflow-x: hidden
}

.page-divider {
    border-top: 1px solid #DFE1E6;
    margin-top: 3em
}

input {
    color: #1F2667;
    font-weight: 600
}

input:focus {
    outline: none
}

button:focus,
button:active {
    outline: none
}

.page-header {
    position: relative;
    background: #fff;
    padding: 10em 0 4em;
    overflow: hidden;
    z-index: 1
}

@media only screen and (min-width: 770px) {
    .page-header {
        padding: 6em 0 8em
    }
}

.header-app {
    position: relative;
    height: 280px;
    -webkit-animation: header 1800ms cubic-bezier(0.8, 0, 0.2, 1);
    animation: header 1800ms cubic-bezier(0.8, 0, 0.2, 1)
}

.header-app__background-transparent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    z-index: 1
}

.header-app__background-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(90deg, #000046 0%, #4f1c96, 33%, #1cb5e0 100%);
    z-index: 2
}

@-webkit-keyframes header {
    0% {
        -webkit-transform: scaleY(0);
        transform: scaleY(0);
        opacity: 0
    }

    15% {
        -webkit-transform: scaleY(0);
        transform: scaleY(0);
        opacity: 0
    }

    100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
        opacity: 1
    }
}

@keyframes header {
    0% {
        -webkit-transform: scaleY(0);
        transform: scaleY(0);
        opacity: 0
    }

    15% {
        -webkit-transform: scaleY(0);
        transform: scaleY(0);
        opacity: 0
    }

    100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
        opacity: 1
    }
}

.panel-app {
    position: relative;
    max-width: 74rem;
    margin: -50px auto 0;
    z-index: 3;
    -webkit-animation: panel 1600ms ease-in-out;
    animation: panel 1600ms ease-in-out
}

@-webkit-keyframes panel {
    0% {
        opacity: 0;
        -webkit-transform: translateY(20px) scale(0.9);
        transform: translateY(20px) scale(0.9)
    }

    60% {
        opacity: 0;
        -webkit-transform: translateY(20px) scale(0.9);
        transform: translateY(20px) scale(0.9)
    }

    100% {
        opacity: 1;
        -webkit-transform: translateY(0) scale(1);
        transform: translateY(0) scale(1)
    }
}

@keyframes panel {
    0% {
        opacity: 0;
        -webkit-transform: translateY(20px) scale(0.9);
        transform: translateY(20px) scale(0.9)
    }

    60% {
        opacity: 0;
        -webkit-transform: translateY(20px) scale(0.9);
        transform: translateY(20px) scale(0.9)
    }

    100% {
        opacity: 1;
        -webkit-transform: translateY(0) scale(1);
        transform: translateY(0) scale(1)
    }
}

.app-gradient {
    position: relative;
    height: 112px;
    border-bottom: 1px solid #dfe1e6;
    padding: 28px 32px;
    background: #fff;
    border-top: 1px solid #dfe1e6
}

@media (min-width: 76rem) {
    .app-gradient {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border: 1px solid #dfe1e6
    }
}

.app-color {
    padding: 16px 8px 20px;
    background: #fff
}

@media (min-width: 76rem) {
    .app-color {
        border: 1px solid #dfe1e6;
        border-top: none;
        border-bottom: none;
        min-height: 268px
    }
}

.app-options {
    background: #fff;
    padding: 0 8px;
    border: 1px solid #dfe1e6;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px
}

@media only screen and (min-width: 770px) {
    .app-options {
        height: 96px;
        padding: 0 16px
    }
}

.app-gradient__color {
    width: 100%;
    height: 44px;
    border: 2px solid #1F2667;
    padding: 2px;
    border-radius: 6px
}

.app-gradient__color-background {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: -webkit-gradient(linear, left top, right top, from(#020024), color-stop(#090979), color-stop(35%), to(#00d4ff));
    background: linear-gradient(90deg, #020024 0%, #090979, 35%, #00d4ff 100%)
}

.app-gradient__points {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 19px;
    left: 20px;
    right: 24px;
    height: 62px;
    cursor: copy;
    -webkit-tap-highlight-color: transparent
}

.app-gradient__point {
    position: absolute;
    width: 26px;
    height: 62px
}

.app-gradient__point:before {
    content: "";
    position: absolute;
    top: 0;
    left: 5px;
    width: 22px;
    height: 62px;
    border-radius: 14px;
    background: #fff;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    opacity: 0;
    -webkit-transition: all 175ms ease-out;
    transition: all 175ms ease-out
}

.app-gradient__point-visual {
    position: absolute;
    top: 3px;
    left: 8px;
    width: 16px;
    height: 56px;
    background: #fff;
    border: 2px solid #1F2667;
    border-radius: 8px;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    -webkit-transition: all 250ms ease-out;
    transition: all 250ms ease-out
}

.app-gradient__point-color {
    position: absolute;
    top: 9px;
    left: 13px;
    width: 6px;
    height: 44px;
    background: #094679;
    border-radius: 3px
}

.app-gradient__point-background {
    position: absolute;
    top: 0;
    left: 5px;
    width: 22px;
    height: 62px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 14px;
    opacity: 0;
    -webkit-transition: all 250ms ease-out;
    transition: all 250ms ease-out
}

.app-gradient__point:hover {
    cursor: move
}

.app-gradient__point:not(.is-active):hover .app-gradient__point-background {
    opacity: 1;
    -webkit-transform: scale(1.1);
    transform: scale(1.1)
}

.app-gradient__point-label {
    position: absolute;
    top: 76px;
    left: -8px;
    width: 48px;
    height: 32px
}

.app-gradient__point-label-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    border: 1px solid #999;
    border-radius: 6px;
    -webkit-transition: all 175ms ease-out;
    transition: all 175ms ease-out
}

.app-gradient__point-input {
    position: absolute;
    top: 0;
    left: 0px;
    z-index: 1;
    background: transparent;
    border: none;
    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 2
}

.app-gradient__point.is-active {
    z-index: 10
}

.app-gradient__point.is-active:before {
    opacity: 1
}

.app-gradient__point.is-active .app-gradient__point-label-bg {
    -webkit-transform: scaleX(1.1) scaleY(1.2);
    transform: scaleX(1.1) scaleY(1.2);
    border: 2px solid #1F2667;
    border-radius: 8px;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5)
}

.app-color__inputs,
.app-color__stops {
    width: 100%;
    margin-top: 20px
}

.app-color input {
    height: 42px;
    padding: 0 8px;
    border: 1px solid #bbbfc5;
    border-radius: 6px;
    -webkit-transition: all 175ms ease-out;
    transition: all 175ms ease-out;
    text-align: center
}

.app-color input:focus {
    border: 1px solid #1F2667;
    -webkit-box-shadow: 0 0 0px 1.5px #1F2667;
    box-shadow: 0 0 0px 1.5px #1F2667
}

.app-color__stops {
    padding: 12px 0;
    border-top: 1px solid #DFE1E6
}

@media only screen and (min-width: 770px) {
    .app-color__stops {
        min-height: 210px;
        padding: 0 0 0 32px;
        border-left: 1px solid #dfe1e6;
        border-top: none
    }
}

.app-color__stops-title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 1em 0 10px;
    font-weight: bold;
    font-size: 12px;
    color: #bbbfc5;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-align: center
}

.app-color__stops-title h3 {
    font-size: 12px
}

.app-color__stop {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 62px;
    border-radius: 6px;
    padding: 6px 0;
    border: 1px solid transparent;
    -webkit-transition: all 175ms ease-out;
    transition: all 175ms ease-out
}

.app-color__stop-color {
    width: 20%
}

.app-color__stop-hex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 40%
}

.app-color__stop-hex input {
    width: 92px;
    margin-top: 3px
}

.app-color__stop-position {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 20%
}

.app-color__stop-position input {
    width: 80%;
    margin-top: 3px
}

.app-color__stop-action {
    position: relative;
    width: 20%;
    text-align: center
}

.app-color__stop-color-bg {
    float: right;
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0);
    border: 2px solid transparent;
    border-radius: 10px
}

.app-color__stop-color-tile {
    margin-top: 3px;
    margin-left: 3px;
    width: 38px;
    height: 38px;
    background: #090979;
    border-radius: 6px
}

.app-color__stop-color-tile:hover {
    cursor: pointer
}

.app-color__stop-action-button {
    font-size: 32px;
    margin-top: 6px;
    color: #dfe1e6;
    border: none;
    background: none;
    -webkit-transition: all 175ms ease-out;
    transition: all 175ms ease-out
}

.app-color__stop-action-button:hover {
    color: #1F2667
}

.app-color__stop.is-active {
    background: #f0f1f2;
    border: 1px solid #d9dcdf
}

.app-color__stop.is-active .app-color__stop-color-bg {
    background: white;
    border: 2px solid #1F2667;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5)
}

.app-color__stop.is-active .app-color__stop-action-button {
    color: #a7aeb9
}

.app-color__stop.is-active .app-color__stop-action-button:hover {
    color: #1F2667
}

.app-options__content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding: 16px 0
}

@media only screen and (min-width: 641px) {
    .app-options__content {
        -ms-flex-wrap: initial;
        flex-wrap: initial;
        padding: 0
    }
}

@media only screen and (min-width: 770px) {
    .app-options__content {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex
    }
}

.app-option {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 64px
}

.app-option:nth-child(1),
.app-option:nth-child(2) {
    width: 50%
}

.app-option:nth-child(3) {
    margin-left: auto
}

.app-option:nth-child(4) {
    width: 100%
}

@media only screen and (min-width: 770px) {
    .app-option {
        height: 96px;
        padding-right: 32px
    }

    .app-option:nth-child(1),
    .app-option:nth-child(2),
    .app-option:nth-child(3),
    .app-option:nth-child(4) {
        width: auto
    }

    .app-option:not(:first-child) {
        padding-left: 32px
    }

    .app-option:after {
        content: "";
        position: absolute;
        top: 27px;
        right: 0;
        width: 1px;
        height: 40px;
        background: #dfe1e6
    }

    .app-option:nth-child(2):after {
        display: none
    }

    .app-option:last-child {
        padding-right: 0
    }

    .app-option:last-child:after {
        display: none
    }
}

.app-option__button {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    line-height: 40px;
    height: 40px;
    background: #fff;
    color: #bbbfc5;
    font-weight: 700;
    border: 1px solid #bbbfc5;
    padding: 0 12px 0 36px;
    -webkit-transition: all 175ms ease-out;
    transition: all 175ms ease-out
}

@media only screen and (min-width: 770px) {
    .app-option__button {
        padding: 0 16px 0 40px
    }
}

.app-option__button-icon {
    position: absolute;
    left: 16px;
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    border: 2px solid #bbbfc5
}

@media only screen and (min-width: 770px) {
    .app-option__button-icon {
        left: 12px
    }
}

.app-option__button--linear {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px
}

.app-option__button--linear .app-option__button-icon:after {
    content: "";
    position: absolute;
    top: 5px;
    left: 0;
    width: 12px;
    height: 2px;
    background: #bbbfc5
}

.app-option__button--radial {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    margin-left: -1px
}

.app-option__button--radial .app-option__button-icon {
    margin-top: -1px;
    width: 18px;
    height: 18px;
    border-radius: 9px
}

.app-option__button--radial .app-option__button-icon:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    border: 2px solid #bbbfc5
}

.app-option__button.is-active {
    background: #1F2667;
    border-color: #1F2667;
    color: #fff;
    z-index: 1
}

.app-option__button.is-active .app-option__button-icon {
    border-color: #fff
}

.app-option__input {
    width: 54px;
    height: 42px;
    padding: 0 8px;
    margin-left: 12px;
    border: 1px solid #bbbfc5;
    border-radius: 6px;
    -webkit-transition: all 175ms ease-out;
    transition: all 175ms ease-out;
    text-align: center
}

.app-option__input:focus {
    border: 1px solid #1F2667;
    -webkit-box-shadow: 0 0 0px 1.5px #1F2667;
    box-shadow: 0 0 0px 1.5px #1F2667
}

@media only screen and (min-width: 770px) {
    .app-option__input {
        margin-left: 24px
    }
}

.app-option__angles {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end
}

.app-option__angle {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    width: 36px;
    height: 36px;
    border: 3px solid #1F2667;
    border-radius: 18px
}

@media only screen and (max-width: 320px) {
    .app-option__angle {
        display: none
    }
}

.app-option__angle-center {
    position: relative;
    width: 6px;
    height: 30px;
    pointer-events: none
}

.app-option__angle-pointer {
    position: absolute;
    width: 6px;
    height: 6px;
    top: 2px;
    border-radius: 3px;
    background: #1F2667
}

.app-option__swatches {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-left: auto;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    width: 100%
}

.app-option__swatch {
    width: 48px;
    height: 48px;
    padding: 3px;
    border-radius: 10px;
    cursor: pointer
}

.app-option__swatch.is-active {
    border: 2px solid #1F2667;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5)
}

@media only screen and (min-width: 770px) {
    .app-option__swatch {
        margin-left: 8px
    }

    .app-option__swatch:first-child {
        margin-left: 0
    }
}

.app-option__swatch-color {
    width: 100%;
    height: 100%;
    background: red;
    border-radius: 6px
}

.input-file {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1
}

.input-file+label {
    display: none;
    position: relative;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    line-height: 1;
    height: 40px;
    background: #fff;
    color: #9DA3AC;
    font-weight: 700;
    border: 1px solid #9DA3AC;
    border-radius: 6px;
    padding: 0 12px;
    cursor: pointer;
    -webkit-transition: all 175ms ease-out;
    transition: all 175ms ease-out
}

.input-file+label svg {
    margin-right: 8px
}

@media only screen and (min-width: 1025px) {
    .input-file+label {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 0 16px
    }
}

.panel-code {
    margin-top: 32px
}

.code-editor {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background: #161a42;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px
}

.code-editor__column {
    display: none;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 40px;
    flex: 0 0 40px;
    height: 100%;
    border-top-left-radius: 4px;
    background: rgba(255, 255, 255, 0.05)
}

@media only screen and (min-width: 770px) {
    .code-editor__column {
        display: block
    }
}

.code-editor__column-tabs {
    width: 100%;
    height: 48px
}

.code-editor__column-numbers {
    padding: 17px 0;
    text-align: center;
    color: rgba(255, 255, 255, 0.25);
    font-size: 12px;
    font-family: monospace;
    font-weight: bold;
    line-height: 24px
}

.code-editor__block {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: hidden;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px
}

.code-editor__tabs {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    height: 48px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background: rgba(0, 0, 0, 0.5)
}

.code-editor__tab {
    height: 48px;
    line-height: 48px;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0 24px;
    color: rgba(255, 255, 255, 0.35)
}

.code-editor__tab.is-active {
    height: 48px;
    background: #161a42;
    color: #fff;
    border-top-left-radius: 4px
}

.code-editor__compat {
    font-weight: bold;
    margin-left: auto;
    margin-right: 1em;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

.code-editor__compat label {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.code-editor__compat input[type="checkbox"] {
    opacity: 0;
    position: absolute
}

.code-editor__compat .compat__text {
    -webkit-box-ordinal-group: 3;
    -ms-flex-order: 2;
    order: 2
}

.code-editor__compat .compat__checkbox {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 2px solid #fff;
    margin-right: 8px;
    -webkit-box-ordinal-group: 2;
    -ms-flex-order: 1;
    order: 1
}

.code-editor__compat .compat__checkbox:after {
    display: none;
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 10px;
    height: 10px;
    background: #1F2667;
    border-radius: 7px
}

@media only screen and (max-width: 320px) {
    .code-editor__compat span {
        display: none
    }
}

.code-editor__compat input:checked~.compat__checkbox {
    background: #fff
}

.code-editor__compat input:checked~.compat__checkbox:after {
    display: block
}

.code-editor__input {
    color: rgba(255, 255, 255, 0.8);
    font-weight: bold;
    padding: 16px 24px;
    line-height: 1.5
}

.code-editor__input-code .blue {
    color: #00d4f0
}

.code-options {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    height: 56px;
    background: #45496d;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px
}

.code-option__button {
    position: relative;
    background: #45496d;
    border: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 100%;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.8);
    -webkit-transition: all 175ms ease-out;
    transition: all 175ms ease-out;
    overflow: hidden
}

.code-option__button span {
    position: relative;
    z-index: 2
}

.code-option__button .code-option__button-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: blue;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    -webkit-transition: all 150ms ease-in-out;
    transition: all 150ms ease-in-out
}

.code-option__button:hover {
    color: white
}

.code-option__button:hover .code-option__button-bg {
    -webkit-transform: translateY(0);
    transform: translateY(0)
}

.code-option__button-svg {
    position: relative;
    top: 3px;
    margin-right: 5px;
    opacity: 0.6
}

.home-display__center {
    text-align: center;
    margin-top: 2em
}
</style>