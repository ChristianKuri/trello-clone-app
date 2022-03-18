import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import boardData from '../data/default-board'
import uuid from '../utils/uuid'

export const useBoardStore = defineStore('BoardStore', {
  state: () => {
    return {
      data: useLocalStorage('BoardStore:data', boardData),
    }
  },

  actions: {
    createTask(columnName: string, taskName: string) {
      const column = this.data.columns.filter((c) => c.name === columnName)[0]

      column.tasks.push({
        id: uuid(),
        name: taskName,
        description: '',
      })
    },

    createColumn(columnName: string) {
      this.data.columns.push({
        name: columnName,
        tasks: [],
      })
    },

    moveTask(
      fromColumnIndex: number,
      toColumnIndex: number,
      fromTaskIndex: number,
      toTaskIndex: number | null = null,
    ) {
      const fromColumn = this.data.columns[fromColumnIndex]
      const toColumn = this.data.columns[toColumnIndex]
      const task = fromColumn.tasks.splice(fromTaskIndex, 1)[0]
      toColumn.tasks.splice(toTaskIndex ?? toColumn.tasks.length, 0, task)
    },

    moveColumn(fromIndex: number, toIndex: number) {
      const column = this.data.columns[fromIndex]
      this.data.columns.splice(fromIndex, 1)
      this.data.columns.splice(toIndex, 0, column)
    },

    deleteColumn(index: number) {
      this.data.columns.splice(index, 1)
    },

    deleteTask(columnIndex: number, taskIndex: number) {
      this.data.columns[columnIndex].tasks.splice(taskIndex, 1)
    },
  },
})
