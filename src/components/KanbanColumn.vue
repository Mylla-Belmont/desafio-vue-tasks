<script setup lang="ts">
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'
import type { Task } from '../types/Models'

defineProps<{
    title: string
    tasks: Task[]
}>()

const emit = defineEmits(['add-task', 'task-click'])
</script>

<template>
    <v-col class="rounded-lg border bg-gray-100 px-2 py-2 mr-2">
        <p class="font-semibold text-gray-700 text-sm mb-2">{{ title }}</p>

        <draggable :list="tasks" item-key="id" :animation="200" group="tasks" class="tasks-container">
            <template #item="{ element }">
                <div @click="emit('task-click', element)" style="cursor:pointer;">
                    <task-card :task="element" class="task-card column-width mt-2" />
                </div>
            </template>
        </draggable>

        <v-btn variant="tonal" prepend-icon="mdi-plus" block elevation="2" class="text-none mt-3"
            @click="emit('add-task')">
            Adicionar nova tarefa
        </v-btn>
    </v-col>
</template>
