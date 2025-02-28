import { useCallback, useState } from 'react';

interface ForceUpdateFn {
  (): void;
  dep: unknown;
}

export const useForceUpdate = () => {
  const [state, setState] = useState<unknown>(null);

  const forceUpdateFn = useCallback(() => {
    setState({});
  }, []);

  (forceUpdateFn as any).dep = state;

  return forceUpdateFn as unknown as ForceUpdateFn;
};
