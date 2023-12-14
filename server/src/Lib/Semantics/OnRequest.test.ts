import { expect } from 'chai';
import { OnprovideRangeSemanticRequestAsync, OnprovideSemanticRequestAsync } from './OnRequest';

describe("Semantics", () => {
  describe("Request", () => {
    it("Sanity", () => {
      expect(OnprovideRangeSemanticRequestAsync).to.not.be.undefined;
      expect(OnprovideSemanticRequestAsync).to.not.be.undefined;
    });
  });
});
