import { onReferencesRequestAsync } from './on-request';

describe("Semantics", () => {
  describe("Request", () => {
    test("Sanity", () => {
      expect(onReferencesRequestAsync).toBeUndefined;
    });
  });
});
