import * as React from 'react'
import { RoutesConfigSchema } from '../config'
import { Route } from 'react-router-dom'

function SubRoutes(route: RoutesConfigSchema) {
  return (
    <Route
      path={ route.path }
      render={ props => (
        // pass the sub-routes down to keep nesting
        <route.component
          { ...props } routes={ route.children }
        />
      )}
    />
  )
}

export default SubRoutes
