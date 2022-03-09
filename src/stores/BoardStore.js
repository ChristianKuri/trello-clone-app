import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import boardData from '../data/default-board'

export const useBoardStore = defineStore('BoardStore', {
  state: () => {
    return {
      data: useLocalStorage('BoardStore:data', boardData)
    }
  }
})
