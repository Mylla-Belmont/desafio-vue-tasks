<script setup lang="ts">
import { ref, onMounted } from 'vue'

import type { Column, Task, Relation } from './types/Models'
import { useTaskStore } from './stores/TaskStore'
import { useColumnStore } from './stores/ColumnStore'
import { useRelationStore } from './stores/RelationStore'

import KanbanColumn from './components/KanbanColumn.vue'
import TopBar from './components/TopBar.vue'
import TaskModal from './components/TaskModal.vue'

const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const taskStore = useTaskStore()
const columnStore = useColumnStore()
const relationStore = useRelationStore()

const creatingColumn = ref(false)
const newColumnName = ref("")

function startCreatingColumn() {
  creatingColumn.value = true
  newColumnName.value = ""
}

async function confirmCreateColumn() {
  if (!newColumnName.value.trim()) return

  const newId = columnStore.columns.length
    ? (Math.max(...columnStore.columns.map(c => Number(c.id))) + 1).toString()
    : "1";

  const newColumn: Column = {
    id: newId,
    title: newColumnName.value,
  }

  await columnStore.addColumn(newColumn)
  creatingColumn.value = false
}

function cancelCreateColumn() {
  creatingColumn.value = false
  newColumnName.value = ""
}

async function addTask(taskName: string, column: Column) {
  const newIdTask = taskStore.tasks.length
    ? (Math.max(...taskStore.tasks.map(t => Number(t.id))) + 1).toString()
    : "1";

  const newIdRelation = relationStore.relations.length
    ? (Math.max(...relationStore.relations.map(r => Number(r.id))) + 1).toString()
    : "1";

  const newTask: Task = {
    id: newIdTask,
    title: taskName,
    description: "",
    is_completed: false,
  }

  await taskStore.addTask(newTask)
  await relationStore.addRelation({
    id: newIdRelation,
    column_id: column.id,
    task_id: newTask.id
  })
}

async function handleTaskMoved(taskId: string, newColumnId: string) {
  const currentRelation: Relation | undefined = await relationStore.getRelationsByTaskId(taskId)

  if (!currentRelation) return
  const updatedRelation: Relation = {
    ...currentRelation,
    column_id: newColumnId
  }
  await relationStore.updateRelation(updatedRelation)
}

const selectedTask = ref<Task | null>(null)
const showTaskModal = ref(false)

function openTaskModal(task: Task) {
  selectedTask.value = task
  showTaskModal.value = true
}

onMounted(() => {
  taskStore.fetchTasks()
  columnStore.fetchColumns()
  relationStore.fetchRelations()
})
</script>

<template>
  <v-app :theme="theme" class="fluid fill-height">
    <top-bar :theme="theme" @toggle-theme="toggleTheme" />

    <v-main>
      <div class="px-4 py-6">
        <v-row class="flex-nowrap overflow-x-auto" no-gutters>

          <KanbanColumn v-for="column in columnStore.columns" :key="column.id"
            :tasks="taskStore.tasks.filter(task => relationStore.relations.some(r => r.column_id == column.id && r.task_id == task.id))"
            :title="column.title" :column-id="column.id" @add-task="addTask($event, column)" @task-click="openTaskModal"
            @task-moved="handleTaskMoved" />

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