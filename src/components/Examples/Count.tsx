/**
 * Examples for rematch commmon
 */
import * as React from 'react'
import { connect } from 'react-redux'

import { RootState, Dispatch } from '@/types/rematch'

const mapState = (state: RootState) => {
  return {
    common: state.common,
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    increment: () => dispatch.common.increment(1),
    incrementAsync: () => dispatch.common.incrementAsync(1),
  }
}

type CountProps = Partial<ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>>

const Count = (props: CountProps) => (
  <div>
    The count is {props.common}
    <button onClick={props.increment}>increment</button>
    <button onClick={props.incrementAsync}>incrementAsync</button>
  </div>
)

export default connect(
  mapState,
  mapDispatch,
)(Count)
