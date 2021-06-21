import { expect } from "chai";
import { AddCommands } from "../../../Data/Commands/Add Commands";
import { Manager } from "../../../Manager/include";
import { CommandIntr } from "../Interpertation/CommandIntr";
import { isMatch } from "./CommandManager";

describe("Command Manager", () => {
  AddCommands();

  it("GetCommandData", () => {
    const comm = CommandIntr.parse("playanimation @e left", { character: 0, line: 0 }, "");

    const matches = comm.GetCommandData(true);

    expect(matches.length).greaterThanOrEqual(1);
  });

  it("Edu test", () => {
    const comm = CommandIntr.parse("dialogue open", { character: 0, line: 0 }, "");
    let matches = comm.GetCommandData(true);

    expect(matches.length).greaterThanOrEqual(1);

    matches = comm.GetCommandData(false);

    expect(matches.length).lessThanOrEqual(0);
  });

  it("Match test 1", () => {
    const comm = CommandIntr.parse("playanimation @e left", { character: 0, line: 0 }, "");

    const data = Manager.Data.Vanilla.Commands.get("playanimation");
    const patt = data[0].Command;

    expect(isMatch(comm, patt, false)).to.equal(true);
  });
});
