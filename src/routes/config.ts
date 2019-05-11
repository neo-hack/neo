import LazyLoad from '@/components/LazyLoad'
import { Props } from '@/types/component'

export interface RoutesConfigSchema {
  path: string
  redirect?: string
  component?: <T extends { routes?: RoutesConfigSchema[] }>(props: Props<T>) => JSX.Element
  children?: RoutesConfigSchema[]
}

export const routesConfig: RoutesConfigSchema[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: props => LazyLoad(props, () => import('@/pages/Home')),
    children: [
      {
        path: '/home/in',
        component: props => LazyLoad(props, () => import('@/pages/Home/In')),
      },
    ],
  },
]
