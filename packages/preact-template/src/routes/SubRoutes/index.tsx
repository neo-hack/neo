import { h } from 'preact'
import { Routes } from '@/typings/component'
import { Route, Redirect } from 'react-router-dom'

function SubRoutes(route: Routes, index?: string | number) {
  if (route.redirect) {
    return <Redirect key={index} exact={true} from={route.path} to={route.redirect} />
  }
  return (
    <Route
      key={index}
      path={route.path}
      render={props => {
        // pass the sub-routes down to keep nesting
        return <route.component {...props} routes={route.children} />
      }}
    />
  )
}

export default SubRoutes
