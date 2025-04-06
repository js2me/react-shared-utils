import { useDefineRef } from './use-define-ref.js';

/**
 * React hook for creating a value exactly once.
 * useMemo doesn't give this guarantee unfortunately -
 * https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
 * https://reactjs.org/docs/hooks-reference.html#usememo
 * @param getValue Function which returns defined value.
 */
export const useConstant = <T>(getValue: () => T): T => {
  const ref = useDefineRef(() => ({ value: getValue() }));
  return ref.current.value;
};
