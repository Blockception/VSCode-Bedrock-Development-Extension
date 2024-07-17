import { OffsetWord } from "bc-vscode-words";
import { Offset } from "./offset";

describe("Offset", () => {
  test("IsWithin", () => {
    const word = new OffsetWord("test", 0);
    expect(word.text).toEqual("test");
    expect(word.offset).toEqual(0);

    const test = (value: number, actual: boolean) => {
      expect(Offset.IsWithin(word, value)).toEqual(actual);
    };

    test(0, true);
    test(1, true);
    test(2, true);
    test(3, true);

    test(4, false);
    test(5, false);
    test(6, false);
    test(7, false);
  });
});
