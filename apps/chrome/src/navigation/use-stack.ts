import { useState } from 'react';

export const useStack = (initialStack: string[]) => {
  const [stack, setStack] = useState<string[]>(initialStack);
  const size = stack.length;

  const isEmpty = size === 0;
  const top = stack[size - 1];
  const push = (value: string) => setStack([...stack, value]);
  const pop = () => {
    const item = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    return item;
  };

  return { stack, size, isEmpty, top, push, pop };
};
