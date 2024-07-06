import { expect } from "chai";
import { provideHoverAt } from "./Hover";

describe("Molang", () => {
  describe("Hover", () => {
    it("provideHoverAt1", () => {
      const out = provideHoverAt("query.is_baby", { start: 5, end: 18 }, 2 + 5, undefined);
      expect(out, "query.is_baby").to.not.be.undefined;
    });

    it("provideHoverAt2", () => {
      const out = provideHoverAt("query.is_baby", { start: 5, end: 18 }, 10 + 5, undefined);
      expect(out, "query.is_baby").to.not.be.undefined;
    });

    it("provideHoverAt3", () => {
      const out = provideHoverAt("!query.is_baby", { start: 5, end: 18 }, 2 + 5, undefined);
      expect(out, "query.is_baby").to.not.be.undefined;
    });

    it("provideHoverAt4", () => {
      const out = provideHoverAt("!query.is_baby", { start: 5, end: 18 }, 10 + 5, undefined);
      expect(out, "query.is_baby").to.not.be.undefined;
    });

    it("provideHoverAt5", () => {
      const out = provideHoverAt("query.is_baby && query.is_baby", { start: 5, end: 18 }, 20 + 5, undefined);
      expect(out, "query.is_baby").to.not.be.undefined;
    });

    it("provideHoverAt6", () => {
      const out = provideHoverAt("query.is_baby && !query.is_baby", { start: 5, end: 18 }, 26 + 5, undefined);
      expect(out, "query.is_baby").to.not.be.undefined;
    });
  });
});
