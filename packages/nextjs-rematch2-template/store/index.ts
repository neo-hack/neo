import { Models, init } from '@rematch2/core'

import user from '@/users/models/user'
export interface RootModel extends Models {
  user: typeof user
}

export const models: RootModel = {
  user,
}

export const initializeStore = () => {
  return init({
    models,
  })
}
