import * as React from 'react'
import PageLazyLoad from '@/components/Pages/LazyLoad'
import { Redirect } from 'react-router-dom'

const Home = React.lazy(() => import('@/pages/Home'))

export interface RoutesConfigSchema {
  path: string
  redirect?: string
  component?: any
  children?: RoutesConfigSchema[]
}

export const routesConfig: RoutesConfigSchema[] = [
  // {
  //   path: '/',
  //   redirect: '/home',
  //   component: () => <Redirect exact from='/' to='/home' />,
  // },
  {
    path: '/home',
    component: (props) => PageLazyLoad(props, Home),
  },
]
