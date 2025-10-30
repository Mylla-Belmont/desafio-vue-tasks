import axios from 'axios'
import type { Task } from '../types/Models'

const API_URL = 'http://localhost:3000'

export const TaskServices = {
  async getTasks(): Promise<Task[]> {
    try {
      const response = await axios.get<Task[]>(`${API_URL}/tasks`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar tasks:', error)
      throw error
    }
  },

  async getTask(id: string): Promise<Task> {
    try {
      const response = await axios.get<Task>(`${API_URL}/tasks/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar task:', error)
      throw error
    }
  },

  async addTask(task: Task) {
    try {
      const response = await axios.post(`${API_URL}/tasks`, task)
      console.log(response.data)
      return response
    } catch (error) {
      console.error('Erro ao criar task:', error)
      throw error
    }
  },

  async updateTask(task: Task) {
    try {
      return await axios.put(`${API_URL}/tasks/${task.id}`, task)
    } catch (error) {
      console.error('Erro ao atualizar task:', error)
      throw error
    }
  },

  async deleteTask(id: string) {
    try {
      return await axios.delete(`${API_URL}/tasks/${id}`)
    } catch (error) {
      console.error('Erro ao remover task:', error)
      throw error
    }
  },
}
