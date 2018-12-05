import createHashHistory from 'history/createHashHistory'
import { parse } from 'query-string'

const isArray = require('lodash/isArray') 

// Watchers
interface ListenerSchema {
  force?: boolean
  listener: (val: any) => any
}

interface ListenersSchema {
  [x: string]: ListenerSchema[]
}
const listeners: ListenersSchema = {}

// Method
interface AddListenerSchema {
  location: string
  listener: (val: any) => any
  force?: boolean
}

export const addHistoryListener = ({ location, listener, force }: AddListenerSchema) => {
  if (isArray(listeners[location])) {

  } else {
    listeners[location] = [
      {
        force,
        listener: listener
      },
    ]
  }
}

const addForceListener = ({ listener }: { listener: (val?: any) => any }) => {
  
}

const addNormalListener = ({ location, listener }) => {}

// Entry
const history = createHashHistory()

history.listen((val) => console.log(val))

export default history
