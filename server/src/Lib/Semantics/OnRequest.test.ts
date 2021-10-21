import { expect } from 'chai';
import { OnProvideRangeSemanticRequestAsync, OnProvideSemanticRequestAsync } from './OnRequest';

describe("Semantics", () => {
  describe("Request", () => {
    it("Sanity", () => {
      expect(OnProvideRangeSemanticRequestAsync).to.not.be.undefined;
      expect(OnProvideSemanticRequestAsync).to.not.be.undefined;
    });
  });
});
