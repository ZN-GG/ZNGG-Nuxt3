import Mpegts from 'mpegts.js';


export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('mpegts', Mpegts)
})