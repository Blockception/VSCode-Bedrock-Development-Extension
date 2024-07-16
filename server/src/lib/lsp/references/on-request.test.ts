import { expect } from 'chai';
import { onReferencesRequestAsync } from './on-request';

describe("Semantics", () => {
  describe("Request", () => {
    it("Sanity", () => {
      expect(onReferencesRequestAsync).to.not.be.undefined;
    });
  });
});
