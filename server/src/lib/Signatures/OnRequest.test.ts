import { expect } from 'chai';
import { OnSignatureRequestAsync } from './OnRequest';

describe("Signatures", () => {
  describe("Request", () => {
    it("Sanity", () => {
      expect(OnSignatureRequestAsync).to.not.be.undefined;
    });
  });
});
