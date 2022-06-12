import { createToaster } from "@meforma/vue-toaster";
import "~/assets/css/toast.css"

const toast = createToaster({
    position: "top-right",
    duration: 1400,
    useDefaultCss: false,
});


export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('toast', toast)
})