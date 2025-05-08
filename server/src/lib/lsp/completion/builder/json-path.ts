import { getJsonPath } from "../../../minecraft/json/path";
import { Context } from "../../context/context";
import { CompletionContext } from "../context";

type JsonPathMatchFn = (path: string) => boolean;

export interface JsonPathMatch {
  /**
   * Either a string that matches the postfix, a regular expression that matches the path, or a function that returns true if the path matches
   */
  match: string | RegExp | JsonPathMatchFn;
  onCompletion: (context: Context<CompletionContext>) => void;
}

export namespace JsonPathMatch {
  /**
   *
   * @param match
   * @param onCompletion
   * @returns
   */
  export function create(
    match: string | RegExp | JsonPathMatchFn,
    onCompletion: (context: Context<CompletionContext>) => void
  ) {
    return {
      match: match,
      onCompletion: onCompletion,
    };
  }
}

export class JsonPathCompletion {
  private readonly _items: JsonPathMatch[];

  constructor(...items: JsonPathMatch[]) {
    this._items = items;
  }

  /**
   * Performs the onCompletion request, checks all of its item match and performs their events if it matches
   * @param context The context to use and pass on
   */
  onCompletion(context: Context<CompletionContext>): void {
    const { isProperty, path } = getJsonPath(context.cursor, context.document);
    if (!isProperty) {
      return;
    }

    context.logger.debug(`json path completion: '${path}'`);

    this._items.forEach((item) => {
      switch (typeof item.match) {
        case "string":
          if (path.endsWith(item.match)) {
            item.onCompletion(context);
          }
          break;
        case "function":
          if (item.match(path)) {
            item.onCompletion(context);
          }
          break;
        default:
          if (item.match.test(path)) {
            item.onCompletion(context);
          }
          break;
      }
    });
  }
}
