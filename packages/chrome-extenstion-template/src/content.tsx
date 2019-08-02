import React from 'react'
import { Container } from './components/Container'
import { render } from 'react-dom'

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.color) {
    console.log('Receive color = ' + msg.color)
    document.body.style.backgroundColor = msg.color
    sendResponse('Change color to ' + msg.color)
  } else {
    sendResponse('Color message is none.')
  }
})


function mountApp () {
  new Promise((resolve) => {
    console.info('start mount react on app element')
    return resolve(true)
  })
  .then(() => {
    if (!document.querySelector('#APP')) {
      const body = document.querySelector('body')
      const app = document.createElement('div')
      app.id = 'APP'
      body.appendChild(app)
    }
    console.info('create app')
    return true
  })
  .then(() => {
    console.info('start mouting')
    render(<Container />, document.querySelector('#APP'))
    console.info('mounted')
  })
}

mountApp()
