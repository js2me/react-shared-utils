import { useDefineRef } from './use-define-ref';

/**
 * React hook for creating a value exactly once.
 * useMemo doesn't give this guarantee unfortunately -
 * https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
 * https://reactjs.org/docs/hooks-reference.html#usememo
 * @param defineValue Function which returns defined value.
 */
export const useConstant = <T>(defineValue: () => T): T => {
  const ref = useDefineRef(() => ({ value: defineValue() }));
  return ref.current.value;
};
