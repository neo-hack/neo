import anime from 'animejs'
import ready from 'document-ready'
import './index.styl'

ready(() => {
  anime({
    targets: '.anime',
    translateX: 250,
    duration: 3000,
  })
})
