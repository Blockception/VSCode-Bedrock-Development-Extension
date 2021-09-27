import { Manager } from "./include";

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
}
