import { expect } from 'chai';
import { OnReferencesRequestAsync } from './OnRequest';

describe("Semantics", () => {
  describe("Request", () => {
    it("Sanity", () => {
      expect(OnReferencesRequestAsync).to.not.be.undefined;
    });
  });
});
