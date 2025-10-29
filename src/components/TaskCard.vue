<script setup lang="ts">
import { computed } from 'vue'
import CardTask from './CardTask.vue'

interface Task {
    id: number
    title: string
    date: string
    type?: string
}

const props = defineProps<{
    task: Task
}>()

const badgeColor = computed(() => {
    const mappings: Record<string, string> = {
        Design: "purple",
        "Feature Request": "teal",
        Backend: "blue",
        QA: "green"
    }
    return mappings[props.task.type ?? ""] || "teal"
})
</script>

<template>
    <div class="bg-white dark:bg-gray-900 shadow rounded px-3 pt-3 pb-5 border border-transparent">
        <p class="text-gray-800 dark:text-gray-100 font-semibold font-sans tracking-wide text-sm">
            {{ props.task.title }}
        </p>


        <div class="flex mt-4 items-center">
            <span class="text-sm text-gray-600 dark:text-gray-300">
                {{ props.task.date }}
            </span>

            <CardTask v-if="props.task.type" :color="badgeColor">
                {{ props.task.type }}
            </CardTask>
        </div>
    </div>
</template>

<style scoped></style>