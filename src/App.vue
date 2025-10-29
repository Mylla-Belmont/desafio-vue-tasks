<script setup lang="ts">
import { ref } from 'vue'
import type { Column, Task } from './types/Models'
import KanbanColumn from './components/KanbanColumn.vue'
import TaskModal from '@/components/TaskModal.vue'
import TopBar from '@/components/TopBar.vue'

const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function addColumn() {
  const newColumnIndex = columns.value.length + 1
  columns.value.push({
    title: `Nova Lista ${newColumnIndex}`,
    tasks: []
  })
}

function addTask(column: Column) {
  const newId = Date.now()

  column.tasks.push({
    id: newId,
    title: "Nova tarefa",
    description: "Descrição da nova tarefa",
    is_completed: false
  })
}

const selectedTask = ref<Task | null>(null)
const showTaskModal = ref(false)

function openTaskModal(task: Task) {
  selectedTask.value = task
  showTaskModal.value = true
}
const columns = ref([
  {
    title: "Backlog",
    tasks: [
      {
        id: 1,
        title: "Add discount code to checkout page",
        description: "Sep 14",
        is_completed: true
      }
    ]
  },
  {
    title: "In Progress",
    tasks: [
      {
        id: 6,
        title: "Design shopping cart dropdown",
        description: "Sep 9",
        is_completed: true
      },
      {
        id: 7,
        title: "Add discount code to checkout page",
        description: "Sep 14",
        is_completed: false
      }
    ]
  },
  {
    title: "Review",
    tasks: [
      {
        id: 9,
        title: "Provide documentation on integrations",
        description: "Sep 12",
        is_completed: false
      }
    ]
  },
  {
    title: "Done",
    tasks: [
      {
        id: 14,
        title: "Add discount code to checkout page",
        description: "Sep 14",
        is_completed: false
      }
    ]
  }
])
</script>

<template>
  <v-app :theme="theme" class="fluid fill-height">
    <top-bar :theme="theme" @toggle-theme="toggleTheme" />

    <v-main>
      <div class="px-4 py-6">
        <v-row class="flex-nowrap overflow-x-auto" no-gutters>
          <KanbanColumn v-for="(column, i) in columns" :key="i" :title="column.title" :tasks="column.tasks"
            @add-task="addTask(column)" @task-click="openTaskModal" />

          <v-col class="bg-gray-100 rounded-lg px-2 py-2 border border-dashed border-gray-400 mr-2">
            <v-btn prepend-icon="mdi-plus" variant="text" block @click="addColumn">
              nova coluna
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>

  <task-modal v-model="showTaskModal" :task="selectedTask" />

</template>

<style scoped></style>