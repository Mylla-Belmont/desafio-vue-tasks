import './assets/main.css'

import { createApp, ref } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

const theme = ref<'light' | 'dark'>('light')

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: theme.value,
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#f2f2f2',
          surface: '#F5F5F5',
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#e05959ff',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#282828',
          surface: '#1E1E1E',
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
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
