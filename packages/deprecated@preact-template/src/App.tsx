import { h } from 'preact'
import RouterViewer from '@/routes'
import './App.styl'

const App = () => {
  return (
    <div className="app">
      this is react-simple webpack templatedsdsdsddsdasdsadsds
      <RouterViewer />
    </div>
  )
}

if (process.env.NODE_ENV === 'development') {
  require('preact/debug')
}

export default App
