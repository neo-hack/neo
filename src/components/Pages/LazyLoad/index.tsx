import * as React from 'react'

const { Suspense } = React

const PageLazyLoad = (props, OtherComponent) => {
  return (
    <Suspense fallback={ <div>Loading...</div> }>
      <OtherComponent { ...props } />
    </Suspense>
  )
}

export default PageLazyLoad
