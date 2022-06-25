import Player from 'nplayer'
import Hls from 'hls.js'


export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('nplayer', Player)
    nuxtApp.provide('hls', Hls)
})