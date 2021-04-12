import { Location } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Console } from "../../Console/Console";
import { Database } from "../../Database/include";
import { Manager } from "../../Manager/include";
import { CommandIntr } from "../../Types/Commands/Interpertation/include";
import { Tickingarea } from "../../Types/General/Tickingarea/include";

export function ProcessTickingAreaCommand(Command: CommandIntr): void {
  //tickingarea add
  if (Command.Parameters[1]?.text !== "add") return;

  //tickingarea add circle
  if (Command.Parameters[2]?.text === "circle") {
    ProcessCircleCommand(Command);
  } else {
    ProcessBoxCommand(Command);
  }
}

function ProcessCircleCommand(Command: CommandIntr): void {
  //Tickingarea add circle <x> <y> <z> <r> [name]
  const Parameters = Command.Parameters;

  if (Parameters.length < 7) return;

  let Area = "x: " + Parameters[3].text + "y: " + Parameters[4].text + "z: " + Parameters[5].text + "; radius: " + Parameters[6].text;
  let Name = "";
  const uri = Command.Parameters[0].location.uri;

  let Location: Location;

  if (Parameters.length > 7) {
    Name = Parameters[7].text;
    Location = Parameters[7].location;
  } else {
    Location = {
      uri: uri,
      range: {
        start: Parameters[3].location.range.start,
        end: Parameters[6].location.range.end,
      },
    };
  }

  Create(Location, Name, 'The circular tickingarea: "' + Name + '"; ' + Area);
}

function ProcessBoxCommand(Command: CommandIntr): void {
  //Tickingarea add <x> <y> <z> <x> <y> <z> [name]
  const Parameters = Command.Parameters;

  if (Parameters.length < 8) return;

  let Area = "x: " + Parameters[2].text + "y: " + Parameters[3].text + "z: " + Parameters[4].text + ";";
  Area += "x: " + Parameters[5].text + "y: " + Parameters[6].text + "z: " + Parameters[7].text + ";";
  let Name = "";
  const uri = Command.Parameters[0].location.uri;

  let Location: Location;

  if (Parameters.length > 8) {
    Name = Parameters[8].text;
    Location = Parameters[8].location;
  } else {
    Location = {
      uri: uri,
      range: {
        start: Parameters[2].location.range.start,
        end: Parameters[7].location.range.end,
      },
    };
  }

  Create(Location, Name, 'The box tickingarea: "' + Name + '"; ' + Area);
}

function Create(Loc: Location, Name: string, Doc: string): void {
  let Ta = new Tickingarea();
  Ta.Location = Loc;
  Ta.Identifier = Name;
  Ta.Documentation.value = Doc;

  Console.Info("Found ticking area: " + Name);
  Database.Data.General.TickingAreas.Set(Ta);
}
