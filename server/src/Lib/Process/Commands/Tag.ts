import { Console } from "../../Console/Console";
import { Database } from "../../Database/Database";
import { CommandIntr } from "../../Types/Commands/Interpertation/include";
import { TextDocument } from "../../Types/Document/TextDocument";
import { Tag } from "../../Types/General/Tag/Tag";
import { GetComment } from "../../Types/Minecraft/Behavior/Functions/include";

export function ProcessTagCommand(Com: CommandIntr, doc: TextDocument): void {
  //tag <selector> add <tag>
  if (Com.Parameters[2]?.text !== "add") return;

  let tag = Com.Parameters[3];

  let Data = new Tag();
  Data.Identifier = tag.text;
  Data.Location = tag.location;

  let Comment = GetComment(doc.getLine(Com.Line));

  if (Comment !== "") {
    Data.Documentation.value = Comment;
  } else {
    Data.Documentation.value = "The tag: " + tag.text;
  }

  Console.Info("Found tag: " + tag.text);
  Database.Data.General.Tag.Set(Data);
}
