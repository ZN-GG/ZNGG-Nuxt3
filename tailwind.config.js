module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    //'./nuxt.config.{js,ts}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addComponents }){
      addComponents({
        '.container': {
          maxWidth: '100%', //tailwind是mobile优先，所以首先定义缺省宽度为mobile端的宽度
          '@screen sm': {
            maxWidth: '640px', //其他屏幕大小的情况根据需求定义
          },
          '@screen md': {
            maxWidth: '760px',
          },
          '@screen lg': {
            maxWidth: '1200px',
          },
          '@screen xl': {
            maxWidth: '1200px',
          },
        }
      })
    }
  ],
}
