import * as React from 'react'
import LazyLoad from '@/components/LazyLoad'
import { Redirect } from 'react-router-dom'

export interface RoutesConfigSchema {
  path: string
  redirect?: string
  component?: any
  children?: RoutesConfigSchema[]
}

export const routesConfig: RoutesConfigSchema[] = [
  {
    path: '/',
    redirect: '/home',
    // component: (props) => <Redirect to='/home' />,
  },
  {
    path: '/home',
    component: (props) => LazyLoad(props, () => import('@/pages/Home')),
  },
]
