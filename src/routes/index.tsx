import * as React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { routesConfig } from './config'
import SubRoutes from './SubRoutes'
import { Redirect } from 'react-router-dom'

const RouterViewer = () => {
  return (
    <HashRouter>
      <Switch>
        {
          routesConfig.map((route, i) => {
            return SubRoutes(route, i)
          })
        }
      </Switch>
    </HashRouter>
  )
}

export default RouterViewer
