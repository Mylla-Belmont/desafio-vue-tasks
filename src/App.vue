<script setup lang="ts">
import { ref } from 'vue'
import logo1 from './assets/logos/Logo-CB-1.png'
import logo2 from './assets/logos/Logo-CB-2.png'
import TaskCard from './components/TaskCard.vue'
import draggable from 'vuedraggable'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function addTask(column: any) {
  const newId = Date.now() // gera ID único simples
  const today = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric' })

  column.tasks.push({
    id: newId,
    title: "Nova tarefa",
    date: today,
    type: "Task"
  })
}

const columns = ref([
  {
    title: "Backlog",
    tasks: [
      {
        id: 1,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
      }
    ]
  },
  {
    title: "In Progress",
    tasks: [
      {
        id: 6,
        title: "Design shopping cart dropdown",
        date: "Sep 9",
        type: "Design"
      },
      {
        id: 7,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
      }
    ]
  },
  {
    title: "Review",
    tasks: [
      {
        id: 9,
        title: "Provide documentation on integrations",
        date: "Sep 12"
      }
    ]
  },
  {
    title: "Done",
    tasks: [
      {
        id: 14,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
      }
    ]
  }
])
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
      <div class="px-4 py-6">
        <v-row class="flex-nowrap overflow-x-auto" no-gutters>
          <v-col v-for="column in columns" :key="column.title"
            class="bg-gray-100 rounded-lg px-2 py-2 border border-gray-300 mr-2">
            <p class="text-gray-700 font-semibold text-sm mb-2">
              {{ column.title }}
            </p>

            <draggable :list="column.tasks" item-key="id" :animation="200" group="tasks" :empty-insert-threshold="50"
              class="min-h-[200px]">
              <template #item="{ element }">
                <task-card :task="element" class="mt-3 cursor-move" />
              </template>
            </draggable>

            <v-btn variant="tonal" prepend-icon="mdi-plus" block elevation="2" class="text-none mt-3"
              @click="addTask(column)">
              Adicionar nova tarefa
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}
</style>