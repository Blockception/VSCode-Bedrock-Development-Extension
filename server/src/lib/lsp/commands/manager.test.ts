import { CommandManager } from './manager';


describe("command manager", () => {
  it("should be able to load all the tests", async() => {
    const manager = CommandManager.load();

    for (const [key, value] of manager.commands()) {
      expect(key).toBeDefined();
      expect(value).toBeDefined();
    }
  })
})