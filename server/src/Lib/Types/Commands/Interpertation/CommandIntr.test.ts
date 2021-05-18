import { expect } from "chai";
import { CommandIntr } from "./CommandIntr";

describe("CommandIntr", () => {
  it("parse 1", () => {
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

    expect(comm.GetCommandData().length).be.greaterThanOrEqual(0);
  });

  it("parse 2", () => {
    const comm = CommandIntr.parse("execute @s ~~~ tp @a @s", { character: 0, line: 0 }, "");

    expect(comm.Parameters.length).to.equal(8);
  });

  it("parse 3", () => {
    const comm = CommandIntr.parse("execute @s ^^^ tp @a @s", { character: 0, line: 0 }, "");

    expect(comm.Parameters.length).to.equal(8);
  });

  it("parse 4", () => {
    const comm = CommandIntr.parse("fakecommand fakeparameter @s a", { character: 0, line: 0 }, "");

    expect(comm.Parameters.length).to.equal(4);

    expect(comm.GetCommandData().length).to.equal(0);
  });
});
