import { expect } from "chai";
import { CommandIntr, GetSubCommand } from "./CommandIntr";

describe("CommandIntr", () => {
  it("parse 1 - simple test", () => {
    const comm = CommandIntr.parse("execute @s[scores={foo=1..}] ~ ~ ~ tp @a[tag=target] @s", { character: 0, line: 0 }, "");

    expect(comm.Parameters.length).to.equal(8);

    expect(comm.Parameters[0].text).to.equal("execute");
    expect(comm.Parameters[1].text).to.equal("@s[scores={foo=1..}]");
    expect(comm.Parameters[2].text).to.equal("~");
    expect(comm.Parameters[3].text).to.equal("~");
    expect(comm.Parameters[4].text).to.equal("~");
    expect(comm.Parameters[5].text).to.equal("tp");
    expect(comm.Parameters[6].text).to.equal("@a[tag=target]");
    expect(comm.Parameters[7].text).to.equal("@s");

    expect(comm.GetCommandData(false).length).be.greaterThanOrEqual(0);
  });

  it("parse 2 - condesed ~ coordiantes", () => {
    const comm = CommandIntr.parse("execute @s ~~~ tp @a @s", { character: 0, line: 0 }, "");

    expect(comm.Parameters.length).to.equal(8);
  });

  it("parse 3 - condesed ^ coordiantes", () => {
    const comm = CommandIntr.parse("execute @s ^^^ tp @a @s", { character: 0, line: 0 }, "");

    expect(comm.Parameters.length).to.equal(8);
  });

  it("parse 4 - unknown command", () => {
    const comm = CommandIntr.parse("fakecommand fakeparameter @s a", { character: 0, line: 0 }, "");

    expect(comm.Parameters.length).to.equal(4);

    expect(comm.GetCommandData(false).length).to.equal(0);
  });

  it("parse 5 - offset", () => {
    const comm = CommandIntr.parse("    execute @s ~~~", { character: 0, line: 0 }, "");

    expect(comm.Parameters.length).to.equal(5);
    expect(comm.Parameters[0].location.range.start.character).to.equal(4);
  });

  it("subcommand 1", () => {
    const comm = CommandIntr.parse("execute @s[scores={foo=1..}] ~ ~ ~ tp @a[tag=target] @s", { character: 0, line: 0 }, "");

    const sub = GetSubCommand(comm, false);

    if (sub) {
      expect(sub.Parameters.length).to.equal(3);

      expect(sub.Parameters[0].text).to.equal("tp");
      expect(sub.Parameters[1].text).to.equal("@a[tag=target]");
      expect(sub.Parameters[2].text).to.equal("@s");
    } else {
      expect.fail("expected a sub command");
    }
  });
});
