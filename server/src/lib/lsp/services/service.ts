import { BulkRegistration, Connection, InitializeParams, InitializeResult } from "vscode-languageserver";
import { CapabilityBuilder } from "./capabilities";

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
   * @param capabilities The capabilities the server can do
   * @param params The initialization parameters
   * @param connection The lsp connection
   */
  onInitialize(capabilities: CapabilityBuilder, params: InitializeParams): void;

  /**
   * Setup function handlers
   * @param connection The connection to set it to
   */
  setupHandlers(connection: Connection): void;

  /**
   * Starts the service, called after initialization
   */
  start(): void | Promise<void>;

  /**
   * Stios the service, called on Exit
   */
  stop(): void;
}
