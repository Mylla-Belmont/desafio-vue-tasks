import axios from 'axios'
import type { Column } from '../types/Models'

const API_URL = 'http://localhost:3000'

export const ColumnServices = {
  async getColumns(): Promise<Column[]> {
    try {
      const response = await axios.get<Column[]>(`${API_URL}/columns`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar colunas:', error)
      throw error
    }
  },

  async getColumn(id: string): Promise<Column> {
    try {
      const response = await axios.get<Column>(`${API_URL}/columns/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar coluna:', error)
      throw error
    }
  },

  async addColumn(column: Column) {
    try {
      return await axios.post(`${API_URL}/columns`, column)
    } catch (error) {
      console.error('Erro ao criar coluna:', error)
      throw error
    }
  },

  async updateColumn(column: Column) {
    try {
      return await axios.put(`${API_URL}/columns/${column.id}`, column)
    } catch (error) {
      console.error('Erro ao atualizar coluna:', error)
      throw error
    }
  },

  async deleteColumn(id: string) {
    try {
      return await axios.delete(`${API_URL}/columns/${id}`)
    } catch (error) {
      console.error('Erro ao remover coluna:', error)
      throw error
    }
  },
}
