import { IExtensionContext } from "../extension/context";

export type Context<T> = T & IExtensionContext;

export namespace Context {
  export function create<T>(base: IExtensionContext, additional: T, overrides?: Partial<Context<T>>): Context<T> {
    overrides = overrides || {};

    return {
      capabilities: base.capabilities,
      connection: base.connection,
      database: base.database,
      documents: base.documents,
      logger: base.logger,
      state: base.state,

      ...additional,
      ...overrides,
    };
  }
}
