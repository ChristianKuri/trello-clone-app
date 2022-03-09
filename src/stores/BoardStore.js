import { defineStore } from 'pinia'
import boardData from '../data/default-board'

export const useBoardStore = defineStore('BoardStore', {
  state: () => {
    return {
      data: boardData
    }
  }
})
