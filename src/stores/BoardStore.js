import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import boardData from '../data/default-board'
import uuid from '../utils/uuid'

export const useBoardStore = defineStore('BoardStore', {
  state: () => {
    return {
      data: useLocalStorage('BoardStore:data', boardData)
    }
  },

  actions: {
    createTask(column, taskName) {
      this.data.columns.filter(c => c.name === column)[0].tasks.push({
        id: uuid(),
        name: taskName,
        description: '',
      })
    }
  }
})
