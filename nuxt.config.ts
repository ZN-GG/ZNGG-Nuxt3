// https://v3.nuxtjs.org/api/configuration/nuxt-config

export default defineNuxtConfig({

    buildModules: ['@pinia/nuxt'],
    // modules: ['@nuxtjs/tailwindcss'],
    css: ["~/assets/css/tailwind.css"],
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    },
    vite: {
        build: {
            // chunkSizeWarningLimit: 4096
            rollupOptions: {
                output: {
                }
            }
        }
    }


})
