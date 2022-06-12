import { api } from '~/api/api';
import { userStore } from '~/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token')
    const store = userStore();

    if (typeof (token.value) == 'undefined') {
        return navigateTo('/')
    }

    api.user.getInfo().then(info => {
        if (!info.success) {
            store.$patch({
                isLogin: !store.isLogin
            })
            store.$patch({
                isLogin: false
            })
            token.value = undefined
            store.$patch({
                showLogin: true
            })
            navigateTo('/')
        }
    })
})