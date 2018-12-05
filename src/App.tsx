import * as React from 'react'
import RouterViewer from '@/routes'
import '@/assets/stylus/App.styl'
import store from './store'

console.log(store)

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        this is react-simple webpack template
        <RouterViewer />
      </div>
    )
  }
}

let AppContainer = App

if (process.env.NODE_ENV === 'development') {
  const { hot } = require('react-hot-loader')
  AppContainer = hot(module)(App)
}

export default AppContainer
