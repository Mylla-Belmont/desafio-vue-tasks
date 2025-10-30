/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { RelationServices } from '../services/RelationServices'
import type { Relation } from '../types/Models'

export const useRelationStore = defineStore('relation', {
  state: () => ({
    relations: [] as Relation[],
    loading: false as boolean,
    error: null as string | null,
  }),

  getters: {
    allRelations: (state) => state.relations,
  },

  actions: {
    async fetchRelations() {
      this.loading = true
      this.error = null
      try {
        const data = await RelationServices.getRelations()
        this.relations = data
      } catch (err: any) {
        this.error = err.message || 'Erro ao carregar relações'
      } finally {
        this.loading = false
      }
    },

    async getRelationById(relationId: string) {
      return this.relations.find((r) => r.id === relationId)
    },

    async getRelationsByTaskId(taskId: string) {
      try {
        return await this.relations.find((r) => r.task_id === taskId)
      } catch (error) {
        console.error(error)
        throw error
      }
    },

    async addRelation(relation: Relation) {
      try {
        const newRelation = await RelationServices.addRelation(relation)
        this.relations.push(newRelation.data)
      } catch (err: any) {
        this.error = err.message || 'Erro ao criar relação'
      }
    },

    async updateRelation(relation: Relation) {
      try {
        const updated = await RelationServices.updateRelation(relation)
        const index = this.relations.findIndex((r) => r.id === updated.data.id)
        if (index !== -1) this.relations[Number(index)] = updated.data
      } catch (err: any) {
        this.error = err.message || 'Erro ao atualizar relação'
      }
    },

    async removeRelation(relationId: string) {
      try {
        await RelationServices.deleteRelation(relationId)
        this.relations = this.relations.filter((r) => r.id !== relationId)
      } catch (err: any) {
        this.error = err.message || 'Erro ao remover relação'
      }
    },
  },
})
