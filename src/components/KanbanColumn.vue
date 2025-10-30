<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'
import type { Task, SortableTask } from '../types/Models'

const props = defineProps<{
    tasks: Task[]
    title: string
    columnId: string
}>()

const emit = defineEmits<{
    (e: 'add-task', title: string): void
    (e: 'task-click', task: Task): void
    (e: 'task-moved', taskId: string, newColumnId: string): void
}>()

const creatingTask = ref(false)
const newTaskTitle = ref("")

function startCreatingTask() {
    creatingTask.value = true
    newTaskTitle.value = ""
}

function confirmCreateTask() {
    if (!newTaskTitle.value.trim()) return
    emit("add-task", newTaskTitle.value)
    creatingTask.value = false
    newTaskTitle.value = ""
}

function cancelCreateTask() {
    creatingTask.value = false
    newTaskTitle.value = ""
}

function onTaskMoved(evt: SortableTask) {
    if (evt.added && props.columnId) {
        const taskId = evt.added.element.id
        emit('task-moved', taskId, props.columnId)
    }
}
</script>

<template>
    <v-col class="rounded-lg border bg-gray-100 px-2 py-2 mr-2">
        <p class="font-semibold text-gray-700 text-sm mb-2">{{ props.title }} </p>

        <draggable :list="tasks" item-key="id" :animation="200" group="tasks" class="tasks-container"
            @change="onTaskMoved">
            <template #item="{ element }">
                <div @click="emit('task-click', element)" style="cursor:pointer;">
                    <task-card :task="element" class="task-card column-width mt-2" />
                </div>
            </template>
        </draggable>

        <div v-if="creatingTask" class="mt-3">
            <v-text-field v-model="newTaskTitle" placeholder="Nome da tarefa" dense autofocus
                @keyup.enter="confirmCreateTask" />
            <div class="flex space-x-2 mt-1">
                <v-btn size="small" variant="flat" @click="confirmCreateTask">Salvar</v-btn>
                <v-btn size="small" variant="text" @click="cancelCreateTask">Cancelar</v-btn>
            </div>
        </div>

        <v-btn v-else variant="tonal" prepend-icon="mdi-plus" block elevation="2" class="text-none mt-3"
            @click="startCreatingTask">
            Adicionar nova tarefa
        </v-btn>
    </v-col>
</template>