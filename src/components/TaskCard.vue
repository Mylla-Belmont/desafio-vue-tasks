<script setup lang="ts">
import { computed } from 'vue'
import ChipStatusTask from './ChipStatusTask.vue'
import type { Task } from '../types/Models'

const props = defineProps<{
    task: Task
    theme?: string
}>()

const badgeColor = computed(() =>
    props.task.is_completed ? "green" : "red"
)

</script>

<template>
    <v-card class="rounded px-3 pt-3 pb-5" elevation="1">
        <p class="font-semibold font-sans tracking-wide text-sm">
            {{ props.task.title }}
        </p>

        <div class="flex mt-4 items-center">
            <ChipStatusTask v-if="props.task.is_completed" :color="badgeColor">
                Finalizado
            </ChipStatusTask>
        </div>
    </v-card>
</template>
