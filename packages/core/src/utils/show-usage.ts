import pc from 'picocolors'

export const usage = {
  run: () => {
    return `
Example:
$ ${pc.green('neo run @aiou/generator-pnpm-ci')}
$ ${pc.green('neo run filename.yaml')}
    `
  },
}
