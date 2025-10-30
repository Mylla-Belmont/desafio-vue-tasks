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

const emit = defineEmits(['update:modelValue'])

const internalModel = ref(props.modelValue)

watch(() => props.modelValue, (v) => internalModel.value = v)

function close() {
    emit('update:modelValue', false)
}
</script>

<template>
    <v-dialog v-model="internalModel" max-width="500px" @update:modelValue="emit('update:modelValue', $event)">
        <v-card>
            <v-card-title>{{ props.task?.title }}</v-card-title>

            <v-card-text>
                {{ props.task?.description }}
            </v-card-text>

            <v-card-actions>
                <v-spacer />
                <v-btn text @click="close">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
