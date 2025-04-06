import { Ref } from 'react';
import { AnyObject } from 'yummies/utils/types';

export const attachRef = <Element>(
  ref: Ref<Element> | undefined | null,
  node: Element | null,
) => {
  if (!ref) return;
  if (typeof ref === 'object') {
    (ref as AnyObject).current = node;
  } else {
    ref(node);
  }
};
