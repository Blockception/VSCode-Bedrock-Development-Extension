import { Glob } from "./glob";

describe("Glob", () => {
  test("Ensure Item", () => {
    let source = Glob.EnsureSource("f:/Projects/Org B/Project-Foo");
    expect(source).toEqual("f:/Projects/Org B/Project-Foo");

    source = Glob.EnsureSource("file:///f%3A/Projects/Org%20B/Project-Foo/");
    expect(source).toEqual("f:/Projects/Org B/Project-Foo/");

    source = Glob.EnsureSource("file:\\\\f%3A\\Projects\\Org%20B\\Project-Foo\\");
    expect(source).toEqual("f:/Projects/Org B/Project-Foo/");
  });

  test("Ensure Array", () => {
    let source = Glob.EnsureSources(["f:/Projects/Org B/Project-Foo", "file:///f%3A/Projects/Org%20B/Project-Foo/", "file:\\\\f%3A\\Projects\\Org%20B\\Project-Foo\\"]);

    expect(source[0]).toEqual("f:/Projects/Org B/Project-Foo");
    expect(source[1]).toEqual("f:/Projects/Org B/Project-Foo/");
    expect(source[2]).toEqual("f:/Projects/Org B/Project-Foo/");
  });
});
