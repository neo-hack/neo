import * as React from 'react'
import SubRoutes from './SubRoutes'
import history from '@/watcher/history'
import { HashRouter, Switch, Router } from 'react-router-dom'
import { routesConfig } from './config'

const RouterViewer = () => {
  return (
    <Router history={ history }>
      <Switch>
        {
          routesConfig.map((route, i) => {
            return SubRoutes(route, i)
          })
        }
      </Switch>
    </Router>
  )
}

export default RouterViewer
