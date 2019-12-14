import React, { useEffect, useState } from 'react'
import { Switch } from 'react-router-dom'

import ExampleCount from '@/components/Counter/Count'
import SubRoutes from '@/routes/SubRoutes'
import { Routes } from '@/typings/component'
import api from '@/api'

interface PageProps {
  routes?: Routes[]
}

const Home = (props: PageProps) => {
  const { routes = [] } = props
  const [data, setData] = useState<number[]>()
  useEffect(() => {
    const fetch = async () => {
      const res = await api.fake.list(10, 10)
      setData(res)
    }
    fetch()
  }, [])
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
