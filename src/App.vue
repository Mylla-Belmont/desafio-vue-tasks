<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TaskServices } from './services/TaskServices'
import type { Column, Task, Relation } from './types/Models'

import KanbanColumn from './components/KanbanColumn.vue'
import TopBar from './components/TopBar.vue'
import TaskModal from './components/TaskModal.vue'

const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const tasks = ref<Task[]>([])
const columns = ref<Column[]>([])
const relations = ref<Relation[]>([])
const creatingColumn = ref(false)
const newColumnName = ref("")

async function loadColumns() {
  relations.value = await TaskServices.getRelations()
  columns.value = await TaskServices.getColumns()
  tasks.value = await TaskServices.getTasks()
}

function startCreatingColumn() {
  creatingColumn.value = true
  newColumnName.value = ""
}

async function confirmCreateColumn() {
  if (!newColumnName.value.trim()) return

  const newId = columns.value.length ? Math.max(...columns.value.map(c => c.id!)) + 1 : 1

  const newColumn: Column = {
    id: newId,
    title: newColumnName.value,
  }

  await TaskServices.addColumn(newColumn)
  await loadColumns()
  creatingColumn.value = false
}

function cancelCreateColumn() {
  creatingColumn.value = false
  newColumnName.value = ""
}

async function addTask(taskName: string, column: Column) {

  const newIdTask = tasks.value.length ? Math.max(...tasks.value.map(c => c.id!)) + 1 : 1
  const newIdRelation = relations.value.length ? Math.max(...relations.value.map(c => c.id!)) + 1 : 1

  const newTask: Task = {
    id: newIdTask,
    title: taskName,
    description: "",
    is_completed: false,
  }

  await TaskServices.addTask(newTask)
  await TaskServices.addRelation({
    id: newIdRelation,
    column_id: column.id,
    task_id: newTask.id
  })
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

          <KanbanColumn v-for="value in columns" :key="value.id"
            :tasks="tasks.filter(task => relations.some(r => r.column_id == value.id && r.task_id == task.id))"
            :title="value.title" @add-task="addTask($event, value)" @task-click="openTaskModal" />

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