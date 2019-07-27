if (process.env.NODE_ENV === 'development') {
  require('crx-hotreload')
}

function polling() {
  console.log('polling')
  setTimeout(polling, 1000 * 30)
}

polling()
