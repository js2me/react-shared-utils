/* eslint-disable @typescript-eslint/ban-ts-comment */
import { debounce } from 'lodash-es';
import { useEffect } from 'react';

import { useSyncRef } from './use-sync-ref.js';

export const useEventListener = <EventName extends keyof HTMLElementEventMap>({
  event,
  handler,
  options,
  deps = [],
  node = document,
  debounce: debounceTimeout,
}: {
  event: EventName;
  handler: (event: HTMLElementEventMap[EventName]) => void;
  options?: boolean | AddEventListenerOptions;
  deps?: unknown[];
  node?: HTMLElement | Document | Window;
  debounce?: number;
}) => {
  const handlerRef = useSyncRef(handler);

  useEffect(() => {
    const handleEvent = (event: HTMLElementEventMap[EventName]) =>
      handlerRef.current(event);

    const handler =
      debounceTimeout == null
        ? handleEvent
        : debounce(handleEvent, debounceTimeout);

    // @ts-expect-error
    node.addEventListener(event, handler, options);
    // @ts-expect-error
    return () => node.removeEventListener(event, handler, options);
  }, deps);
};
