import * as React from 'react'
import App from './App'
import { render } from 'react-dom'

const $ROOT = document.querySelector('#app')

const renderApp = (Component) => {
  console.log('render')
  render(
    <Component />,
    $ROOT
  )
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp(App)
})
