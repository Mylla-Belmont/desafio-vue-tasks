<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'
import type { Task, SortableTask } from '../types/Models'
import { useToast } from '../composables/useToast'
import { useThemeStore } from '../stores/ThemeStore'

const notification = useToast()
const showDeleteDialog = ref(false)
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

function openDeleteConfirmation() {
    showDeleteDialog.value = true
}

async function confirmDelete() {
    showDeleteDialog.value = false
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
    <v-col class="kanban-column rounded-lg border bg-gray-100 px-2 py-2 mr-2">
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
                        <v-list-item prepend-icon="mdi-trash-can" @click="openDeleteConfirmation">
                            <v-list-item-title>Excluir</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-dialog v-model="showDeleteDialog" max-width="400">
                    <v-card>
                        <v-card-title class="text-h6 ml-2">Excluir coluna</v-card-title>
                        <v-card-text>
                            Essa ação apagara todas as tarefas dessa coluna. Deseja continuar?
                        </v-card-text>

                        <v-card-actions class="justify-end">
                            <v-btn variant="text" @click="showDeleteDialog = false">Cancelar</v-btn>
                            <v-btn color="error" variant="tonal" @click="confirmDelete()">Confirmar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

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

<style scoped>
.kanban-column {
    min-width: 300px;
    max-width: 300px;
    flex: 0 0 300px;
}
</style>