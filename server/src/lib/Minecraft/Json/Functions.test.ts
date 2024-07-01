import { expect } from "chai";
import { GetCurrentElement } from "./Functions";

describe("Json Functions", () => {
  it("GetCurrentElement", () => {
    const data = `{"foo":"/example foo"}`;

    const range = GetCurrentElement(data, 15);
    expect(range).to.not.be.undefined;

    if (!range) return;

		const text = data.slice(range.start, range.end);
		expect(text).to.equal("/example foo");
  });
});
