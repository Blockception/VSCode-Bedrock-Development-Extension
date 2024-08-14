import { DataCache } from './data-cache';

interface TestData {
  id: string,
}

const data = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
]


describe("data-cache", () => {
  jest.setTimeout(10_000);

  const defaultTimespan = DataCache.timespan(0, 5, 0);

  test("when set within 5 seconds, should be able to get, after 5 seconds its gone", async () => {
    const cache = new DataCache<string, TestData>(defaultTimespan);

    data.forEach((i) => cache.set(i.id, i));

    data.forEach((i) => {
      const result = cache.get(i.id);

      expect(result).toEqual(i);
    })

    await new Promise((resolve) => setTimeout(resolve, 6000));

    data.forEach((i) => {
      const result = cache.get(i.id);

      expect(result).toEqual(undefined);
    })
  })

  test("when getOrSet within 5 seconds, should be able to get, after 5 seconds its gone", async () => {
    const cache = new DataCache<string, TestData>(defaultTimespan);

    data.forEach((i) => {
      const result = cache.getOrAdd(i.id, (key) => i);
      expect(result).toEqual(i);

      const secondResult = cache.getOrAdd(i.id, (i) => {
        throw new Error("this shouldn't be called");
      });
      expect(secondResult).toEqual(i);
    })

    await new Promise((resolve) => setTimeout(resolve, 6000));

    let count = 0;
    data.forEach((i) => {
      const result = cache.getOrAdd(i.id, (key) => {
        count++;
        return i;
      });
      expect(result).toEqual(i);
    });

    expect(count).toEqual(data.length);
  })
})