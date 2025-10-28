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
  <v-app :theme="theme" class="fluid fill-height">
    <v-app-bar class="pr-3">
      <v-row align="center" no-gutters class="ma-0 pa-0 flex-grow-1">
        <v-col cols="auto" class="pa-0 pl-2">
          <v-img :src="theme === 'light' ? logo1 : logo2" width="60" height="60" contain />
        </v-col>

        <v-col cols="auto" class="pa-0 ml-2">
          <v-app-bar-title>
            Kanban Vue.js
          </v-app-bar-title>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="auto" class="pa-0">
          <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" text slim
            @click="onClick">
            {{ theme === 'light' ? 'Dark Mode' : 'Light Mode' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container>
      </v-container>
    </v-main>
  </v-app>
</template>