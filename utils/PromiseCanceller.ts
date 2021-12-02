export default class PromiseCanceller<T> {
  private promise: Promise<T>;

  private callbacks: ((arg: T) => void)[];

  constructor(promise: Promise<T>, ...callbacks: ((arg: T) => void)[]) {
    this.promise = promise;
    this.callbacks = callbacks;
    this.promise.then(this.callbackWrapper.bind(this));
  }

  callbackWrapper(arg: T) {
    this.callbacks.forEach((callback) => callback(arg));
  }

  addCallback(callback: (arg: T) => void) {
    this.callbacks.push(callback);
  }

  cancel() {
    this.callbacks = [];
  }
}
