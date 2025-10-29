import axios from 'axios'
import type { Column, Task, Relation } from '../types/Models'

const API_URL = 'http://localhost:3000'

export const TaskServices = {
  async getColumns(): Promise<Column[]> {
    const response = await axios.get<Column[]>(`${API_URL}/column`)
    return response.data
  },

  async getTasks(): Promise<Task[]> {
    const response = await axios.get<Task[]>(`${API_URL}/tasks`)
    return response.data
  },

  async getRelations(): Promise<Relation[]> {
    const response = await axios.get<Relation[]>(`${API_URL}/relations`)
    return response.data
  },

  async addColumn(column: Column) {
    return axios.post(`${API_URL}/column`, column)
  },

  async addTask(task: Task) {
    return axios.post(`${API_URL}/tasks`, task)
  },

  async addRelation(relation: Relation) {
    return axios.post(`${API_URL}/relations`, relation)
  },

  async updateTask(id: number, task: Task) {
    return axios.put(`${API_URL}/tasks/${id}`, task)
  },

  async updateColumn(id: number, column: Column) {
    return axios.put(`${API_URL}/column/${id}`, column)
  },
  async updateRelation(id: number, relation: Relation) {
    return axios.put(`${API_URL}/relations/${id}`, relation)
  },
}
