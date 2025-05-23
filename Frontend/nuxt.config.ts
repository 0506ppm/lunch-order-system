// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig:{
    public:{
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000'
    }
  },
  // nitro:{
  //   devProxy:{
  //     '/api':{
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       prependPath: false,
  //     }
  //   }
  // },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/icon',
    '@clerk/nuxt'
  ],
})

