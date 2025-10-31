import type { Theme } from '@/types/Models'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const ThemeServices = {
  async getTheme(): Promise<Theme> {
    try {
      const response = await axios.get(`${API_URL}/theme`)
      return response.data[0]
    } catch (error) {
      console.error('Erro ao buscar tema:', error)
      throw error
    }
  },

  async updateTheme(newTheme: Theme) {
    try {
      return await axios.put(`${API_URL}/theme/${newTheme.id}`, newTheme)
    } catch (error) {
      console.error('Erro ao trocar tema:', error)
      throw error
    }
  },
}
