import { getCurrentElement, getCurrentString, getCurrentStringValue } from "./functions";

describe("Json Functions", () => {
  test("GetCurrentElement", () => {
    const data = `{"foo":"/example foo"}`;

    for (let i = 8; i < 21; i++) {
      const range = getCurrentElement(data, i);
      expect(range).toBeUndefined;

      if (!range) return;

      const text = data.slice(range.start, range.end);
      expect(text).toEqual("/example foo");
    }
  });

  test("getCurrentString", () => {
    const data = `{"foo":"/example foo"}`;

    for (let i = 8; i < 21; i++) {
      const range = getCurrentString(data, i);
      expect(range).toBeUndefined;

      if (!range) return;

      const text = data.slice(range.start, range.end);
      expect(text).toEqual("/example foo");
    }
  });

  test("getCurrentStringValue", () => {
    const data = `{"foo":"/example foo"}`;

    for (let i = 8; i < 21; i++) {
      const range = getCurrentStringValue(data, "foo", i);
      expect(range).toBeUndefined;

      if (!range) return;

      const text = data.slice(range.start, range.end);
      expect(text).toEqual("/example foo");
    }
  });
});
