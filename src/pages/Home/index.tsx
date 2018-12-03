import * as React from 'react'
import Test from '../../components/test'

class Home extends React.Component {
  render () {
    console.log(this.props)
    return (
      <div>
        this is new home page
        <Test />
      </div>
    )
  }
}

export default Home
