// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devServer: {
    port: 443,
    host: 'localhost',
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',

    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/scripts',

    '@nuxt/image',
    '@nuxt/test-utils/module',
  ],
  devtools: { enabled: true },
  plugins: ['~/locales/i18n.ts'],
  ssr: false,
  spaLoadingTemplate: false,
  css: cssImports,
  imports: {
    dirs: ['core/globals'],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "sass:map"; @import "assets/styles/mixin.scss";',
        },
      },
    },

    build: {
      rollupOptions: {
        output: {
          assetFileNames: '_nuxt/[name].[ext]',
          entryFileNames: '_nuxt/[name].js',
          chunkFileNames: '_nuxt/[name].js',
        },
      },
    },
  },
})
