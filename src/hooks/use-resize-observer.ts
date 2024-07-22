import { useLayoutEffect } from 'react';

import { useDefineRef } from './use-define-ref';
import { useSyncRef } from './use-sync-ref';

export const useResizeObserver = (callback: ResizeObserverCallback) => {
  const callbackRef = useSyncRef(callback);
  const resizeObserverRef = useDefineRef(
    () => new ResizeObserver((...args) => callbackRef.current(...args)),
  );

  useLayoutEffect(() => {
    return () => {
      resizeObserverRef.current.disconnect();
    };
  }, []);

  return resizeObserverRef;
};
