import { Manager } from "./manager";

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

  /**
   *
   * @param request
   * @param todo
   * @returns
   */
  export function request<T>(request: string, todo: () => Promise<T> | T): Promise<T | undefined> {
    Console.Info("Starting: " + request);

    return Promise.resolve(todo())
      .then((result) => {
        Console.Info("Completed: " + request);
        return result;
      })
      .catch((err) => {
        Console.Error(`${JSON.stringify(request)} ${JSON.stringify(err)}`);
        return undefined;
      });
  }
}
