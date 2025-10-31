<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTaskStore } from '../stores/TaskStore'
import type { Task } from '@/types/Models';
import { useRelationStore } from '@/stores/RelationStore';
import { useThemeStore } from '../stores/ThemeStore'
import { useToast } from '../composables/useToast'

const notification = useToast()
const themeStore = useThemeStore()
const taskStore = useTaskStore()

const props = defineProps<{
    modelValue: boolean
    task: Task
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const internalModel = ref(props.modelValue)
const editingDescription = ref(false)
let editedDescription = props.task.description || ""
const editingTitle = ref(false)
let editedTitle = props.task.title || ""

const localTask = ref<Task>({ ...props.task })
watch(() => props.task, (newTask) => {
    localTask.value = { ...newTask }
})
watch(() => props.modelValue, (v) => internalModel.value = v)

watch(() => props.modelValue, (v) => {
    internalModel.value = v
    if (v && props.task) {
        editedTitle = props.task.title
        editedDescription = props.task.description
        editingTitle.value = true
        editingDescription.value = true
    }
})

function close() {
    emit('update:modelValue', false)
}

function deleteTask() {
    taskStore.removeTask(props.task.id)
    useRelationStore().removeRelation(props.task.id)
    emit('update:modelValue', false)
    notification.showToast('Tarefa excluída com sucesso', 'success')
}

async function saveTask() {
    if (!editedTitle.trim()) {
        editingTitle.value = false
        notification.showToast('O nome da tarefa não pode estar vazio', 'error')
        return
    }
    editingTitle.value = false
    editingDescription.value = false
    const updatedTask = {
        ...props.task,
        title: editedTitle,
        description: editedDescription,
        is_completed: localTask.value.is_completed
    }
    await taskStore.updateTask(updatedTask)
    emit('update:modelValue', false)
    notification.showToast('Tarefa atualizada com sucesso', 'success')
}

</script>

<template>
    <v-dialog v-model="internalModel" max-width="500px" @update:modelValue="emit('update:modelValue', $event)">
        <v-card :color="themeStore.theme.value === 'dark' ? 'secondary' : 'grey-lighten-4'" class="overflow-hidden">
            <v-row class="align-center justify-space-between mt-2" no-gutters>
                <v-col cols="12">
                    <v-textarea class="ml-6 mr-6 mt-4 mb-2" variant="underlined" density="compact" auto-grow rows="1"
                        color="grey-lighten-1" v-model="editedTitle" dense hide-details autofocus
                        @keyup.enter="saveTask" />
                </v-col>
            </v-row>

            <v-card-text class="overflow-y-auto">
                <v-textarea v-model="editedDescription" variant="outlined" density="compact" color="grey-lighten-1"
                    auto-grow rows="3" hide-details placeholder="Adicionar descrição..."
                    @focus="editingDescription = true" />
            </v-card-text>

            <div class="d-flex justify-start ml-5">
                <v-checkbox v-model="localTask.is_completed" label="Tarefa concluída" color="grey-lighten-1"
                    density="compact" />
            </div>

            <v-card-actions>
                <v-row justify="space-between" align="center">
                    <v-col cols="auto">
                        <v-icon icon="mdi-delete" class="cursor-pointer ml-3" color="error" size="large"
                            @click="deleteTask" />
                    </v-col>

                    <v-col cols="auto" class="flex items-center space-x-2 mr-4">
                        <v-btn variant="tonal" @click="close">Cancelar</v-btn>
                        <v-btn variant="tonal" class="ml-2" @click="saveTask">Salvar</v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
