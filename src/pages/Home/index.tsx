import * as React from 'react'
import SubRoutes from '@/routes/SubRoutes'
import { Switch } from 'react-router-dom'

interface PageProps {
  routes?: any
}

class Home extends React.Component <PageProps> {
  render () {
    const { routes } = this.props
    return (
      <div>
        this is new home page
        <Switch>
          {
            routes.map((route, i) => {
              return SubRoutes(route, i)
            })
          }
        </Switch>
      </div>
    )
  }
}

export default Home
