export class Console {
  /**Sends a error to the console log of the server*/
  static Error(message: string, ...optionalParams: any[]): void {
    console.error(message, ...optionalParams);
  }

  /**Sends a error to the console log of the server*/
  static Info(message: string, ...optionalParams: any[]): void {
    console.info(message, ...optionalParams);
  }

  /**Sends a error to the console log of the server*/
  static Log(message: string, ...optionalParams: any): void {
    console.log(message, ...optionalParams);
  }

  /**Sends a error to the console log of the server*/
  static Warn(message: string, ...optionalParams: any[]): void {
    console.warn(message, ...optionalParams);
  }
}
