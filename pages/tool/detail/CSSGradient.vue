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
                                                @click="clearPoint(item.percent, item.hex, index, item.isActive)"
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
            <section class="w-full container px-4 mx-auto mt-4">
                <adsbygoogle />
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp()
const DomToImage = (await import('dom-to-image')).default;
let interact: any;
let dragUtil: any;
let colorUtil: any;

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
    hue: (null as unknown as HTMLDivElement),
    alpha: (null as unknown as HTMLDivElement),
    bgAlpha: (null as unknown as HTMLDivElement),
    sv: (null as unknown as HTMLDivElement),
    svPointer: (null as unknown as HTMLDivElement),
})
const styleConfig = ref({
    type: 'linear',//linear，radial

})
const customDeg = ref(90)
const customColor = ref(customDeg.value + 'deg, rgb(0, 201, 255) 10%, rgb(146, 254, 157) 90%')
const JsAlphaColor = ref('linear-gradient(to right, ' + appGradientPointList.value[selectPointConfig.value.index].hex + ' 0%, rgba(9, 9, 121, 0) 100%)')

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
                start(event: { target: { getAttribute: (arg0: string) => string; }; }) {
                    let index = parseInt(event.target.getAttribute("index"));
                    selectPoint(index);
                    updateCustomColor();
                },
                move(event: { target: { getAttribute: (arg0: string) => string; parentNode: { clientWidth: string; }; }; dx: number; }) {
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
            //@ts-ignore
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
            //@ts-ignore
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
    bgAlpha.id = "bgAlpha";
    bgAlpha.className = 'bg-color js-alpha-color';
    bgAlpha.style.backgroundImage = JsAlphaColor.value;
    (alphaP.background as HTMLDivElement).lastElementChild!.appendChild(bgAlpha);
    hsvaGroup.value.bgAlpha = bgAlpha;
    // SV Pointer XY
    const twodContainer = document.getElementsByClassName("colorPicker")[0];
    let svSlider = dragUtil.xyslider({
        parent: twodContainer,
        "class": "twod",
        cbs: {
            begin: () => {
            },
            //@ts-ignore
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

    //@ts-ignore
    document.querySelector('.app-option__angle').addEventListener('mousedown', (event: MouseEvent) => {
        let ele = (event.target as HTMLElement);
        ele.addEventListener('mousemove', angleMove)
    })

    //@ts-ignore
    document.querySelector('.app-option__angle').addEventListener('mouseup', (event: MouseEvent) => {
        //@ts-ignore
        document.querySelector('.app-option__angle').removeEventListener('mousemove', angleMove)
    })

    selectPoint(0);
    updateCustomColor();
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

const tempSortList = ref<any[]>([]);

function updateCustomColor() {
    (document.getElementById("bgAlpha") as HTMLElement).style.backgroundImage = 'linear-gradient(to right, ' + appGradientPointList.value[selectPointConfig.value.index].hex + ' 0%, rgba(9, 9, 121, 0) 100%)';
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
    let w = document.querySelector('.app-gradient__points')!.clientWidth
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
    let input: HTMLInputElement = document.querySelector('.js-angle-input')!
    customDeg.value = parseInt(input.value);
    updateCustomColor();
}

function downloadImg() {
    let node = document.querySelector('.header-app__background-color')
    DomToImage
        .toPng(node!)
        .then((e: any) => {
            DomToImage.toBlob(node!).then(function (blob: Blob | MediaSource) {
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
        .catch((err: any) => {

        });

}

// 添加滑块
function addPoint(e: Event) {
    if (!(e.target as HTMLElement).classList.contains('app-gradient__points')) {
        return
    }
    let percent = Math.round((e as PointerEvent).offsetX / (e.target as HTMLElement).clientWidth * 100);
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
        "tranX": (e as PointerEvent).offsetX - 18,
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

function clearPoint(percent: number, hex: string, indexNumber: number, isActive: boolean) {
    console.log(indexNumber);
    if (appGradientPointList.value.length <= 2) {
        return
    }

    if (indexNumber < selectPointConfig.value.index) {
        if (indexNumber == 0) {
            selectPointConfig.value.index = 0
        } else {
            selectPointConfig.value.index = selectPointConfig.value.index - 1
        }
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
            }
            appGradientPointList.value.splice(index, 1)
            break
        }
    }
    updateCustomColor();
}

function gradient(startColor: string, endColor: string, step: number) {
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
    meta: [
        { name: 'Keywords', content: 'CSSGradient渐变背景,css渐变背景工具,在线制作css渐变背景,渐变工具在线版,渐变色取样,linear-gradient' },
        { name: 'description', content: '一个功能强大的css渐变背景在线生成工具，帮助你快速调试出漂亮的渐变色。' }
    ],
    link: [
        { rel: 'stylesheet', href: '/css/cssgradient.css' }
    ],
})

</script>
