import * as React from 'react'
import App from './App'
import { render } from 'react-dom'
// import '@babel/polyfill'

const $ROOT = document.querySelector('#app')

var arr = ['a', 'b', 'c']
Array.from('abc')
var array1 = [1, 2, 3];
console.log(array1.includes(2));

const renderApp = (App) => {
  console.log('render')
  render(
    <App />,
    $ROOT
  )
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp(App)
})
