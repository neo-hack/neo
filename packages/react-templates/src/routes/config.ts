import LazyLoad from 'react-templates/src/components/shared/LazyLoad'
import { Routes } from 'react-templates/src/types/component'

export const routesConfig: Routes[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: props => LazyLoad(props, () => import('react-templates/src/pages/Home')),
    children: [
      {
        path: '/home/in',
        component: props => LazyLoad(props, () => import('react-templates/src/pages/Home/In')),
      },
    ],
  },
]
