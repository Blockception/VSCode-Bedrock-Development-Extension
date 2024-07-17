import { Languages, ToolIdentification } from "@blockception/shared";

describe("Constants", () => {
  it("values", () => {
    expect(Languages.McFunctionIdentifier).toEqual(Languages.McFunctionIdentifier.toLowerCase());
  });

  it("Tool Identification", () => {
    expect(ToolIdentification.length).toBeLessThanOrEqual(32);
  });
});
