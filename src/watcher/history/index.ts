import createHashHistory from 'history/createHashHistory'
const isEmpty = require('lodash/isEmpty')

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
let listenersIds = []

// Method
interface AddListenerSchema {
  pathname: string
  callback: (val: any) => any
  id: string,
}

const updateListenerIds = () => {
  listenersIds = Object.keys(listeners)
}

export const addHistoryListener = ({ pathname, callback, id }: AddListenerSchema) => {
  if (pathname !== $GLOBAL && currentPathname !== $GLOBAL && currentPathname !== pathname) return null
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
  updateListenerIds()
}
  

interface RemoveListenerSchema {
  pathname: string,
  id: string
}

export const removeHistoryListener = ({ pathname, id }: RemoveListenerSchema) => {
  if (!listeners[pathname]) return null
  const { callbacks } = listeners[pathname]
  if (!callbacks[id]) {
    console.info('ID not exit')
    return null
  }
  delete callbacks[id]
  listeners[pathname].ids = Object.keys(callbacks)
  updateListenerIds()
}

// Emit Global Listeners
const emitPathListeners = (location, pathname) => {
  if (!listeners[pathname]) return null
  if (isEmpty(listeners[pathname])) return null
  const { ids, callbacks } = listeners[pathname]
  if (!ids || isEmpty(ids)) return null
  ids.forEach(item => {
    const { callback } = callbacks[item]
    if (!callback) return null
    callback(location)
  })
}

const emitListeners = (location) => {
  const { pathname } = location
  const validPathname = listenersIds.filter(item => {
    if (pathname.startsWith(item) || item === pathname) return true
    if (!item) return false
    return false
  })
  // Global
  emitPathListeners(location, $GLOBAL)
  // Current
  validPathname.forEach(item => {
    emitPathListeners(location, item)
  })
}

// Entry
const history = createHashHistory()

history.listen((val) => {
  emitListeners(val)
})

export default history
