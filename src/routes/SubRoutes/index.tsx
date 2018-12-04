import * as React from 'react'
import { RoutesConfigSchema } from '../config'
import { Route, Redirect } from 'react-router-dom'

function SubRoutes (route: RoutesConfigSchema, index?: any) {
  if (route.redirect) {
    return <Redirect key={ index } exact from={ route.path } to={ route.redirect } />
  }
  return (
    <Route
      key={ index }
      path={ route.path }
      render={ props => {
        // pass the sub-routes down to keep nesting
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
