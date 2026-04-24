import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import router from './router'
import './style.css'
import App from './App.vue'

import vi from './locales/vi.json'
import en from './locales/en.json'

const savedLanguage = localStorage.getItem('language') || 'vi'

const i18n = createI18n({
  legacy: false,
  locale: savedLanguage,
  fallbackLocale: 'vi',
  messages: {
    vi,
    en
  }
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
