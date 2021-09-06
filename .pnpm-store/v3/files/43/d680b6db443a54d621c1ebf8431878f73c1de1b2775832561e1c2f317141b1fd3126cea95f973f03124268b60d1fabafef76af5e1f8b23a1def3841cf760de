/* eslint no-console: off */
const chalk = require('chalk')
module.exports = function createProgressReporter(options) {
  let lastReported = 0
  let lastFile
  let shouldHookExit = options && options.hookExit
  const stats = []
  const eslintPlugin = {
    rules: {
      activate: {
        create(context) {
          if (!process.argv.includes('--fix')) {
            return {}
          }
          if (shouldHookExit) {
            shouldHookExit = false
            process.on('exit', printStats)
          }
          const now = Date.now()
          if (now > lastReported + 15000) {
            lastReported = now
            // console.error(`🎯 Found ${stats.length} files changed.`)
          }
          if (lastFile) {
            lastFile.finish = now
            lastFile.duration = now - lastFile.start
            stats.push(lastFile)
          }
          lastFile = {
            name: context.getFilename(),
            start: now,
          }
          return {}
        },
      },
    },
  }
  function printStats() {
    const totalTime = stats.map((s) => s.duration).reduce((a, b) => a + b, 0)
    const minutes = (totalTime / 1000).toFixed(1)
    console.log()
    console.log(`⏱️  ${stats.length} files processed in ${minutes} seconds.`)
    stats.sort((a, b) => b.duration - a.duration)
    const slow = stats.slice(0, 20)
    console.error(`🎯 Found ${stats.length} files changed.`)
    if (stats.length >= 20) {
      console.log(`🐢 Slowest ${slow.length} files`)
    }
    for (const file of stats.slice(0, 20)) {
      console.log(`✍️  Fixing up ${chalk.bold(file.name)} (${file.duration} ms).`)
    }
    console.log('✅ Everything is awesome!')
  }
  return {
    eslintPlugin,
    printStats,
    stats,
  }
}
