import { PluginFunc } from 'dayjs'

declare const plugin: PluginFunc
export as namespace plugin
export = plugin

declare namespace plugin {
  export type Input = { word: string }
  interface Hello {
    $word: string
    say(): void
  }
}

declare module 'dayjs' {
  export const hello: (input?: plugin.Input) => plugin.Hello
}
