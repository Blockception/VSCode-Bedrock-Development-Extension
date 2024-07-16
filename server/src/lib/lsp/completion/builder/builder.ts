import { Documentated, Identifiable } from "bc-minecraft-bedrock-types/lib/src/types";
import { CancellationToken, WorkDoneProgressReporter } from "vscode-languageserver";
import { CompletionItem, CompletionItemKind } from "vscode-languageserver-types";

export type GenerateFunction<T> = (item: T) => string;

export interface IForEach<T> {
  forEach(callbackfn: (value: T) => void, thisArg?: any): void;
}

export function createBuilder(token: CancellationToken, workDoneProgress: WorkDoneProgressReporter): CompletionBuilder {
  return new WrappedBuilder(new BaseBuilder(token, workDoneProgress));
}

export interface CompletionBuilder {
  /**
   * Adds a new completion item
   * @param item The item to add, will be sanitized
   * @returns The added and sanitized item
   */
  add(item: CompletionItem): CompletionItem;

  /**
   * Check if the request has been cancelled
   * @returns True if the builder is done
   * @returns False if the builder is not done
   */
  isCancelled(): boolean;

  /**
   * Returns all the items
   */
  getItems(): CompletionItem[];

  /**
   * Generate a completion item from the dataset / collection
   * @param dataset The dataset to generate from
   * @param generatefn The function to generate the documentation
   * @param kind The kind of completion item
   * @param query The query to filter the dataset
   */
  generate<T extends Identifiable | string>(
    dataset: IForEach<T> | undefined,
    generatefn: GenerateFunction<T>
  ): CompletionItem[];
  generate<T extends Identifiable | string>(
    dataset: IForEach<T> | undefined,
    generatefn: GenerateFunction<T>,
    kind: CompletionItemKind
  ): CompletionItem[];
  generate<T extends Identifiable | string>(
    dataset: IForEach<T> | undefined,
    generatefn: GenerateFunction<T>,
    kind: CompletionItemKind | undefined,
    query: string | undefined
  ): CompletionItem[];

  /**
   * Returns a new builder with the events added
   * @param before The event to run before adding the item and sanitizing it
   * @param after The event to run after adding the item and sanitizing it
   */
  withEvents(before?: (item: CompletionItem) => void, after?: (item: CompletionItem) => void): CompletionBuilder;

  /**
   * Returns a new builder with the default values added
   * @param base The default values to add
   */
  withDefaults(base: Partial<CompletionItem>): CompletionBuilder;
}

type BaseCompletionBuilder = Pick<CompletionBuilder, "add" | "isCancelled" | "getItems">;

export class BaseBuilder implements BaseCompletionBuilder {
  private _items: CompletionItem[];
  private _token: CancellationToken;
  private _workDoneProgress: WorkDoneProgressReporter;

  constructor(token: CancellationToken, workDoneProgress: WorkDoneProgressReporter, items?: CompletionItem[]) {
    this._token = token;
    this._workDoneProgress = workDoneProgress;
    this._items = items ?? [];
  }

  /** @inheritdoc */
  add(item: CompletionItem): CompletionItem {
    if (item.documentation) {
      if (typeof item.documentation === "string") {
        item.documentation = { kind: "markdown", value: item.documentation };
      }
    }

    if (item.kind === undefined) {
      item.kind = CompletionItemKind.Keyword;
    }

    this._items.push(item);
    return item;
  }

  /** @inheritdoc */
  isCancelled(): boolean {
    return this._token.isCancellationRequested;
  }

  /** @inheritdoc */
  getItems(): CompletionItem[] {
    return this._items;
  }
}

export class EventedBuilder implements BaseCompletionBuilder {
  private _builder: BaseCompletionBuilder;
  private _before: (item: CompletionItem) => void;
  private _after: (item: CompletionItem) => void;

  constructor(
    builder: BaseCompletionBuilder,
    before: (item: CompletionItem) => void,
    after: (item: CompletionItem) => void
  ) {
    this._builder = builder;
    this._before = before;
    this._after = after;
  }

  /** @inheritdoc */
  add(item: CompletionItem): CompletionItem {
    this._before(item);
    const out = this._builder.add(item);
    this._after(out);
    return out;
  }

  /** @inheritdoc */
  isCancelled(): boolean {
    return this._builder.isCancelled();
  }

  /** @inheritdoc */
  getItems(): CompletionItem[] {
    return this._builder.getItems();
  }
}

export class WrappedBuilder implements CompletionBuilder {
  private builder: BaseCompletionBuilder;

  constructor(builder: BaseCompletionBuilder) {
    this.builder = builder;
  }

  /** @inheritdoc */
  add(item: CompletionItem): CompletionItem {
    return this.builder.add(item);
  }
  /** @inheritdoc */
  isCancelled(): boolean {
    return this.builder.isCancelled();
  }
  /** @inheritdoc */
  getItems(): CompletionItem[] {
    return this.builder.getItems();
  }

  generateItem<T extends Identifiable & Documentated>(
    item: T,
    generatefn: (item: T) => string,
    kind: CompletionItemKind = CompletionItemKind.Keyword
  ): CompletionItem {
    const citem = {
      label: item.id,
      documentation: item.documentation ?? generatefn(item),
      kind: kind,
    };

    return this.builder.add(citem);
  }

  /** @inheritdoc */
  generate<T extends Identifiable>(
    dataset: IForEach<T | string> | undefined,
    generatefn: (item: T) => string,
    kind: CompletionItemKind = CompletionItemKind.Keyword,
    query: string | undefined = undefined
  ): CompletionItem[] {
    const out: CompletionItem[] = [];
    if (dataset === undefined) return out;

    const filterFn = this.createFilter(query);
    dataset.forEach((item) => {
      if (this.builder.isCancelled()) return;
      if (filterFn(item) === false) return;

      switch (typeof item) {
        case "string":
          out.push(this.builder.add({ label: item, documentation: item, kind: kind }));
          break;
        default:
          out.push(this.generateItem(item, generatefn, kind));
      }
    });

    return out;
  }

  private createFilter(query: string | undefined): (item: Identifiable | string) => boolean {
    if (query === undefined) return () => true;

    return (item: Identifiable | string) => {
      if (typeof item === "string") return item.includes(query);
      return item.id.includes(query);
    };
  }

  /** @inheritdoc */
  withEvents(before?: (item: CompletionItem) => void, after?: (item: CompletionItem) => void): CompletionBuilder {
    return new WrappedBuilder(new EventedBuilder(this.builder, before ?? noop, after ?? noop));
  }

  /** @inheritdoc */
  withDefaults(base: Partial<CompletionItem>): CompletionBuilder {
    const values = Object.entries(base);

    return new WrappedBuilder(new EventedBuilder(this.builder, (item: any) => {
      values.forEach(([key, value]) => {
        if (item[key] === undefined) item[key] = value;
      })

    }, noop));
  }
}

function noop() {
  return;
}
