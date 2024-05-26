import { BulkRegistration, InitializeParams, InitializeResult } from "vscode-languageserver";
import { IService } from "./service";
import { IExtendedLogger } from "../logger/logger";

type NamedService = Pick<IService, "name"> & Partial<IService>;

/**
 * Represents a collection of services
 */
export class ServiceManager implements NamedService {
  /** @inheritdoc */
  readonly name: string = "ServiceManager";

  private logger: IExtendedLogger;
  private services: NamedService[];

  constructor(logger: IExtendedLogger) {
    this.logger = logger;
    this.services = [];
  }

  /**
   * Adds a service to the collection
   * @param service The service to add
   */
  add(...services: NamedService[]): this {
    services.forEach((s) => {
      this.logger.info(`Adding service ${s.name}`);
      this.services.push(s);
    });
    return this;
  }

  /** @inheritdoc */
  dispose(): void {
    this.services.forEach((service) => {
      if (service.dispose) {
        this.logger.info(`Disposing service ${service.name}`);
        service.dispose();
      }
    });
  }

  /** @inheritdoc */
  onInitialize(params: InitializeParams, receiver: InitializeResult): void {
    this.services.forEach((service) => {
      if (service.onInitialize) {
        this.logger.info(`Initializing service ${service.name}`);
        service.onInitialize(params, receiver);
      }
    });
  }

  /** @inheritdoc */
  dynamicRegister(register: BulkRegistration): void {
    this.services.forEach((service) => {
      if (service.dynamicRegister) {
        this.logger.info(`Registering service ${service.name}`);
        service.dynamicRegister(register);
      }
    });
  }

  /** @inheritdoc */
  start(): void {
    this.services.forEach((service) => {
      if (service.start) {
        this.logger.info(`Starting service ${service.name}`);
        service.start();
      }
    });
  }
}
