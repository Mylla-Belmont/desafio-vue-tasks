/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { TaskServices } from '../services/TaskServices'
import type { Task } from '../types/Models'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    loading: false as boolean,
    error: null as string | null,
  }),

  getters: {
    allTasks: (state) => state.tasks,
    completedTasks: (state) => state.tasks.filter((t) => t.is_completed),
    pendingTasks: (state) => state.tasks.filter((t) => !t.is_completed),
    taskById: (state) => (taskId: string) => state.tasks.find((t) => t.id === taskId),
  },

  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null
      try {
        const data = await TaskServices.getTasks()
        this.tasks = data
      } catch (err: any) {
        this.error = err.message || 'Erro ao carregar tarefas'
      } finally {
        this.loading = false
      }
    },

    async taskById(taskId: string) {
      this.tasks.find((t) => t.id === taskId)
    },

    async addTask(task: Task) {
      try {
        const newTask = await TaskServices.addTask(task)
        this.tasks.push(newTask.data)
      } catch (err: any) {
        this.error = err.message || 'Erro ao criar tarefa'
      }
    },

    async updateTask(task: Task) {
      try {
        const updated = await TaskServices.updateTask(task)
        const index = this.tasks.findIndex((t) => t.id === updated.data.id)
        if (index !== -1) this.tasks[index] = updated.data
      } catch (err: any) {
        this.error = err.message || 'Erro ao atualizar tarefa'
      }
    },

    async removeTask(taskId: string) {
      try {
        await TaskServices.deleteTask(taskId)
        this.tasks = this.tasks.filter((t) => t.id !== taskId)
      } catch (err: any) {
        this.error = err.message || 'Erro ao remover tarefa'
      }
    },

    toggleTaskStatus(id: string) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) {
        task.is_completed = !task.is_completed
        this.updateTask(task)
      }
    },
  },
})
