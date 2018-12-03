import * as React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { routesConfig } from './config'
import SubRoutes from './SubRoutes'
import { Redirect } from 'react-router-dom'

const RouterViewer = () => {
  return (
    <HashRouter>
      <Switch>
        <Redirect exact from='/' to='/home' />
        {
          routesConfig.map((route, i) => (
              <SubRoutes key={i} {...route} />
            )
          )
        }
      </Switch>
    </HashRouter>
  )
}

export default RouterViewer
