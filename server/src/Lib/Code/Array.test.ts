import { expect } from "chai";
import { DupeCheckAdd, removeDuplicate } from "./Array";

interface testobject {
  name: string;
  mark: boolean;
}

describe("Array Functions", () => {
  it("removeDuplicate string", () => {
    var Items = ["string 1", "string 2", "string 3", "string 2"];

    Items = removeDuplicate<string>(Items);

    expect(Items.length).to.equal(3);
  });

  it("removeDuplicate number", () => {
    var Items: number[] = [0, 1, 2, 1];

    Items = removeDuplicate<number>(Items);

    expect(Items.length).to.equal(3);
  });

  it("removeDuplicate boolean", () => {
    var Items: boolean[] = [false, true, false];

    Items = removeDuplicate<boolean>(Items);

    expect(Items.length).to.equal(2);
  });

  it("removeDuplicate object", () => {
    var Items: testobject[] = [
      { name: "string 1", mark: true },
      { name: "string 1", mark: false },
      { name: "string 2", mark: true },
      { name: "string 2", mark: true },
    ];

    Items = removeDuplicate<testobject>(Items);

    expect(Items.length).to.equal(3);
  });

  it("DupeCheckAdd string", () => {
    var Items: string[] = [];
    DupeCheckAdd(Items, "string 1");
    DupeCheckAdd(Items, "string 2");
    DupeCheckAdd(Items, "string 3");
    DupeCheckAdd(Items, "string 2");

    expect(Items.length).to.equal(3);
  });

  it("DupeCheckAdd number", () => {
    var Items: number[] = [];

    DupeCheckAdd(Items, 0);
    DupeCheckAdd(Items, 1);
    DupeCheckAdd(Items, 2);
    DupeCheckAdd(Items, 1);

    expect(Items.length).to.equal(3);
  });

  it("DupeCheckAdd boolean", () => {
    var Items: boolean[] = [];

    DupeCheckAdd(Items, false);
    DupeCheckAdd(Items, true);
    DupeCheckAdd(Items, false);

    expect(Items.length).to.equal(2);
  });

  it("DupeCheckAdd object", () => {
    var Items: testobject[] = [];

    DupeCheckAdd(Items, { name: "string 1", mark: true });
    DupeCheckAdd(Items, { name: "string 1", mark: false });
    DupeCheckAdd(Items, { name: "string 2", mark: true });
    DupeCheckAdd(Items, { name: "string 2", mark: true });

    expect(Items.length).to.equal(3);
  });
});
