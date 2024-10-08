import { RemoteConsole } from "vscode-languageserver";
import { getFilename } from "../../util";

export type ILogger = Pick<RemoteConsole, "error" | "warn" | "info" | "log" | "debug">;
export type IExtendedLogger = Pick<ExtendedLogger, keyof ILogger | "with" | "withPrefix" | "recordError">;

export class ExtendedLogger implements IExtendedLogger {
  private logger: ILogger;
  private prefix: string;
  private additionals: any[];

  constructor(logger: ILogger, prefix: string = "", additionals: any[] = []) {
    this.logger = logger;
    this.prefix = prefix;
    this.additionals = additionals;
  }

  private render(base: string, ...messages: any[]): string {
    messages = [...messages, ...this.additionals].map((m) =>
      typeof m === "object" ? JSON.stringify(m, undefined, 2) : `${m}`
    );

    return `${this.prefix} ${base} ${messages.join(" ")}`.trim();
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

  /**
   * Adds a prefix to all the logging
   * @param prefix The prefix to add
   * @returns A new logger
   */
  withPrefix(prefix: string): IExtendedLogger {
    return new ExtendedLogger(this.logger, this.prefix + prefix, this.additionals);
  }

  /**
   * Adds the given additionals to the logger
   * @param additionals The additional objects to add
   * @returns Returns a new logger
   */
  with(...additionals: any): IExtendedLogger {
    return new ExtendedLogger(this.logger, this.prefix, [...this.additionals, ...additionals]);
  }

  recordError(err: any, doc?: { uri: string } | string): void {
    let msg: string;

    if (errormsg.is(err)) {
      msg = `message: ${err.message}\n\tstack:${err.stack}`;
    } else {
      msg = JSON.stringify(err);
    }

    if (doc) {
      msg = getFilename(typeof doc === "object" ? doc.uri : doc) + " | " + msg;
    }

    this.error(msg);
  }
}

interface errormsg {
  message: string;
  stack: string;
}

namespace errormsg {
  export function is(value: any): value is errormsg {
    if (typeof value === "object") {
      if (typeof value.message === "string" && typeof value.stack === "string") return true;
    }

    return false;
  }
}
