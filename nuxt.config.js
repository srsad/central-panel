require('dotenv').config()

module.exports = {
  telemetry: false,
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [ { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } ]
  },
  /**
   * Переменные окружения
   */
  env: {
    REMONLINE_API_KEY: process.env.REMONLINE_API_KEY,
    REMONLINE_PROXY: process.env.REMONLINE_PROXY,
    YANDEX_MASTER_KEY: process.env.YANDEX_MASTER_KEY,
    YANDEX_CLIENT_ID: process.env.YANDEX_CLIENT_ID,
    DADATA_API_KEY: process.env.DADATA_API_KEY,
    DADATA_SECRET_KEY: process.env.DADATA_SECRET_KEY
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#67c23a' },
  /*
   ** Global CSS
   */
  css: [ 'element-ui/lib/theme-chalk/index.css', '@assets/sass/styles.sass', 'font-awesome/css/font-awesome.min.css' ],
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    [ '@nuxtjs/dotenv' ]
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/abilities.js',
    '@/plugins/globals.js',
    '@/plugins/axios.js',
    { src: '@/plugins/no-ssr.js', ssr: false }
    // { src: '@/plugins/socket.js', ssr: false }
    // { src: '@plugins/yaMaps.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // 'nuxt-socket-io'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },
  /**
   * socket io options
   */
  // io: {
  //   sockets: [{
  //     name: 'main',
  //     url: 'http://localhost:3000',
  //     path: 'io',
  //     // secure: true
  //     namespaces: {
  //       '/index': {
  //         emitters: ['getMessage2 + testMsg --> message2Rxd'],
  //         listeners: ['chatMessage2', 'chatMessage3 --> message3Rxd']
  //       },
  //       '/examples': {
  //         emitBacks: ['sample3', 'sample4 <-- myObj.sample4'],
  //         emitters: [
  //           'reset] getProgress + refreshInfo --> progress [handleDone'
  //         ],
  //         listeners: ['progress']
  //       }
  //     }
  //   }]
  // },
  /*
   ** Build configuration
   */
  build: {
    transpile: [ /^element-ui/ ],
    extractCSS: true,
    extend(config, ctx) {
      // Web Worker support
      if (!ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' },
          exclude: /(node_modules)/
        })
      }
    }
  }
}
