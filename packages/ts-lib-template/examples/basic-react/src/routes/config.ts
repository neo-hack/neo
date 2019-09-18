import LazyLoad from '@/components/shared/LazyLoad'
import { Routes } from 'src/typings/component'

export const routesConfig: Routes[] = [
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
