import { useEffect, useState } from 'react';

export const useCopy = () => {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };
  useEffect(() => {
    let intervalFn: NodeJS.Timer | null = null;
    if (copied) {
      intervalFn = setInterval(() => {
        setCopied(false);
      }, 2000);
    }
    return () => {
      if (intervalFn) {
        clearInterval(intervalFn);
      }
    };
  }, [copied]);
  return { copied, copy };
};
