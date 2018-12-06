import createHashHistory from 'history/createHashHistory'
import { parse } from 'query-string'

const isArray = require('lodash/isArray')

// Watchers
interface ListenerSchema {
  id: string
  callback: (val: any) => any
}

interface ListenersSchema {
  [x: string]: {
    ids: string[],
    callbacks: ListenerSchema[],
  },
}
const listeners: ListenersSchema = {}

// Method
interface AddListenerSchema {
  location: string
  listener: (val: any) => any
  force?: boolean
}

// export const addHistoryListener = ({ location, listener, force }: AddListenerSchema) => {
//   if (isArray(listeners[location])) {

//   } else {
//     listeners[location] = [
//       {
//         force,
//         listener: listener
//       },
//     ]
//   }
// }

// const addForceListener = ({ listener }: { listener: (val?: any) => any }) => {
  
// }

export const addNormalListener = ({ location, func, id }) => {
  listeners[location] = {
    ids: [ '1' ],
    callbacks: [func]
  }
  // if (!listeners[location]) {

  // }
  // if (isArray(listeners[location])) {
  //   const listener = {
  //     listener: func,
  //   }
  //   listeners[location].push(listener)
  // } else {
  //   listeners[location] = [ { listener: func } ]
  // }
}

// Entry
const history = createHashHistory()

history.listen((val) => console.log(val))

export default history
