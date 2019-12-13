import { h } from 'preact'
import SubRoutes from '@/routes/SubRoutes'
import { Switch } from 'react-router-dom'
import { Routes } from '@/typings/component'

interface PageProps {
  routes?: Routes[]
}

const Home = (props: PageProps) => {
  return (
    <div>
      this is new home page reload
      <Switch>
        {props.routes.map((route, i) => {
          return SubRoutes(route, i)
        })}
      </Switch>
    </div>
  )
}

export default Home
