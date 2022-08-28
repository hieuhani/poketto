import { MessageRequest } from '../background/types';
import browser from 'webextension-polyfill';

function injectScript() {
  try {
    const container = document.head || document.documentElement;
    const scriptTag = document.createElement('script');
    scriptTag.src = browser.runtime.getURL('./dist/inpage/index.js');
    container.insertBefore(scriptTag, container.children[0]);
    container.removeChild(scriptTag);
  } catch (error) {
    console.error('Poketto injection failed.', error);
  }
}

injectScript();

const pokettoChannel = new BroadcastChannel('poketto');

pokettoChannel.onmessage = async function (event) {
  if (event.data) {
    let error = null;
    let data = null;
    try {
      data = await browser.runtime.sendMessage({
        ...event.data,
        channel: 'content_script',
      });
    } catch (e) {
      error = e;
    }
  }
};

browser.runtime.onMessage.addListener(
  async (request: MessageRequest, sender) => {
    if (request.channel === 'background') {
      pokettoChannel.postMessage({
        data: request.payload,
        requestId: request.requestId,
      });
    }
  }
);
