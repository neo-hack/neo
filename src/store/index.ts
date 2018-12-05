import { init } from '@rematch/core'
import models from './models'
console.log(typeof models)

const store = init({
  models
})

export default store
