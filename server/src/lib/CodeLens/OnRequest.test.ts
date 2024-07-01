import { expect } from 'chai';
import { OnCodeLensRequestAsync, OnCodeLensRequest, OnCodeLensResolveRequestAsync, OnCodeLensResolveRequest } from './OnRequest';

describe("CodeLens", () => {
  describe("Request", () => {
    it("Sanity", () => {
      expect(OnCodeLensRequestAsync).to.not.be.undefined;
      expect(OnCodeLensRequest).to.not.be.undefined;
      expect(OnCodeLensResolveRequestAsync).to.not.be.undefined;
      expect(OnCodeLensResolveRequest).to.not.be.undefined;
    });
  });
});
