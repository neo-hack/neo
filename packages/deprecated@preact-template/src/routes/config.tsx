import { Routes } from '@/typings/component'
import Home from '@/pages/Home'
import HomeIn from '@/pages/Home/In'

export const routesConfig: Routes[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/in',
        component: HomeIn,
      },
    ],
  },
]
