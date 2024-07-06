import { expect } from 'chai';
import { onCompletionRequestAsync, onCompletionResolveRequestAsync } from './OnRequest';

describe("Completion", () => {
  describe("Request", () => {
    it("Sanity", () => {
      expect(onCompletionRequestAsync).to.not.be.undefined;
      expect(onCompletionResolveRequestAsync).to.not.be.undefined;
    });
  });
});
