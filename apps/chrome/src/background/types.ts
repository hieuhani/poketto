export interface MessageRequest {
  method: string;
  payload: any;
  requestId: number;
  channel?: string;
  tabId?: string;
}
