import { TextDocument } from "vscode-languageserver-textdocument";
import { Database } from "../../../../Database/include";
import { DataReference } from "../../../../Database/Types/include";
import { EmptyTypes } from "../../../General/Empty";

export function Process(doc: TextDocument): void {
  let filepath = decodeURI(doc.uri);

  let index = filepath.indexOf("loot_tables");

  if (index < 0) {
    return;
  }

  let identifier = filepath.slice(index, filepath.length);
  identifier = identifier.replace(/\\/g, "/");

  if (identifier !== "") {
    let loc = EmptyTypes.EmptyLocation();
    loc.uri = doc.uri;
    Database.Data.Behaviourpack.LootTables.Set(new DataReference(identifier, loc));
  }
}
