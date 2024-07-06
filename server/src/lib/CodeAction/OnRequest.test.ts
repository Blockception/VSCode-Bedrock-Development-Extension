import { expect } from 'chai';
import { OnCodeAction, OnCodeActionAsync, OnCodeActionResolveAsync } from './OnRequest';

describe("CodeAction", () => {
  describe("Request", () => {
    it("Sanity", () => {
      expect(OnCodeActionAsync).to.not.be.undefined;
      expect(OnCodeActionResolveAsync).to.not.be.undefined;
      expect(OnCodeAction).to.not.be.undefined;
    });
  });
});
