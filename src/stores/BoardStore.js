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

    moveTask(fromColumnName, toColumnIndex, fromTaskIndex, toTaskIndex = null) {
      const fromColumn = this.data.columns.filter(c => c.name === fromColumnName)[0]
      const toColumn = this.data.columns[toColumnIndex]
      const task = fromColumn.tasks.splice(fromTaskIndex, 1)[0]

      if (toTaskIndex === null) {
        toColumn.tasks.push(task)
      } else {
        toColumn.tasks.splice(toTaskIndex, 0, task)
      }

    },

    moveColumn(fromIndex, toIndex) {
      const column = this.data.columns[fromIndex]

      this.data.columns.splice(fromIndex, 1)
      this.data.columns.splice(toIndex, 0, column)
    }
  }
})
