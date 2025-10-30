<script lang="ts" setup>
import { computed } from 'vue';
import { useToast } from '../composables/useToast';

const { toast } = useToast();

const toastColor = computed(() => {
    switch (toast.value.type) {
        case 'success':
            return 'green';
        case 'error':
            return 'red';
        case 'info':
            return 'blue';
        default:
            return 'grey';
    }
});
</script>

<template>
    <v-snackbar v-model="toast.visible" :color="toastColor" timeout="3000" top right>
        {{ toast.message }}
    </v-snackbar>
</template>
