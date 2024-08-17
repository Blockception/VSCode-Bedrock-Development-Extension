import { provideHoverAt } from "./molang";

describe("Molang", () => {
  describe("Hover", () => {
    test("provideHoverAt1", () => {
      const out = provideHoverAt("query.is_baby", { start: 5, end: 18 }, 2 + 5);
      expect(out).toBeUndefined();
    });

    test("provideHoverAt2", () => {
      const out = provideHoverAt("query.is_baby", { start: 5, end: 18 }, 10 + 5);
      expect(out).toBeUndefined();
    });

    test("provideHoverAt3", () => {
      const out = provideHoverAt("!query.is_baby", { start: 5, end: 18 }, 2 + 5);
      expect(out).toBeUndefined();
    });

    test("provideHoverAt4", () => {
      const out = provideHoverAt("!query.is_baby", { start: 5, end: 18 }, 10 + 5);
      expect(out).toBeUndefined();
    });

    test("provideHoverAt5", () => {
      const out = provideHoverAt("query.is_baby && query.is_baby", { start: 5, end: 18 }, 20 + 5);
      expect(out).toBeUndefined();
    });

    test("provideHoverAt6", () => {
      const out = provideHoverAt("query.is_baby && !query.is_baby", { start: 5, end: 18 }, 26 + 5);
      expect(out).toBeUndefined();
    });
  });
});
