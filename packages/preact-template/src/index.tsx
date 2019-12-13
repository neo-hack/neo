import { h, render, ComponentType } from 'preact'
import App from './App'

const $ROOT = document.querySelector('#app')

const renderApp = (Component: ComponentType<{}>) => {
  render(<Component />, $ROOT)
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp(App)
})
