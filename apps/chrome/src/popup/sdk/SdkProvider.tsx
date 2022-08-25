import { PropsWithChildren, useMemo } from 'react';
import { useUrlSearchParams } from '../hooks/use-url-search-params';
import { SdkContext, SdkContextState } from './SdkContext';

export const SdkProvider: React.FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [params] = useUrlSearchParams();
  const value = useMemo<SdkContextState>(
    () => ({
      request: params.request ? JSON.parse(params.request) : undefined,
      origin: params.origin,
      tabId: params.tabId,
      valid: !!params.tabId && !!params.origin && !!params.request,
    }),
    [params]
  );
  return <SdkContext.Provider value={value}>{children}</SdkContext.Provider>;
};
