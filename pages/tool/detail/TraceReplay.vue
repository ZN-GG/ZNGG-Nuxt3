<template>
    <div class="relative">
        <div>
            <div id="container" class="w-full h-screen overflow-hidden">
            </div>
        </div>

        <div class="fixed right-0 top-0 w-full px-12 py-24 md:w-auto h-screen">
            <div class="bg-white opacity-95 w-full h-full rounded px-4">
                <h1 class="pt-6 font-bold text-lg">轨迹会放</h1>
                <div>
                    <textarea v-model="data" class="bg-gray-200 outline-none w-full h-full px-2"></textarea>
                </div>
                <div class="flex w-full flex-wrap">
                    <div @click="startAnimation()"
                        class="bg-gray-100 cursor-pointer my-1 select-none mr-2 px-3 md:px-5 rounded-md custom-font-14 leading-8 hover:bg-blue-600 hover:text-white">
                        开始</div>
                    <div @click="pauseAnimation()"
                        class="bg-gray-100 cursor-pointer my-1 select-none mr-2 px-3 md:px-5 rounded-md custom-font-14 leading-8 hover:bg-blue-600 hover:text-white">
                        暂停</div>
                    <div @click="resumeAnimation()"
                        class="bg-gray-100 cursor-pointer my-1 select-none mr-2 px-3 md:px-5 rounded-md custom-font-14 leading-8 hover:bg-blue-600 hover:text-white">
                        继续</div>
                    <div @click="stopAnimation()"
                        class="bg-gray-100 cursor-pointer my-1 select-none px-3 md:px-5 rounded-md custom-font-14 leading-8 hover:bg-blue-600 hover:text-white">
                        停止</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

let AMapLoader;;
let map;
const data = ref("");
let marker, passedPolyline, lineArr = [[116.478935, 39.997761], [116.478939, 39.997825], [116.478912, 39.998549], [116.478912, 39.998549], [116.478998, 39.998555], [116.478998, 39.998555], [116.479282, 39.99856], [116.479658, 39.998528], [116.480151, 39.998453], [116.480784, 39.998302], [116.480784, 39.998302], [116.481149, 39.998184], [116.481573, 39.997997], [116.481863, 39.997846], [116.482072, 39.997718]];

onMounted(async () => {
    AMapLoader = (await import('@amap/amap-jsapi-loader')).default
    AMapLoader.load({
        "key": "57498f7e6d943d95dd8d3e07a29d19f5",
        "version": "2.0",
        "plugins": [],
    }).then((AMap) => {
        AMap.plugin('AMap.MoveAnimation', function () {
            map = new AMap.Map('container', {
                resizeEnable: true,
                center: [116.397428, 39.90923], zoom: 17
            });
            marker = new AMap.Marker({
                map: map,
                position: [116.478935, 39.997761],
                icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
                offset: new AMap.Pixel(-13, -26),
                autoRotation: true,
            });
            passedPolyline = new AMap.Polyline({
                map: map,
                // path: lineArr,
                strokeColor: "#28F",  //线颜色
                // strokeOpacity: 1,     //线透明度
                strokeWeight: 6,      //线宽
                // strokeStyle: "solid"  //线样式
            });
            marker.on('moving', function (e) {
                map.setCenter(e.target.getPosition(), true)
                passedPolyline.setPath(e.passedPath);
            });
            map.setFitView();
        })
    }).catch(e => {
        console.log(e);
    })


})




function startAnimation() {
    lineArr = JSON.parse(data.value)
    marker.moveAlong(lineArr, {
        duration: 500,
        autoRotation: true,
    });
}

function pauseAnimation() {
    marker.pauseMove();
}

function resumeAnimation() {
    marker.resumeMove();
}

function stopAnimation() {
    marker.stopMove();
}

definePageMeta({
    layout: 'empty'
})
</script>