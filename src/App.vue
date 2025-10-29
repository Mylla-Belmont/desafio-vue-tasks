<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TaskServices } from './services/TaskServices'
import type { Column, Task } from './types/Models'

import KanbanColumn from './components/KanbanColumn.vue'
import TopBar from './components/TopBar.vue'
import TaskModal from './components/TaskModal.vue'

const theme = ref('light')
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const columns = ref<Column[]>([])

const creatingColumn = ref(false)
const newColumnName = ref("")

async function loadColumns() {
  const response = await TaskServices.getColumns()
  columns.value = response.data
}

function startCreatingColumn() {
  creatingColumn.value = true
  newColumnName.value = ""
}

async function confirmCreateColumn() {
  if (!newColumnName.value.trim()) return

  const allColumnIds = columns.value.map(c => c.id!)
  const newId = allColumnIds.length ? Math.max(...allColumnIds) + 1 : 1

  const newColumn: Column = {
    id: newId,
    title: newColumnName.value,
    tasks: []
  }
  await TaskServices.addColumn(newColumn)
  await loadColumns()
  creatingColumn.value = false
  newColumnName.value = ""
}

function cancelCreateColumn() {
  creatingColumn.value = false
  newColumnName.value = ""
}

async function addTask(column: Column, taskName: string) {
  const allTasksIds = columns.value.flatMap(c => c.tasks)
  const newId = (allTasksIds.length ? Math.max(...allTasksIds.map(t => t.id!)) : 0) + 1

  const newTask: Task = {
    id: newId,
    title: taskName,
    description: "",
    is_completed: false,
  }
  const updatedColumn = { ...column, tasks: [...column.tasks, newTask] }
  await TaskServices.updateColumn(column.id!, updatedColumn)
  await loadColumns()
}

const selectedTask = ref<Task | null>(null)
const showTaskModal = ref(false)

function openTaskModal(task: Task) {
  selectedTask.value = task
  showTaskModal.value = true
}

onMounted(() => loadColumns())
</script>

<template>
  <v-app :theme="theme" class="fluid fill-height">
    <top-bar :theme="theme" @toggle-theme="toggleTheme" />

    <v-main>
      <div class="px-4 py-6">
        <v-row class="flex-nowrap overflow-x-auto" no-gutters>

          <KanbanColumn v-for="column in columns" :key="column.id" :title="column.title" :tasks="column.tasks"
            :column="column" @add-task="addTask" @task-click="openTaskModal" />


          <v-col class="bg-gray-100 rounded-lg px-2 py-2 border border-dashed border-gray-400 mr-2">

            <template v-if="creatingColumn">
              <v-text-field v-model="newColumnName" placeholder="Nome da coluna" dense autofocus
                @keyup.enter="confirmCreateColumn" />
              <div class="flex space-x-2 mt-1">
                <v-btn size="small" variant="flat" @click="confirmCreateColumn">Salvar</v-btn>
                <v-btn size="small" variant="text" @click="cancelCreateColumn">Cancelar</v-btn>
              </div>
            </template>

            <template v-else>
              <v-btn prepend-icon="mdi-plus" variant="text" block @click="startCreatingColumn">
                Nova coluna
              </v-btn>
            </template>

          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>

  <task-modal v-model="showTaskModal" :task="selectedTask" />
</template>