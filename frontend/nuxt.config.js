const BACKEND_URL = `http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}${process.env.BACKEND_ROOT}`;
const BACKEND_API = process.env.BACKEND_URL || 'http://localhost/api/';

console.log(BACKEND_URL);
console.log(BACKEND_API);

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    ['@nuxtjs/axios', {baseURL: BACKEND_API, progress: false}],
    ['@nuxtjs/moment', { locales: ['ko'], defaultLocale: 'ko' }],
    '@nuxtjs/proxy',
    '@nuxtjs/toast'],
  toast: {
    duration: 2000,
    keepOnHover: true,
    position: 'bottom-right'
  },
  proxy: {
    '/api': { target: BACKEND_URL, secure: false, crossorigin: true }
  },
  plugins: ["@/plugins/vue-awesome",
    {src: "@/plugins/vue-datepicker", ssr: false},
    "@/plugins/vue-cookie"],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    transpile: [/^vue-awesome/, /^vue-ctk-date-time-picker/],
    extend (config, { isDev, isClient, isServer }) {
      if (isDev && isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  }
}
