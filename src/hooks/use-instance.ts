import { useLayoutEffect } from 'react';

import { useAbortSignal } from './use-abort-signal.js';
import { useConstant } from './use-constant.js';

interface InstanceCreateConfig<TPayload, TArgs extends any[] = any[]> {
  abortSignal: AbortSignal;
  payload: TPayload;
  args: TArgs;
}

/**
 * Hook `useInstance` is used to create and manage an instance of an object
 * that requires access to the root store and an abort signal.
 *
 * @param factory - A factory function that takes a configuration and returns an instance.
 * @param config - Optional configuration that contains additional input parameters and an update function.
 * @returns An instance created by the factory function.
 */
export const useInstance = <TInstance, TPayload, TArgs extends any[] = any[]>(
  factory: (
    config: InstanceCreateConfig<NoInfer<TPayload>, NoInfer<TArgs>>,
  ) => TInstance,
  config?: {
    payload?: TPayload;
    args?: TArgs;
    onUpdate?: (payload: TPayload, args: TArgs) => void;
  },
) => {
  const abortSignal = useAbortSignal();

  const instance = useConstant(() =>
    factory({
      abortSignal,
      payload: config?.payload as any,
      args: config?.args as any,
    }),
  );

  useLayoutEffect(() => {
    config?.onUpdate?.(config.payload!, config.args!);
  }, [config?.payload, ...(config?.args ?? [])]);

  return instance;
};
