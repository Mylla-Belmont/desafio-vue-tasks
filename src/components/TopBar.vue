<script setup lang="ts">
const props = defineProps<{
    theme: string
}>()

const emit = defineEmits(['toggle-theme'])
</script>

<template>
    <v-app-bar class="pr-3">
        <v-row align="center" no-gutters class="ma-0 pa-0 flex-grow-1">
            <v-col cols="auto" class="pa-0 pl-2">
                <v-img :src="props.theme === 'light'
                    ? '/src/assets/logos/Logo-CB-1.png'
                    : '/src/assets/logos/Logo-CB-2.png'" width="60" height="60" contain />
            </v-col>

            <v-col cols="auto" class="pa-0 ml-2">
                <v-app-bar-title>Mylow</v-app-bar-title>
            </v-col>

            <v-spacer />

            <v-col cols="auto" class="pa-0">
                <v-btn :prepend-icon="props.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" text slim
                    @click="emit('toggle-theme')">
                    {{ props.theme === 'light' ? 'Dark Mode' : 'Light Mode' }}
                </v-btn>
            </v-col>
        </v-row>
    </v-app-bar>
</template>
