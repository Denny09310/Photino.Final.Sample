import PhotinoPayload from "./photino-payload";

type PromiseResolveCallback<T> = (value: T) => void;
type PromiseRejectCallback = (reason?: unknown) => void;

class PhotinoChannel<T> {
  private promise: Promise<T> | undefined;
  private promiseResolve: PromiseResolveCallback<T> | undefined;
  private promiseReject: PromiseRejectCallback | undefined;

  private key: string;

  constructor(key: string) {
    this.key = key;

    window.external.receiveMessage((message) => {
      const { faulted, payload } = PhotinoPayload.tryFromJson<T>(message);

      if (!payload || payload.key !== key) return;
      if (!this.promise || !this.promiseResolve || !this.promiseReject) return;

      if (faulted) this.promiseReject(payload.data);
      else this.promiseResolve(payload.data);
    });
  }

  sendMessage = async (message: T) => {
    const payload = new PhotinoPayload<T>(this.key, message);

    window.external.sendMessage(PhotinoPayload.toJson(payload));

    this.promise = new Promise((resolve, reject) => {
      this.promiseResolve = resolve;
      this.promiseReject = reject;
    });

    return this.promise;
  };

  receiveMessage = (message: T) => {
    this.promiseResolve && this.promiseResolve(message);
  };
}

export default PhotinoChannel;
