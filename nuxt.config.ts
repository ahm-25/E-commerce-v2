

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts'
  ],
  colorMode: {
    classSuffix: '', // needed for tailwind dark mode
    preference: 'light', // default theme instead of following the OS
    fallback: 'light'
  },
  googleFonts: {
    families: {
      Cairo: [400, 500, 600, 700, 800]
    },
    display: 'swap'
  },
  app: {
    head: {
      htmlAttrs: {
        dir: 'rtl',
        lang: 'ar'
      }
    }
  },
  css: ['~/assets/css/main.css']
})