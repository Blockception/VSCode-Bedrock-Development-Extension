import { expect } from 'chai';
import { OnCommandRequestAsync } from './OnRequest';

describe("Commands", () => {
  describe("Request", () => {
    it("Sanity", () => {
      expect(OnCommandRequestAsync).to.not.be.undefined;
    });
  });
});
