import axios from 'axios'
import type { Relation } from '../types/Models'

const API_URL = 'http://localhost:3000'

export const RelationServices = {
  async getRelations(): Promise<Relation[]> {
    try {
      const response = await axios.get<Relation[]>(`${API_URL}/relations`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar relações:', error)
      throw error
    }
  },

  async getRelation(id: string): Promise<Relation> {
    try {
      const response = await axios.get<Relation>(`${API_URL}/relations/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar relação:', error)
      throw error
    }
  },

  async addRelation(relation: Relation) {
    try {
      return await axios.post(`${API_URL}/relations`, relation)
    } catch (error) {
      console.error('Erro ao criar relação:', error)
      throw error
    }
  },

  async updateRelation(relation: Relation) {
    try {
      return await axios.put(`${API_URL}/relations/${relation.id}`, relation)
    } catch (error) {
      console.error('Erro ao atualizar relação:', error)
      throw error
    }
  },

  async deleteRelation(id: string) {
    try {
      return await axios.delete(`${API_URL}/relations/${id}`)
    } catch (error) {
      console.error('Erro ao remover relação:', error)
      throw error
    }
  },
}
