import { useFlag } from './use-flag.js';

export const useToggle = (initialState?: boolean) => {
  const flag = useFlag(initialState);
  return [flag.enabled, flag.toggle, flag.set] as const;
};
