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
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'vitesse-light',
            dark: 'vitesse-dark',
            sepia: 'monokai',
          },
          langs: ['ts', 'vue', 'tsx', 'js', 'shell', 'jsx'],
        },
        toc: {
          depth: 4,
        },
      },
    },
  },
})
