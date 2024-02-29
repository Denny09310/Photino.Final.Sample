import type { ReceiveMessageCallback } from "./ipc";

declare global {
  interface Window {
    chrome?: {
      webview?: {
        addEventListener: (message: string, handler: (event: unknown) => void) => void;
        removeEventListener: (message: string, handler: (event: unknown) => void) => void;
        postMessage: (message: string) => void;
      };
    };
    readonly external: External;
  }
  interface External {
    sendMessage: (message: string) => void;
    receiveMessage: (callback: ReceiveMessageCallback) => () => void;
  }
}
