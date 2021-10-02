import { expect } from "chai";
import { ProvideHoverAt } from "./Hover";

describe("Molang", () => {
  describe("Hover", () => {
    it("ProvideHoverAt1", () => {
      const out = ProvideHoverAt("query.is_baby", { start: 5, end: 18 }, 2 + 5, undefined);
      expect(out, "query.is_baby").to.not.be.undefined;
    });

    it("ProvideHoverAt2", () => {
      const out = ProvideHoverAt("query.is_baby", { start: 5, end: 18 }, 10 + 5, undefined);
      expect(out, "query.is_baby").to.not.be.undefined;
    });

    it("ProvideHoverAt3", () => {
      const out = ProvideHoverAt("!query.is_baby", { start: 5, end: 18 }, 2 + 5, undefined);
      expect(out, "query.is_baby").to.not.be.undefined;
    });

    it("ProvideHoverAt4", () => {
      const out = ProvideHoverAt("!query.is_baby", { start: 5, end: 18 }, 10 + 5, undefined);
      expect(out, "query.is_baby").to.not.be.undefined;
    });

    it("ProvideHoverAt5", () => {
      const out = ProvideHoverAt("query.is_baby && query.is_baby", { start: 5, end: 18 }, 20 + 5, undefined);
      expect(out, "query.is_baby").to.not.be.undefined;
    });

    it("ProvideHoverAt6", () => {
      const out = ProvideHoverAt("query.is_baby && !query.is_baby", { start: 5, end: 18 }, 26 + 5, undefined);
      expect(out, "query.is_baby").to.not.be.undefined;
    });
  });
});
