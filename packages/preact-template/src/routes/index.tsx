import { h } from 'preact'
import SubRoutes from './SubRoutes'
import { Switch, HashRouter } from 'react-router-dom'
import { routesConfig } from './config'

const RouterViewer = () => {
  return (
    <HashRouter>
      <Switch>
        {routesConfig.map((route, i) => {
          return SubRoutes(route, i)
        })}
      </Switch>
    </HashRouter>
  )
}

export default RouterViewer
