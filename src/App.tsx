import * as React from 'react'
import Home from '@/components/Home'
import '@/assets/stylus/App.styl'

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        this is react-simple webpack template
        <Home />
      </div>
    )
  }
}

export default App
