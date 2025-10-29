import axios from 'axios'
import type { Column } from '../types/Models'

const API_URL = 'http://localhost:3000/columns'

export const TaskServices = {
  getColumns() {
    return axios.get<Column[]>(API_URL)
  },
  async addColumn(column: Column | null | undefined): Promise<void> {
    if (!column) {
      throw new Error('Column cannot be null or undefined')
    }

    try {
      await axios.post(API_URL, column)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to add column: ${error.message}`)
      } else {
        throw error
      }
    }
  },
  async updateColumn(id: number, column: Column): Promise<void> {
    if (!column) {
      throw new Error('Column cannot be null or undefined')
    }

    try {
      await axios.put(`${API_URL}/${id}`, column)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to update column with id ${id}: ${error.message}`)
      }
      throw error
    }
  },
}
