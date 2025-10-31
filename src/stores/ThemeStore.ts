/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeServices } from '@/services/ThemeServices'
import type { Theme } from '@/types/Models'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: {} as Theme,
    loading: false as boolean,
    error: null as string | null,
  }),

  getters: {
    getActualTheme: (state) => state.theme.value,
  },

  actions: {
    async fetchTheme() {
      this.loading = true
      this.error = null
      try {
        const data = await ThemeServices.getTheme()
        this.theme = data
      } catch (err: any) {
        this.error = err.message || 'Erro ao carregar o tema'
      } finally {
        this.loading = false
      }
    },

    async updateTheme() {
      try {
        const newTheme = this.theme.value === 'dark' ? 'light' : 'dark'
        this.theme.value = newTheme
        await ThemeServices.updateTheme(this.theme)
      } catch (err: any) {
        this.error = err.message || 'Erro ao atualizar tema'
      }
    },
  },
})
