import { expect } from "chai";
import { GetFilepath, UniformUrl } from "./Url";

describe("Url", () => {
  it("UniformUrl", () => {
    expect(UniformUrl("f:/temp folder/something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
    expect(UniformUrl("f:\\temp folder\\something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
    expect(UniformUrl("file:\\f:\\temp folder\\something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
    expect(UniformUrl("file:/f:/temp folder/something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
    expect(UniformUrl("file://f:/temp folder/something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
    expect(UniformUrl("/f:/temp folder/something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
    expect(UniformUrl("\\f:\\temp folder\\something.json")).to.equal("file:///f%3A/temp%20folder/something.json");
  });

  it("Uri To Filepath", () => {
    expect(GetFilepath("file:///f%3A/temp%20folder/something.json")).to.equal("f:/temp folder/something.json");
  });

  it("Uri To Filepath2", () => {
    expect(GetFilepath("///f%3A/temp%20folder/something.json")).to.equal("f:/temp folder/something.json");
  });
});
