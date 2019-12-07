export type Props<T> =
  | (JSX.IntrinsicAttributes &
      React.PropsWithoutRef<T> &
      // tslint:disable-next-line
      React.RefAttributes<React.Component<T, any, any>>)
  | (JSX.IntrinsicAttributes & React.PropsWithRef<React.PropsWithChildren<T>>)

export interface Routes {
  path: string
  redirect?: string
  component?: any
  children?: Routes[]
}
