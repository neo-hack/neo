import React from 'react'
import { Switch } from 'react-router-dom'
import useSWR from 'swr'

import ExampleCount from '@/components/Counter/Count'
import SubRoutes from '@/routes/SubRoutes'
import { Routes } from '@/typings/component'
import api from '@/api'

interface PageProps {
  routes?: Routes[]
}

const Home = (props: PageProps) => {
  const { routes = [] } = props
  const { data } = useSWR('fake-data', api.fake.list, { refreshInterval: 1000 })
  return (
    <div>
      this is new home page reload
      {data?.map(v => (
        <span key={v}>{v}-1</span>
      ))}
      <ExampleCount />
      <Switch>
        {routes.map((route, i) => {
          return SubRoutes(route, i)
        })}
      </Switch>
    </div>
  )
}

export default Home
