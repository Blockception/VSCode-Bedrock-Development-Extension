import { BaseObject } from "bc-minecraft-bedrock-types/lib/src/types/base-object";
import { Database } from "../../../../lsp/database/database";
import { Location } from "vscode-languageserver-protocol";
import { MolangCarrier } from "bc-minecraft-bedrock-project";
import { MolangSet } from "bc-minecraft-molang/lib/src/Molang/MolangSet";
import { OffsetWord } from "bc-vscode-words";
import { References } from "../../../../util/references";
import { TextDocument } from "../../../documents/text-document";

export function provideReferences(text: OffsetWord, doc: TextDocument): Location[] | undefined {
  const index = text.text.indexOf(".");
  if (index < 0) return undefined;
  const { database } = doc.extension();

  const type = text.text.slice(0, index);
  let value = text.text.slice(index + 1);

  switch (type.toLowerCase()) {
    case "context":
    case "c":
      break;

    case "geometry":
      return References.ConvertLocation([database.findReference(text.text)]);

    case "math":
      break;

    case "query":
    case "q":
      break;

    case "texture":
      break;

    case "temp":
    case "t":
      return GetTemp(value, database);

    case "variable":
    case "v":
      return GetVariables(value, database);
  }

  return undefined;
}

function GetVariables(variable: string, database: Database): Location[] {
  const locations: BaseObject[] = [];
  const map = (item: BaseObject & MolangCarrier<MolangSet>) => {
    if (item.molang.variables.defined.includes(variable)) locations.push(item);
  };

  database.ProjectData.behaviorPacks.animation_controllers.forEach(map);
  database.ProjectData.behaviorPacks.animations.forEach(map);
  database.ProjectData.behaviorPacks.entities.forEach(map);

  database.ProjectData.resourcePacks.animation_controllers.forEach(map);
  database.ProjectData.resourcePacks.animations.forEach(map);
  database.ProjectData.resourcePacks.entities.forEach(map);
  database.ProjectData.resourcePacks.render_controllers.forEach(map);
  //Database.ProjectData.ResourcePacks.particles.forEach(map);

  return References.ConvertLocation(locations);
}

function GetTemp(variable: string, database: Database): Location[] {
  const locations: BaseObject[] = [];
  const map = (item: BaseObject & MolangCarrier<MolangSet>) => {
    if (item.molang.temps.defined.includes(variable)) locations.push(item);
  };

  database.ProjectData.behaviorPacks.animation_controllers.forEach(map);
  database.ProjectData.behaviorPacks.animations.forEach(map);
  database.ProjectData.behaviorPacks.entities.forEach(map);

  database.ProjectData.resourcePacks.animation_controllers.forEach(map);
  database.ProjectData.resourcePacks.animations.forEach(map);
  database.ProjectData.resourcePacks.entities.forEach(map);
  database.ProjectData.resourcePacks.render_controllers.forEach(map);
  //Database.ProjectData.ResourcePacks.particles.forEach(map);

  return References.ConvertLocation(locations);
}
