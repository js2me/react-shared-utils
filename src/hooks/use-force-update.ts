import { useCallback, useState } from 'react';

export const useForceUpdate = () => {
  // eslint-disable-next-line sonarjs/hook-use-state
  const [, setState] = useState<unknown>(null);

  return useCallback(() => {
    setState({});
  }, []);
};
