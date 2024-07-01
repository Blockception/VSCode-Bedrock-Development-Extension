import { expect } from "chai";
import { Glob } from "./Glob";

describe("Glob", () => {
  it("Ensure Item", () => {
    let source = Glob.EnsureSource("f:/Projects/Org B/Project-Foo");
    expect(source).to.equal("f:/Projects/Org B/Project-Foo");

    source = Glob.EnsureSource("file:///f%3A/Projects/Org%20B/Project-Foo/");
    expect(source).to.equal("f:/Projects/Org B/Project-Foo/");

    source = Glob.EnsureSource("file:\\\\f%3A\\Projects\\Org%20B\\Project-Foo\\");
    expect(source).to.equal("f:/Projects/Org B/Project-Foo/");
  });

  it("Ensure Array", () => {
    let source = Glob.EnsureSources(["f:/Projects/Org B/Project-Foo", "file:///f%3A/Projects/Org%20B/Project-Foo/", "file:\\\\f%3A\\Projects\\Org%20B\\Project-Foo\\"]);

    expect(source[0]).to.equal("f:/Projects/Org B/Project-Foo");
    expect(source[1]).to.equal("f:/Projects/Org B/Project-Foo/");
    expect(source[2]).to.equal("f:/Projects/Org B/Project-Foo/");
  });
});
