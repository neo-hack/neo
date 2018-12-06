import * as React from 'react'
import { addHistoryListener } from '@/watcher/history'

class In extends React.Component {
  render () {
    addHistoryListener({ pathname: '/home/in', callback: () => console.log('in'), id: 'in' })
    addHistoryListener({ pathname: '/home/in', callback: () => console.log('in2'), id: 'in2' })
    return (
      <div>
        this is in page
      </div>
    )
  }
}

export default In
