import { createModel } from '@rematch2/core'

const counter = createModel({
  state: 0, // initial state
  reducers: {
    increment(state, payload) {
      return state + payload
    },
  },
  effects: {
    async incrementAsync(payload) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment(payload)
    },
  },
})

export default counter
