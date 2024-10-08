import {
  BulkRegistration,
  CancellationToken,
  Connection,
  InitializeParams,
  WorkDoneProgressReporter
} from "vscode-languageserver";
import { IExtendedLogger } from "../logger/logger";
import { CapabilityBuilder } from "./capabilities";
import { IService } from "./service";

type NamedService = Pick<IService, "name"> & Partial<IService>;

/**
 * Represents a collection of services
 */
export class ServiceManager implements NamedService {
  /** @inheritdoc */
  readonly name: string = "ServiceManager";

  private logger: IExtendedLogger;
  public services: NamedService[];

  constructor(logger: IExtendedLogger) {
    this.logger = logger.withPrefix("[service manager]");
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
  onInitialize(
    capabilities: CapabilityBuilder,
    params: InitializeParams,
    token?: CancellationToken,
    workDoneProgress?: WorkDoneProgressReporter
  ): void {
    const max = this.services.length;
    this.services.forEach((service, index) => {
      if (token?.isCancellationRequested) return;

      if (service.onInitialize) {
        workDoneProgress?.report(index / max, service.name);
        this.logger.info(`Initializing service ${service.name}`);
        service.onInitialize(capabilities, params);
      }
    });
  }

  /** @inheritdoc */
  setupHandlers(connection: Connection): void {
    this.services.forEach((service) => {
      if (service.setupHandlers) {
        this.logger.info(`setup handlers ${service.name}`);
        service.setupHandlers(connection);
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
  async start(): Promise<void> {
    for (const service of this.services) {
      if (service.start) {
        this.logger.info(`Starting service ${service.name}`);
        await service.start();
      }
    }
  }

  /** @inheritdoc */
  stop(): void {
    this.services.forEach((service) => {
      if (service.stop) {
        this.logger.info(`Stopping service ${service.name}`);
        service.stop();
      }
    });
  }

  service<T>(constructor: new (...args: any[]) => T): T | undefined {
    for (const s of this.services) {
      if (s instanceof constructor) {
        return s;
      }
    }

    return undefined;
  }
}
