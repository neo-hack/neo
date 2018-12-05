/**
 * Examples for rematch commmon
 */
import * as React from 'react'
import { connect } from 'react-redux'

const Count = (props: any) => (
  <div>
    The count is {props.common}
    <button onClick={props.increment}>increment</button>
    <button onClick={props.incrementAsync}>incrementAsync</button>
  </div>
)

const mapState = (state: any) => {
  console.log(state)
  return ({
    common: state.common,
  })
}

const mapDispatch = (dispatch: any) => {
  console.log(dispatch)
  return ({
    increment: () => dispatch.common.increment(1),
    // incrementAsync: dispatch.common.incrementAsync,
  })
}

const CountContainer = connect(mapState, mapDispatch)(Count)

export default CountContainer
