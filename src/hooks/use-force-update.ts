import { useCallback, useState } from 'react';

interface ForceUpdateFn {
  (): void;
  dep: unknown;
}

export const useForceUpdate = () => {
  const [dep, setState] = useState<unknown>(null);

  const forceUpdateFn = useCallback(() => {
    setState({});
  }, []);

  (forceUpdateFn as any).dep = dep;

  return forceUpdateFn as unknown as ForceUpdateFn;
};
