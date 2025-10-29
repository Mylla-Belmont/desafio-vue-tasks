<script setup lang="ts">
import { computed } from 'vue'
import ChipStatusTask from './ChipStatusTask.vue'
import type { Task } from '../types/Models'

const props = defineProps<{
    task: Task
}>()

const badgeColor = computed(() =>
    props.task.is_completed ? "green" : "red"
)
</script>

<template>
    <div class="bg-white dark:bg-gray-900 shadow rounded px-3 pt-3 pb-5 border border-transparent">
        <p class="text-gray-800 dark:text-gray-100 font-semibold font-sans tracking-wide text-sm">
            {{ props.task.title }}
        </p>


        <div class="flex mt-4 items-center">
            <span class="text-sm text-gray-600 dark:text-gray-300">
                {{ props.task.description }}
            </span>

            <ChipStatusTask v-if="props.task.is_completed" :color="badgeColor">
                {{ props.task.is_completed }}
            </ChipStatusTask>
        </div>
    </div>
</template>

<style scoped></style>