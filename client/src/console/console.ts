export class Console {
  /**Sends a error to the console log of the server*/
  static errror(message: string, ...optionalParams: any[]): void {
    console.error(message, ...optionalParams);
  }

  /**Sends a error to the console log of the server*/
  static info(message: string, ...optionalParams: any[]): void {
    console.info(message, ...optionalParams);
  }

  /**Sends a error to the console log of the server*/
  static log(message: string, ...optionalParams: any): void {
    console.log(message, ...optionalParams);
  }

  /**Sends a error to the console log of the server*/
  static warn(message: string, ...optionalParams: any[]): void {
    console.warn(message, ...optionalParams);
  }
}
