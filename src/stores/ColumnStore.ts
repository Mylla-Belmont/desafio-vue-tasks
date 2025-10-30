/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { ColumnServices } from '../services/ColumnServices'
import type { Column } from '../types/Models'

export const useColumnStore = defineStore('column', {
  state: () => ({
    columns: [] as Column[],
    loading: false as boolean,
    error: null as string | null,
  }),

  getters: {
    allColumns: (state) => state.columns,
    columnById: (state) => (columnId: string) => state.columns.find((c) => c.id === columnId),
  },

  actions: {
    async fetchColumns() {
      this.loading = true
      this.error = null
      try {
        const data = await ColumnServices.getColumns()
        this.columns = data
      } catch (err: any) {
        this.error = err.message || 'Erro ao carregar colunas'
      } finally {
        this.loading = false
      }
    },

    async addColumn(column: Column) {
      try {
        const newColumn = await ColumnServices.addColumn(column)
        this.columns.push(newColumn.data)
      } catch (err: any) {
        this.error = err.message || 'Erro ao criar coluna'
      }
    },

    async updateColumn(column: Column) {
      try {
        const updated = await ColumnServices.updateColumn(column)
        const index = this.columns.findIndex((c) => c.id === updated.data.id)
        if (index !== -1) this.columns[index] = updated.data
      } catch (err: any) {
        this.error = err.message || 'Erro ao atualizar coluna'
      }
    },

    async removeColumn(columnId: string) {
      try {
        await ColumnServices.deleteColumn(columnId)
        this.columns = this.columns.filter((c) => c.id !== columnId)
      } catch (err: any) {
        this.error = err.message || 'Erro ao remover coluna'
      }
    },
  },
})
