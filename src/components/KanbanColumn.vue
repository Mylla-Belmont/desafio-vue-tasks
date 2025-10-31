<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'
import type { Task, SortableTask } from '../types/Models'
import { useToast } from '../composables/useToast'
import { useThemeStore } from '../stores/ThemeStore'

const notification = useToast()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const themeStore = useThemeStore()

const props = defineProps<{
    tasks: Task[]
    title: string
    columnId: string
}>()

const emit = defineEmits<{
    (e: 'add-task', title: string): void
    (e: 'task-click', task: Task): void
    (e: 'task-moved', taskId: string, newColumnId: string): void
    (e: 'delete-column', columnId: string): void
    (e: 'update-column', columnId: string, newTitle: string): void
}>()

const creatingTask = ref(false)
const editingTitle = ref(false)
const newTaskTitle = ref("")
const editedTitle = ref("")

function startCreatingTask() {
    creatingTask.value = true
    newTaskTitle.value = ""
}

function confirmCreateTask() {
    if (!newTaskTitle.value.trim()) {
        notification.showToast('O nome da tarefa não pode estar vazio', 'error')
        return
    }
    emit("add-task", newTaskTitle.value)
    creatingTask.value = false
    newTaskTitle.value = ""
    notification.showToast('Tarefa criada com sucesso', 'success')
}

function cancelCreateTask() {
    creatingTask.value = false
    newTaskTitle.value = ""
}

function deleteList() {
    emit('delete-column', props.columnId)
}

function editList() {
    editedTitle.value = props.title
    editingTitle.value = true
}

function saveEdit() {
    if (!editedTitle.value.trim()) {
        editingTitle.value = false
        notification.showToast('O nome da coluna não pode estar vazio', 'error')
        return
    }
    emit('update-column', props.columnId, editedTitle.value)
    editingTitle.value = false
    notification.showToast('Coluna atualizada com sucesso', 'success')
}

function cancelEdit() {
    editingTitle.value = false
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
        <v-row>
            <v-col cols="8" class="text-h7">
                <template v-if="editingTitle">
                    <v-text-field v-model="editedTitle" dense hide-details autofocus @keyup.enter="saveEdit"
                        @blur="cancelEdit" />
                </template>
                <template v-else>
                    {{ title }}
                </template>
            </v-col>

            <v-col cols="4" class="text-end">
                <v-menu>
                    <template #activator="{ props }">
                        <v-icon v-bind="props" icon="mdi-dots-horizontal" size="small" color="secondary"
                            class="cursor-pointer" />
                    </template>

                    <v-list>
                        <v-list-item prepend-icon="mdi-pencil" @click="editList">
                            <v-list-item-title>Editar</v-list-item-title>
                        </v-list-item>
                        <v-list-item prepend-icon="mdi-trash-can" @click="deleteList">
                            <v-list-item-title>Excluir</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>

        <draggable :list="tasks" item-key="id" :animation="200" group="tasks" class="tasks-container"
            @change="onTaskMoved">
            <template #item="{ element }">
                <div @click="emit('task-click', element)" style="cursor:pointer;">
                    <task-card :task="element" :theme:="themeStore.theme.value" class="task-card column-width mt-2" />
                </div>
            </template>
        </draggable>

        <div v-if="creatingTask" class="mt-3">
            <v-text-field v-model="newTaskTitle" placeholder="Nome da tarefa" dense autofocus
                @keyup.enter="confirmCreateTask" @keyup.esc="cancelCreateTask" />
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
