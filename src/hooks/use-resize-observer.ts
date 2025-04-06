import { useLayoutEffect } from 'react';

import { useDefineRef } from './use-define-ref.js';
import { useSyncRef } from './use-sync-ref.js';

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
