import { Disposable } from "vscode-languageserver";
import { IService } from "./service";
import { IExtendedLogger } from "../logger/logger";
import { ExtensionContext } from "../extension/context";

/**
 * The class that holds the base information most service will use
 */
export class BaseService implements Partial<IService> {
  public disposables: Disposable[];
  public logger: IExtendedLogger;
  public extension: ExtensionContext;

  /**
   * Creates a new instance of the BaseService class
   * @param logger The logger provided
   */
  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    this.logger = logger;
    this.extension = extension;
    this.disposables = [];
  }

  /** @inheritdoc */
  dispose(): void {
    return this.disposables.forEach((d) => d.dispose());
  }

  /**
   * Adds the given objects as disposables and registers them to be disposed.
   * @param toDispose The object or subscription to dispose on server close
   */
  addDisposable(...toDispose: Disposable[]): void {
    this.disposables.push(...toDispose);
  }
}
