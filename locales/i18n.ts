import { defineNuxtPlugin } from '#app'
import { createI18n } from 'vue-i18n'
import en from '~/locales/en/en.json'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
      en,
    },
  })

  nuxtApp.vueApp.use(i18n)
})
