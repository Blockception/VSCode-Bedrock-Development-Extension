import { TextDocumentFactory } from "../../documents/factory";
import { ExtendedLogger } from '../../logger/logger';
import { provideHoverAt } from "./molang";

describe("Molang", () => {
  const factory = new TextDocumentFactory(new ExtendedLogger(console), null as any);
  const context = {
    document: factory.create("some", "json", 0, "query.is_baby"),
  };

  test("Hover At", () => {
    expect(provideHoverAt(context, "query.is_baby", { start: 5, end: 18 }, 10 + 5)).toBeDefined();
    expect(provideHoverAt(context, "!query.is_baby", { start: 5, end: 18 }, 2 + 5)).toBeDefined();
    expect(provideHoverAt(context, "!query.is_baby", { start: 5, end: 18 }, 10 + 5)).toBeDefined();
    expect(provideHoverAt(context, "query.is_baby && query.is_baby", { start: 5, end: 18 }, 20 + 5)).toBeDefined();
    expect(provideHoverAt(context, "query.is_baby && !query.is_baby", { start: 5, end: 18 }, 26 + 5)).toBeDefined();
  });
});
