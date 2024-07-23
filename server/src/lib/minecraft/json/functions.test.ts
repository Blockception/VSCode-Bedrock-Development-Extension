import { getCurrentElement } from "./functions";

describe("Json Functions", () => {
  test("GetCurrentElement", () => {
    const data = `{"foo":"/example foo"}`;

    const range = getCurrentElement(data, 15);
    expect(range).toBeUndefined;

    if (!range) return;

		const text = data.slice(range.start, range.end);
		expect(text).toEqual("/example foo");
  });
});
