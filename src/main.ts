// main.ts
import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import { useThemeStore } from './stores/ThemeStore'

// Cria Vuetify com temas light e dark
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#f2f2f2',
          surface: '#F5F5F5',
          primary: '#EDE7F6',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#e05959ff',
          info: '#2196F3',
          success: '#C5E1A5',
          warning: '#FFC107',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#282828',
          surface: '#1E1E1E',
          primary: '#512DA8',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#69F0AE',
          warning: '#FFC107',
        },
      },
    },
  },
})

const app = createApp(App)
app.use(createPinia())
app.use(vuetify)
app.mount('#app')

// Integração dinâmica do tema com Pinia
const themeStore = useThemeStore()

// Observa mudanças no theme do store
watch(
  () => themeStore.theme, // ou themeStore.getActualTheme se tiver getter
  (newTheme) => {
    if (newTheme.value === 'light' || newTheme.value === 'dark') {
      vuetify.theme.global.name.value = newTheme.value
    }
  },
  { immediate: true },
)
