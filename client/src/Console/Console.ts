export class Console {
  /**Sends a error to the console log of the server*/
  static Error(message: string): void {
    console.error(message);
  }

  /**Sends a error to the console log of the server*/
  static Info(message: string): void {
    console.info(message);
  }

  /**Sends a error to the console log of the server*/
  static Log(message: string): void {
    console.log(message);
  }

  /**Sends a error to the console log of the server*/
  static Warn(message: string): void {
    console.warn(message);
  }
}
