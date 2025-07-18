export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'motion-v/nuxt',
    'nuxt-mcp',
  ],
  css: ['~/assets/css/main.css'],
  ui: {
    fonts: false,
  },
  devServer: {
    port: 3023,
  },
})
