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
    createTask(columnName, taskName) {
      const column = this.data.columns.filter(c => c.name === columnName)[0]

      column.tasks.push({
        id: uuid(),
        name: taskName,
        description: '',
      })
    },

    moveTask(fromColumnName, toColumnName, taskId) {
      const fromColumn = this.data.columns.filter(c => c.name === fromColumnName)[0]
      const toColumn = this.data.columns.filter(c => c.name === toColumnName)[0]
      const taskIndex = fromColumn.tasks.findIndex(t => t.id === taskId)
      const task = fromColumn.tasks[taskIndex]

      toColumn.tasks.push(task)
      fromColumn.tasks.splice(taskIndex, 1)
    }
  }
})
