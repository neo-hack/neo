import React from 'react'
import ExampleCount from '@/components/Counter/Count'
import SubRoutes from '@/routes/SubRoutes'
import { Switch } from 'react-router-dom'
import { Routes } from '@/typings/component'

interface PageProps {
  routes?: Routes[]
}

class Home extends React.Component<PageProps> {
  render() {
    const { routes = [] } = this.props
    return (
      <div>
        this is new home page reload
        <ExampleCount />
        <Switch>
          {routes.map((route, i) => {
            return SubRoutes(route, i)
          })}
        </Switch>
      </div>
    )
  }
}

export default Home
