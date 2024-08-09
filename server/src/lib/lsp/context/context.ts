import { IExtensionContext } from "../extension/context";

export type Context<T> = Readonly<T> & IExtensionContext;

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
      settings: base.settings,
      services: base.services,

      ...additional,
      ...overrides,
    };
  }

  export function modify<A, B>(base: Context<A>, overlay: B): Context<A & B> {
    return {
      ...base,
      ...overlay,
    };
  }
}
