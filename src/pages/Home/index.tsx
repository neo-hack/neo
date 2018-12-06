import * as React from 'react'
import ExampleCount from '@/components/Examples/Count'
import SubRoutes from '@/routes/SubRoutes'
import history, { addHistoryListener } from '@/watcher/history'
import { Switch } from 'react-router-dom'

interface PageProps {
  routes?: any
}

class Home extends React.Component <PageProps> {
  render () {
    const { routes } = this.props
    addHistoryListener({ pathname: '/home', callback: () => console.log('home'), id: 'home' })
    return (
      <div>
        this is new home page
        <ExampleCount />
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
