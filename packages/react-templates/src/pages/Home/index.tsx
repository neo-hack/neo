import React from 'react'
import ExampleCount from 'react-templates/src/components/Examples/Count'
import SubRoutes from 'react-templates/src/routes/SubRoutes'
import { Switch } from 'react-router-dom'
import { Routes } from 'react-templates/src/types/component'

interface PageProps {
  routes?: Routes[]
}

class Home extends React.Component<PageProps> {
  render() {
    const { routes = [] } = this.props
    return (
      <div>
        this is new home page
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
