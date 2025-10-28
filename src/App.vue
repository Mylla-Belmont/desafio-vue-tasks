<script setup lang="ts">
import { ref } from 'vue'
import logo1 from './assets/logos/Logo-CB-1.png'
import logo2 from './assets/logos/Logo-CB-2.png'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded" max-height="300">
    <v-app :theme="theme">
      <v-row>
        <v-app-bar class="pr-3">
          <v-app-bar-title>
            <v-img :src="theme === 'light' ? logo1 : logo2"
              :srcset="theme === 'light' ? `${logo1} 1x, ${logo1} 2x` : `${logo2} 1x, ${logo2} 2x`" width="60"
              height="60"></v-img>
          </v-app-bar-title>
          <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" text slim
            @click="onClick">
            Dark Mode
          </v-btn>
        </v-app-bar>
      </v-row>

      <v-main>
        <v-container>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>