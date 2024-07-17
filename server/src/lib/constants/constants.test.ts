import { Languages, ToolIdentification } from "@blockception/shared";

describe("Constants", () => {
  test("values", () => {
    expect(Languages.McFunctionIdentifier).toEqual(Languages.McFunctionIdentifier.toLowerCase());
  });

  test("Tool Identification", () => {
    expect(ToolIdentification.length).toBeLessThan(32);
  });
});
