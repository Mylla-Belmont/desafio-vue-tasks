<script setup lang="ts">
import { ref, watch } from 'vue'

interface Task {
    id: string
    title: string
    description: string
    is_completed: boolean
}

const props = defineProps<{
    modelValue: boolean
    task: Task | null
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'delete', task: Task): void
    (e: 'update-title', task: Task, newTitle: string): void
}>()

const internalModel = ref(props.modelValue)
const editingDescription = ref(false)
const editedDescription = ref("")
const editingTitle = ref(false)
const editedTitle = ref("")

watch(() => props.modelValue, (v) => internalModel.value = v)

function close() {
    emit('update:modelValue', false)
}

function deleteTask() {
    emit('delete', props.task as Task)
    emit('update:modelValue', false)
}

function enableEditTitle() {
    editedTitle.value = props.task?.title || ''
    editingTitle.value = true
}

function enableEditDescription() {
    editedDescription.value = props.task?.description || ''
    editingDescription.value = true
}

function saveTitle() {
    if (!editedTitle.value.trim()) {
        editingTitle.value = false
        return
    }
    editingTitle.value = false
    emit('update-title', props.task as Task, editedTitle.value)
}
function cancelEditionTitle() {
    editingTitle.value = false
}

function saveDescription() {
    if (!editedDescription.value.trim()) {
        editingDescription.value = false
        return
    }
    editingDescription.value = false
    // emit('update-description', descricao.value)
}

function cancelEditingDescription() {
    editingDescription.value = false
}

</script>

<template>
    <v-dialog v-model="internalModel" max-width="500px" @update:modelValue="emit('update:modelValue', $event)">
        <v-card>
            <v-row class="align-center justify-space-between mt-2" no-gutters>
                <v-col cols="10">
                    <template v-if="editingTitle">
                        <v-text-field class="ml-2" variant="outlined" density="compact" color="grey-lighten-1"
                            v-model="editedTitle" dense hide-details autofocus @keyup.enter="saveTitle"
                            @blur="cancelEditionTitle" />
                    </template>
                    <template v-else>
                        <v-card-title class="text-h6 text-bold">
                            {{ task?.title }}
                        </v-card-title>
                    </template>
                </v-col>
                <v-col cols="auto" class="mr-2">
                    <v-icon icon="mdi-pencil" class="ml-1 cursor-pointer" size="small" color="secondary"
                        @click="enableEditTitle" />
                </v-col>
            </v-row>
            <v-card-text>
                <template v-if="editingDescription">
                    <v-textarea v-model="editedDescription" variant="outlined" density="compact" color="grey-lighten-1"
                        auto-grow rows="3" autofocus hide-details @keyup.enter="saveDescription"
                        @blur="cancelEditingDescription" />
                    <div class="mt-2 flex justify-end space-x-2">
                        <v-btn size="small" variant="tonal" @click="saveDescription">Salvar</v-btn>
                        <v-btn size="small" variant="text" class="ml-4"
                            @click="cancelEditingDescription">Cancelar</v-btn>
                    </div>
                </template>
                <template v-else>
                    <v-col v-if="props.task?.description === ''">
                        <v-icon size="small" class="mr-1 cursor-pointer"
                            @click="enableEditDescription">mdi-plus</v-icon>
                        {{ 'Adcionar descrição' }}
                    </v-col>
                    <v-col v-else>
                        {{ props.task?.description }}
                    </v-col>
                </template>
            </v-card-text>

            <v-card-actions>
                <v-row justify="end">
                    <v-col cols="auto">
                        <v-btn variant="flat" color="error" @click="deleteTask">Excluir</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn variant="tonal" @click="close">Fechar</v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>