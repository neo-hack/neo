import Debug from 'debug'

export const prefix = 'mario'

export const debug = {
  workflow: Debug(`${prefix}:workflow`),
  job: Debug(`${prefix}:job`),
  uses: Debug(`${prefix}:uses`),
  run: Debug(`${prefix}:uses`),
}
