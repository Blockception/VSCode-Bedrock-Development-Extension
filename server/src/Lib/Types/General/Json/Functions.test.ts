import { expect } from "chai";
import { IsJson } from "./Functions";

describe("Json", () => {
  it("IsJson", () => {
    expect(IsJson('{"rawtext":[{"text":"example"}]}')).be.true;

    expect(IsJson('{"rawtext":[{"text":"example}]')).be.false;
  });
});
