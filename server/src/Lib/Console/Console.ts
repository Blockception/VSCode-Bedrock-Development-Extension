import { Manager } from "../Manager/Manager";

export class Console {
  /**Sends a error to the console log of the server*/
  static Error(message: string): void {
    Manager.Connection.console.error(message);
  }

  /**Sends a error to the console log of the server*/
  static Info(message: string): void {
    Manager.Connection.console.info(message);
  }

  /**Sends a error to the console log of the server*/
  static Log(message: string): void {
    Manager.Connection.console.log(message);
  }

  /**Sends a error to the console log of the server*/
  static Warn(message: string): void {
    Manager.Connection.console.warn(message);
  }
}
