import { Manager } from "./Manager";

/** */
export namespace Console {
  /** */
  export function Error(message: string): void {
    Manager.Connection.console.error(message);
  }

  /** */
  export function Info(message: string): void {
    Manager.Connection.console.info(message);
  }

  /** */
  export function Log(message: string): void {
    Manager.Connection.console.log(message);
  }

  /** */
  export function Debug(message: string): void {
    Manager.Connection.console.debug(message);
  }

  type executorFn<T> = (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;

  export function request<T>(request: string, executor: executorFn<T>): Promise<T>;
  export function request<T>(request: string, promise: Promise<T>): Promise<T>;

  /**
   *
   * @param request
   * @param executor
   * @returns
   */
  export function request<T>(request: string, executor: executorFn<T> | Promise<T>): Promise<T> {
    Console.Info("Starting: " + request);

    if (executor instanceof Promise) {
    } else if (typeof executor === "function") {
      executor = new Promise(executor);
    }

    executor
      .then(() => Console.Info("Completed: " + request))
      .catch((err) => Console.Error(`${JSON.stringify(request)} ${JSON.stringify(err)}`));

    return executor;
  }
}
