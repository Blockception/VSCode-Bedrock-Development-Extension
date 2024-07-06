import { RemoteConsole } from "vscode-languageserver";

export type ILogger = Pick<RemoteConsole, "error" | "warn" | "info" | "log" | "debug">;
export type IExtendedLogger = Pick<ExtendedLogger, keyof ILogger>;

export class ExtendedLogger implements IExtendedLogger {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  private render(base: string, ...messages: any[]): string {
    messages = messages.map((m) => (typeof m === "object" ? JSON.stringify(m, undefined, 2) : `${m}`));

    return `${base} ${messages.join(" ")}`;
  }

  /**
   * Logs an error message, with optional additional information
   * @param message The message to log
   * @param additionals Additional information to log
   */
  error(message: string, ...additionals: any[]): void {
    this.logger.error(this.render(message, ...additionals));
  }

  /**
   * Logs a warning message, with optional additional information
   * @param message The message to log
   * @param additionals Additional information to log
   */
  warn(message: string, ...additionals: any[]): void {
    this.logger.warn(this.render(message, ...additionals));
  }

  /**
   * Logs an informational message, with optional additional information
   * @param message The message to log
   * @param additionals Additional information to log
   */
  info(message: string, ...additionals: any[]): void {
    this.logger.info(this.render(message, ...additionals));
  }

  /**
   * Logs a message, with optional additional information
   * @param message The message to log
   * @param additionals Additional information to log
   */
  log(message: string, ...additionals: any[]): void {
    this.logger.log(this.render(message, ...additionals));
  }

  /**
   * Logs a debug message, with optional additional information
   * @param message The message to log
   * @param additionals Additional information to log
   */
  debug(message: string, ...additionals: any[]): void {
    this.logger.debug(this.render(message, ...additionals));
  }
}
