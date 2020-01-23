import { RematchRootState, RematchDispatch } from '@rematch2/core'
import { RootModel } from './store'

declare global {
  interface Window {
    __NEXT_REDUX_STORE__: any
  }
  interface RootState extends RematchRootState<RootModel> {}
  interface Dispatch extends RematchDispatch<RootModel> {}
}
