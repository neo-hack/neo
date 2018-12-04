import * as React from 'react'
import noop from ''

const { Suspense, lazy } = React

noop()

interface x {
  a: () => undefined
}

const PageLazyLoad = (props, func: noop) => {
  return (
    <Suspense fallback={ <div>Loading...</div> }>
      <OtherComponent { ...props } />
    </Suspense>
  )
}

export default PageLazyLoad
