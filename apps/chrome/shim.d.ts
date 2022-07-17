import { ProtocolWithReturn } from 'webext-bridge';

declare module 'webext-bridge' {
  export interface ProtocolMap {
    'tab-prev': { title: string | undefined };
    'get-current-tab': ProtocolWithReturn<{ tabId: number }, { title: string }>;
  }
}
