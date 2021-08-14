import { Console } from "../../Console/Console";
import { Database } from "../../Database/Database";
import { CommandIntr } from "../../Types/Commands/Interpertation/include";
import { TextDocument } from "../../Types/Document/TextDocument";
import { FakeEntity } from "../../Types/General/FakeEntity/include";
import { Objective } from "../../Types/General/Objectives/include";
import { IsFakePlayer } from "../../Types/General/Selector/include";
import { GetComment } from "../../Types/Minecraft/Behavior/Functions/include";

/**
 *
 * @param Com
 * @param doc
 * @returns
 */
export function ProcessScoreboardCommand(Com: CommandIntr, doc: TextDocument): void {
  if (Com.Parameters.length < 3) {
    return;
  }

  let Comment = GetComment(doc.getLine(Com.Line));
  let Mode = Com.Parameters[1];

  switch (Mode.text) {
    case "players":
      return CheckPlayer(Com, Comment);

    case "objectives":
      return CheckObjective(Com, Comment);
  }
}

/**
 *
 * @param Com
 * @param Comment
 * @returns
 */
function CheckObjective(Com: CommandIntr, Comment: string): void {
  let ObjectiveMode = Com.Parameters[2];

  if (Com.Parameters.length < 4) {
    return;
  }

  if (ObjectiveMode.text === "add") {
    let obj = new Objective();

    let ID = Com.Parameters[3];
    let Type = Com.Parameters[4];
    obj.Identifier = ID.text;
    obj.Type = Type.text;
    obj.Location = ID.location;

    if (Comment === "") {
      obj.Documentation.value = "The objective: " + ID.text + " " + Type.text;

      if (Com.Parameters.length > 5) {
        obj.Documentation.value += " " + Com.Parameters[5].text.replace(/"/g, "");
      }
    } else {
      obj.Documentation.value = Comment;
    }

    Console.Info(`Found objective: ${obj.Identifier}`);
    Database.ProjectData.General.Objectives.Set(obj);
  }
}

function CheckPlayer(Com: CommandIntr, Comment: string): void {
  if (Com.Parameters.length > 3) {
    let Selector = Com.Parameters[3];

    if (IsFakePlayer(Selector.text)) {
      let FE = new FakeEntity();

      FE.Identifier = Selector.text;
      FE.Location = Selector.location;

      if (Comment !== "") {
        FE.Documentation.value = "The fake player: " + FE.Identifier;
      } else {
        FE.Documentation.value = Comment;
      }

      Console.Info(`Found fake player: ${FE.Identifier}`);
      Database.ProjectData.General.FakeEntities.Set(FE);
    }
  }
}
