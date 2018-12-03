import * as React from 'react'
import { RoutesConfigSchema } from '../config'
import { Route, Redirect } from 'react-router-dom'

function SubRoutes (route: RoutesConfigSchema) {
  return (
    <Route
      path={ route.path }
      render={ props => {
        // pass the sub-routes down to keep nesting
        // if (route.redirect) return <Redirect from={ route.path } to={ route.redirect } />
        return (
          <route.component
            { ...props }
            routes={ route.children }
          />
        )
      }}
    />
  )
}

export default SubRoutes
