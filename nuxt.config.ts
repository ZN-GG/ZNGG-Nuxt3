// https://v3.nuxtjs.org/api/configuration/nuxt-config

export default defineNuxtConfig({
  buildModules: ['@pinia/nuxt'],
  // modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],

  serverMiddleware: ['~/middleware/setSameOriginHeader.ts'],
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
        output: {},
      },
    },
  },
    render: {
      static: {
        //@ts-ignore
        setHeaders(res: any) {
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        },
      },
    },
});
