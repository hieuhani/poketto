import { MessageMethod } from './types';

class Poketto {
  private channel: BroadcastChannel;
  private requestId: number;
  constructor() {
    this.channel = new BroadcastChannel('poketto');
    this.requestId = 0;
  }

  async connect() {
    return this.dispatch(MessageMethod.CONNECT, {});
  }

  dispatch(method: string, payload: unknown) {
    const requestId = this.requestId++;
    return new Promise((resolve, reject) => {
      this.channel.postMessage({ method, payload, requestId });
      const onMessageHandler = (event: any) => {
        if (event.data.requestId === requestId) {
          this.channel.removeEventListener('message', onMessageHandler);
          if (event.error) {
            return reject(event.data.error);
          } else {
            return resolve(event.data.data);
          }
        }
      };
      this.channel.addEventListener('message', onMessageHandler);
    });
  }
}

window.poketto = new Poketto();
