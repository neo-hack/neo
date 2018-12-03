import * as React from 'react'
import { Redirect } from 'react-router-dom'

export interface RoutesConfigSchema {
  path: string
  component?: any
  children?: RoutesConfigSchema[],
}

export const routesConfig = [
  {
    path: '/home',
    component: React.lazy(() => import('@/pages/Home')),
  },
]
