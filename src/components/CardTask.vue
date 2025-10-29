<script setup lang="ts">
const props = defineProps<{
    color?: string
}>()

const chipColor = props.color ?? 'teal'
</script>

<template>
    <v-chip :color="chipColor" size="small" class="font-semibold" label variant="flat">
        <slot />
    </v-chip>
</template>
