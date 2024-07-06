import { expect } from 'chai';
import { OnCodeLensRequest } from './OnRequest';

describe("CodeLens", () => {
  describe("Request", () => {
    it("Sanity", () => {
      expect(OnCodeLensRequest).to.not.be.undefined;
    });
  });
});
