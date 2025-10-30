import { ref } from 'vue'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  message: string
  type: ToastType
  visible: boolean
}

const toast = ref<Toast>({
  message: '',
  type: 'success',
  visible: false,
})

export function useToast() {
  function showToast(message: string, type: ToastType = 'success') {
    toast.value = { message, type, visible: true }
    setTimeout(() => {
      toast.value.visible = false
    }, 3000)
  }

  return {
    toast,
    showToast,
  }
}
