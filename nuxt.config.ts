// https://v3.nuxtjs.org/api/configuration/nuxt-config
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";


export default defineNuxtConfig({
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      charset: 'utf-8',
    }
  },
  typescript: {
    shim: false
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/google-adsense'],
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  'google-adsense': {
    id: 'ca-pub-6667301035180632',
  },
  publicRuntimeConfig: {
    'google-adsense': {
      id: process.env.GOOGLE_ADSENSE_ID,
      test: process.env.GOOGLE_ADSENSE_TEST_MODE === 'true',
    },
  },
  build: {
    transpile: [
      'png-to-svg-wasm'
    ]
  },
  vite: {
    optimizeDeps: {
      exclude: [
        'png-to-svg-wasm'
      ]
    },
    plugins: [
      wasm(),
      topLevelAwait()
    ],
    build: {
      // chunkSizeWarningLimit: 4096
      rollupOptions: {
        output: {},
      },
    },

  },
  // render: {
  //   static: {
  //     //@ts-ignore
  //     setHeaders(res: any) {
  //       res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  //       res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  //     },
  //   },
  // },
});
