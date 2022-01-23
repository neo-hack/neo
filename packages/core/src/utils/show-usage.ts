import pc from 'picocolors'

export const usage = {
  run: () => {
    return `
Example:
$ ${pc.green('neo run @aiou/generator-pnpm-ci')}
$ ${pc.green('neo run filename.yaml')}`
  },
  add: () => {
    return `
Example:
$ ${pc.green('neo add @aiou/preset-demo --preset')}
$ ${pc.green('neo add @aiou/ts-lib-template')}
      `
  },
}
