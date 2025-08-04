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
  image: {
    quality: 85,
    format: ['webp', 'png'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    providers: {
    },
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
