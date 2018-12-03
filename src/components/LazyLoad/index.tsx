import * as React from 'react'

const { Suspense, lazy } = React

const LazyLoad = (props, func: () => any) => {
  const OtherComponent = lazy(func)
  return (
    <Suspense fallback={ <div>Loading...</div> }>
      <OtherComponent { ...props } />
    </Suspense>
  )
}

export default LazyLoad
