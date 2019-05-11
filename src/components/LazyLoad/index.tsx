import React from "react";

const { Suspense, lazy } = React;

type Props<T> =
  | (JSX.IntrinsicAttributes &
      React.PropsWithoutRef<T> &
      // tslint:disable-next-line
      React.RefAttributes<React.Component<T, any, any>>)
  | (JSX.IntrinsicAttributes & React.PropsWithRef<React.PropsWithChildren<T>>);

function LazyLoad<T>(
  props: Props<T>,
  func: () => Promise<{ default: React.ComponentType<T> }>
) {
  const OtherComponent = lazy(func);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent {...props} />
    </Suspense>
  );
}

export default LazyLoad;
