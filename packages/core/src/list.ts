import { templates } from './utils/constants'
import chalk from 'chalk'

/**
 * Padding.
 */

console.log()
process.on('exit', () => {
  console.log()
})

/**
 * @description List all templates
 */
export const list = () => {
  const keys = Object.keys(templates)
  console.log(`There are ${keys.length} templates...`)
  console.log()
  keys.forEach((k) => {
    console.log(`  ${chalk.blue('•')} ${chalk.bold.green(k)}: ${templates[k]}`)
  })
  console.log()
}
