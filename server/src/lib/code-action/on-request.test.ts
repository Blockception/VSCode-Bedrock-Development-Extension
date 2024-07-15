import { expect } from 'chai';
import { OnCodeAction, onCodeActionAsync, OnCodeActionResolveAsync } from './on-request';

describe("CodeAction", () => {
  describe("Request", () => {
    it("Sanity", () => {
      expect(onCodeActionAsync).to.not.be.undefined;
      expect(OnCodeActionResolveAsync).to.not.be.undefined;
      expect(OnCodeAction).to.not.be.undefined;
    });
  });
});
