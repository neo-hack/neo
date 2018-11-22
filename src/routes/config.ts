import Home from 'pages/Home'

export interface RoutesConfigSchema {
  path: string
  component: any
  children?: RoutesConfigSchema[],
}

export const routesConfig = [
  {
    path: '/home',
    component: Home,
  },
]
