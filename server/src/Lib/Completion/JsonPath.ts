import { SimpleContext } from "../Code";
import { getJsonPath } from "../Minecraft/Json/Path";
import { CompletionBuilder } from "./Builder";

type JsonPathMatchFn = (path: string) => boolean;

export interface JsonPathMatch {
  /**
   * Either a string that matches the postfix, a regular expression that matches the path, or a function that returns true if the path matches
   */
  match: string | RegExp | JsonPathMatchFn;
  onCompletion: (context: SimpleContext<CompletionBuilder>) => void;
}

export class JsonPathCompletion {
  private readonly _items: JsonPathMatch[];

  constructor(...items: JsonPathMatch[]) {
    this._items = items;
  }

  onCompletion(context: SimpleContext<CompletionBuilder>) {
    const { isProperty, path } = getJsonPath(context.cursor, context.doc);
    if (!isProperty) {
      return;
    }

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
