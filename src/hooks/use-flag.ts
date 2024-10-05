import { useCallback, useRef, useState } from 'react';

export interface FlagHook {
  enabled: boolean;
  toggle: VoidFunction;
  enable: VoidFunction;
  set: (enabled: boolean) => void;
  disable: VoidFunction;
}

export const useFlag = (defaultValue = false): FlagHook => {
  const [enabled, setEnabled] = useState(defaultValue);

  const toggle = useCallback(() => setEnabled((value) => !value), []);
  const enable = useCallback(() => setEnabled(true), []);
  const set = setEnabled;
  const disable = useCallback(() => setEnabled(false), []);

  const flagObjectRef = useRef<FlagHook>({
    enabled,
    toggle,
    enable,
    set,
    disable,
  });

  flagObjectRef.current.enabled = enabled;

  return flagObjectRef.current;
};
