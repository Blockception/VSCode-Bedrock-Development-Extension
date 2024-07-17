import { DupeCheckAdd, removeDuplicate } from "./array";

describe("Array Functions", () => {
  test("removeDuplicate string", () => {
    const items = ["string 1", "string 2", "string 3", "string 2"];
    const pruned = removeDuplicate<string>(items);
    expect(pruned.length).toEqual(3);
  });

  test("removeDuplicate number", () => {
    const items: number[] = [0, 1, 2, 1];

    const pruned = removeDuplicate<number>(items);

    expect(pruned.length).toEqual(3);
  });

  test("removeDuplicate boolean", () => {
    const items: boolean[] = [false, true, false];

    const pruned = removeDuplicate<boolean>(items);

    expect(pruned.length).toEqual(2);
  });

  test("DupeCheckAdd string", () => {
    const items: string[] = [];
    DupeCheckAdd(items, "string 1");
    DupeCheckAdd(items, "string 2");
    DupeCheckAdd(items, "string 3");
    DupeCheckAdd(items, "string 2");

    expect(items.length).toEqual(3);
  });

  test("DupeCheckAdd number", () => {
    const items: number[] = [];

    DupeCheckAdd(items, 0);
    DupeCheckAdd(items, 1);
    DupeCheckAdd(items, 2);
    DupeCheckAdd(items, 1);

    expect(items.length).toEqual(3);
  });

  test("DupeCheckAdd boolean", () => {
    const items: boolean[] = [];

    DupeCheckAdd(items, false);
    DupeCheckAdd(items, true);
    DupeCheckAdd(items, false);

    expect(items.length).toEqual(2);
  });
});
