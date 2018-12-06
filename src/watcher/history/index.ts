import createHashHistory from 'history/createHashHistory'
import { parse } from 'query-string'

const isArray = require('lodash/isArray')

const $GLOBAL = 'global'
let currentPathname = $GLOBAL

// Watchers
interface ListenerSchema {
  id: string
  callback: (val: any) => any
}

interface ListenersSchema {
  [x: string]: {
    ids: string[],
    callbacks: {
      [x: string]: ListenerSchema
    },
  },
}
export const listeners: ListenersSchema = {}

// Method
interface AddListenerSchema {
  pathname: string
  callback: (val: any) => any
  id: string,
}

export const addHistoryListener = ({ pathname, callback, id }: AddListenerSchema) => {
  if (currentPathname !== $GLOBAL && currentPathname !== pathname) return null
  if (!listeners[pathname]) {
    listeners[pathname] = {
      ids: [ id ],
      callbacks: {
        [ id ]: {
          callback,
          id,
        }
      },
    }
  } else {
    let { callbacks } = listeners[pathname]
    callbacks[id] = {
      callback,
      id,
    }
    listeners[pathname].ids = Object.keys(callbacks)
  }
}

// Entry
const history = createHashHistory()

history.listen((val) => {
  const { pathname } = val
  currentPathname = pathname
  console.log(listeners)
})

export default history
