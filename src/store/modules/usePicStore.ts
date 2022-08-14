import { defineStore } from 'pinia'

export const usePicStore = defineStore({
  id: 'pic',
  state: () => {
    return {
      url: '/demo.gif',
    }
  },
  getters: {
    bindUrlVal(): string {
      return `url(${this.url})`
    },
  },
  actions: {
    setPicUrl(url: string) {
      this.url = url
    },
  },
})
