import { ComponentType, lazy, Suspense } from 'react';
import { fetchLazyModule } from 'yammies/imports';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LoadableComponentFn<P = Record<string, any>> = () => Promise<
  ComponentType<P>
>;

const DefaultFallback: ComponentType = () => null;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function loadable<P = any>(
  loadFn: LoadableComponentFn<P>,
  Fallback?: Maybe<ComponentType>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ExtraComponent?: ComponentType<any>,
): ComponentType<P> {
  const LazyComponent = lazy(async () => ({
    default: await fetchLazyModule(loadFn),
  }));

  const UsageFallback = Fallback ?? DefaultFallback;

  return (props?: P) => (
    <Suspense fallback={<UsageFallback {...props} />}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <LazyComponent {...(props as any)} />
      {ExtraComponent && <ExtraComponent />}
    </Suspense>
  );
}
