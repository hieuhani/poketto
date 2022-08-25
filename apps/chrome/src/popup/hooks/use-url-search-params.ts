import { useEffect, useMemo, useState } from 'react';

export const useUrlSearchParams = () => {
  const [, setRenderTimes] = useState<number>(0);
  const forceUpdate = () => {
    setRenderTimes((value) => value + 1);
  };
  const locationSearch = window.location.search;
  const urlSearchParams = useMemo(() => {
    return new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop.toString()),
    });
  }, [locationSearch]);

  useEffect(() => {
    const onPopState = () => {
      forceUpdate();
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);
  return [urlSearchParams as any];
};
