import { Location } from "vscode-languageserver";
import { Database } from "../../../../Database/include";
import { DataReference } from "../../../../Database/Types/include";
import { JsonDocument } from "../../../Document/Json Document";
import { TextDocument } from "../../../Document/TextDocument";

import { EmptyTypes } from "../../../General/Empty";
import { General } from "../../../include";
import { Block } from "./Blocks";

/**
 * Processes the text document as a behavior entity definition file
 * @param doc The document to parse
 */
export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.CastTo<Block>();

  if (!Block.is(Format)) return;

  let Name = Format["minecraft:block"].description.identifier;
  let Range = JDoc.GetRangeOfObject(Name);
  let Location: Location = {
    uri: doc.uri,
    range: Range ?? EmptyTypes.EmptyRange(),
  };

  Database.ProjectData.Behaviorpack.Blocks.Set(new DataReference(Name, Location));

  let B = new General.Block.Block();
  B.Location = Location;
  B.Identifier = Name;
  B.Documentation.value = "The custom block: `" + Name + "`";
  Database.ProjectData.General.Blocks.Set(B);
}
