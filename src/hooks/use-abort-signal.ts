import { useAbortController } from './use-abort-controller';

export const useAbortSignal = () => {
  return useAbortController().signal;
};
