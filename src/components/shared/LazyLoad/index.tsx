import React from 'react'
import { Props } from '@/types/component'

const { Suspense, lazy } = React

function LazyLoad<T>(props: Props<T>, func: () => Promise<{ default: React.ComponentType<T> }>) {
  const OtherComponent = lazy(func)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent {...props} />
    </Suspense>
  )
}

export default LazyLoad
