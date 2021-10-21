import { expect } from 'chai';
import { OnCompletionRequestAsync, OnCompletionResolveRequestAsync } from './OnRequest';

describe("Completion", () => {
  describe("Request", () => {
    it("Sanity", () => {
      expect(OnCompletionRequestAsync).to.not.be.undefined;
      expect(OnCompletionResolveRequestAsync).to.not.be.undefined;
    });
  });
});
