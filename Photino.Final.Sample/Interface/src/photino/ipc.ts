window.external = {
  ...window.external,
  receiveMessage: (callback: (data: string) => void) => {
    const dataCallBack = (e: unknown) => callback((e as ReceiveMessagePayload).data);
    window.chrome?.webview?.addEventListener("message", dataCallBack);
    return () => window.chrome?.webview?.removeEventListener("message", dataCallBack);
  },
  sendMessage(message: string) {
    window.chrome?.webview?.postMessage(message);
  },
};

export type ReceiveMessageCallback = (arg: string) => void;
export type ReceiveMessagePayload = { data: string };

export const receiveMessage = (callback: ReceiveMessageCallback) => window.external.receiveMessage(callback);

export const sendMessage = <T>(message: T) =>
  window.external.sendMessage(typeof message === "string" ? message : JSON.stringify(message));
