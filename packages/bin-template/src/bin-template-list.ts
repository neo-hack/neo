import { templates } from './utils/constants'

/**
 * Padding.
 */

console.log()
process.on('exit', () => {
  console.log()
})

/**
 * List all templates
 */

console.log('  Templates:')
console.log()
Object.keys(templates).forEach(k => {
  console.log(`    * ${k}: ${templates[k]}`)
  console.log()
})
