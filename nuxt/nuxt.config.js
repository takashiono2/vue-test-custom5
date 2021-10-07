const pkg = require('./package')
const webpack = require('webpack')

export default {
  mode: 'universal',//vee-validate.jsを読み込むために追加
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vee-validate'},//vee-validate.jsを読み込むために追加
    { src: '~/plugins/modal.js'}//modal.jsを読み込むために追加
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules

  modules: [
    '@nuxtjs/dotenv'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    },
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ],
    transpile: [
      "vee-validate/dist/rules"
    ],//vee-validate.jsを読み込むために追加
    extend(config, ctx) {}//vee-validate.jsを読み込むために追加
  },

}
