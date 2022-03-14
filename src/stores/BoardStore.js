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

    createColumn(columnName) {
      this.data.columns.push({
        name: columnName,
        tasks: [],
      })
    },

    moveTask(fromColumnIndex, toColumnIndex, fromTaskIndex, toTaskIndex = null) {
      const fromColumn = this.data.columns[fromColumnIndex]
      const toColumn = this.data.columns[toColumnIndex]
      const task = fromColumn.tasks.splice(fromTaskIndex, 1)[0]
      toColumn.tasks.splice(toTaskIndex ?? toColumn.tasks.length, 0, task)
    },

    moveColumn(fromIndex, toIndex) {
      const column = this.data.columns[fromIndex]
      this.data.columns.splice(fromIndex, 1)
      this.data.columns.splice(toIndex, 0, column)
    },

    deleteColumn(index) {
      this.data.columns.splice(index, 1)
    },

    deleteTask(columnIndex, taskIndex) {
      this.data.columns[columnIndex].tasks.splice(taskIndex, 1)
    }
  }
})
