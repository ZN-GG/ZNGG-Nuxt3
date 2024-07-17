<template>
    <div class="bg-white min-h-screen">
        <section class="bg-gray-100">
            <div class="container px-4 mx-auto">
                <div class="md:flex md:-mx-4 md:items-center py-8">
                    <div class="md:w-1/2 px-4">
                        <h1 class="text-2xl text-black">CSS毛玻璃效果</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="my-4">
            <div class="w-full container px-4 mx-auto">
                <div class="w-full flex flex-wrap md:flex-nowrap">
                    <div class="w-full md:w-64">
                        <div class="px-4">
                            <div class="my-4 md:my-12">
                                <p>宽度</p>
                                <input class="w-full" id="sub-size" type="range" min="260" max="500" v-model="BoxWidth"
                                    step="10">
                            </div>
                            <div class="my-4 md:my-12">
                                <p>圆角</p>
                                <input class="w-full" id="sub-size" type="range" min="0" max="25" v-model="BoxRadius">
                            </div>
                            <div class="my-4 md:my-12">
                                <p>模糊程度</p>
                                <input class="w-full" id="sub-size" type="range" min="0.0" max="30.0" v-model="BoxBlur"
                                    step="0.5">
                            </div>
                            <div class="my-4 md:my-12">
                                <p>透明度</p>
                                <input class="w-full" id="sub-size" type="range" min="0.05" max="0.60"
                                    v-model="BoxAlpha" step="0.05">
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-auto flex justify-center items-center flex-row demo-bg mt-8 md:mt-0">
                        <div id="circle-org" class="w-20 h-20 md:w-52 md:h-52 rounded-full"></div>
                        <div id="subject-div" class="glass glass-light"
                            :style='"height:120px; width:" + BoxWidth + "px;background-color: rgba(255, 255, 255, " + BoxAlpha + ");border-radius: " + BoxRadius + "px;backdrop-filter: blur(" + BoxBlur + "px);"'>
                        </div>
                        <div id="circle-blue"></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="w-full container px-4 mx-auto">
            <div class="panel-code">
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
                                <div class="code-editor__input"> <code ref="styleCode"
                                        class="code-editor__input-code js-code" id="code">
                                        <span class="blue">backdrop-filter</span>: {{ BoxRadius }}px;<br>
                                        <span class="blue">border-radius</span>: blur({{ BoxBlur }}px);<br>
                                        <span class="blue">background-color</span>: rgba(255, 255, 255, {{ BoxAlpha }});<br>

                                    </code>
                                </div>
                            </div>
                        </section>
                        <section class="code-options"> <button @click="copyStyle()" class="code-option__button js-copy">
                                <div class="code-option__button-bg js-button-copy"
                                    style="background-image: linear-gradient(135deg, #ffb566, #ff6677);">
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
            </div>
        </section>

        <section class="w-full container px-4 mx-auto mt-4">
            <adsbygoogle />
        </section>

        <section class="bg-white w-full container mx-auto  px-4 py-6">

<article class="prose lg:prose-xl" style="max-width: none;">
    <h4>使用说明：</h4>
    <blockquote>
        <p>此工具用于方便调试CSS透明模糊背景效果，也就是俗称的毛玻璃效果。</p>
    </blockquote>
    <ul>
        <li>工具有些简单，还不够完善...</li>
    </ul>
</article>
</section>

    </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp()

const BoxWidth = ref(420)
const BoxAlpha = ref(0.2)
const BoxRadius = ref(12)
const BoxBlur = ref(6)

const styleCode = ref<HTMLElement>()

function copyStyle() {
    navigator.clipboard.writeText((styleCode.value?.textContent!).replaceAll(";", ";\r"))
    $toast.success("复制成功")
}

useHead({
    title: "CSS毛玻璃效果",
    titleTemplate: (title) => `${title} - 工具 - ZNGG在线工具`,
    meta: [
        { name: 'Keywords', content: '在线生成CSS毛玻璃效果,在线生成CSS玻璃形态,苹果毛玻璃效果制作' },
        { name: 'description', content: '可以帮助您轻松生成各种CSS毛玻璃效果。' }
    ],
})

</script>
<style scoped>
.demo-bg {
    background-image: linear-gradient(135deg, #a7cee0 50%, #d0dea7);
}

#circle-org {
    margin-top: -200px;
    margin-right: -180px;
    background: linear-gradient(135deg, #ffb566, #ff6677);
}

#circle-blue {
    width: 175px;
    height: 175px;
    border-radius: 50%;
    margin-top: 180px;
    margin-left: -90px;
    background: linear-gradient(135deg, #de82ca, #259fac);
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