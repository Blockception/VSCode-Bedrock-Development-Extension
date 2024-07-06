import { BulkRegistration, InitializeParams, InitializeResult } from "vscode-languageserver";

/**
 * Represents a service that can be registered and initialized
 */
export interface IService {
  /**
   * The name of the service
   */
  readonly name: string;

  /**
   * Disposes the service
   */
  dispose(): void;

  /**
   * Registers the service dynamically, the service should add tp the register
   * @param register The register to add the service to
   */
  dynamicRegister(register: BulkRegistration): void;

  /**
   * Initializes the service, the service should add to the receiver
   * @param params The initialization parameters
   * @param receiver The receiver to add the service to
   */
  onInitialize(params: InitializeParams, receiver: InitializeResult): void;

  /**
   * Starts the service, called after initialization
   */
  start(): void;
}
