import Debug from 'debug'

const prefix = 'gen'

export const debug = {
  workflow: Debug(`${prefix}:workflow`),
  job: Debug(`${prefix}:job`),
  uses: Debug(`${prefix}:uses`),
  run: Debug(`${prefix}:uses`),
}
