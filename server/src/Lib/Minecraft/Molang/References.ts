import { MolangCarrier } from "bc-minecraft-bedrock-project";
import { BaseObject } from "bc-minecraft-bedrock-types/lib/src/Types/BaseObject";
import { MolangSet } from "bc-minecraft-molang/lib/src/Molang/MolangSet";
import { OffsetWord } from "bc-vscode-words";
import { DefinitionParams, Location, ReferenceParams } from "vscode-languageserver-protocol";
import { References } from "../../Code/References";
import { Database } from "../../Database/Database";
import { TextDocument } from "../../Types/Document/TextDocument";

export function provideReferences(
  text: OffsetWord,
  doc: TextDocument,
  params: DefinitionParams | ReferenceParams
): Location[] | undefined {
  //const cursor = doc.offsetAt(params.position);
  //const data = MolangSet.harvest(text.text);

  const index = text.text.indexOf(".");
  if (index < 0) return undefined;

  const type = text.text.slice(0, index);
  let value = text.text.slice(index + 1);

  switch (type.toLowerCase()) {
    case "context":
    case "c":
      break;

    case "geometry":
      return References.ConvertLocation([Database.FindReference(text.text)]);

    case "math":
      break;

    case "query":
    case "q":
      break;

    case "texture":
      break;

    case "temp":
    case "t":
      return GetTemp(value);

    case "variable":
    case "v":
      return GetVariables(value);
  }

  return undefined;
}

function GetVariables(variable: string): Location[] {
  const locations: BaseObject[] = [];
  const map = (item: BaseObject & MolangCarrier<MolangSet>) => {
    if (item.molang.variables.defined.includes(variable)) locations.push(item);
  };

  Database.ProjectData.BehaviorPacks.animation_controllers.forEach(map);
  Database.ProjectData.BehaviorPacks.animations.forEach(map);
  Database.ProjectData.BehaviorPacks.entities.forEach(map);

  Database.ProjectData.ResourcePacks.animation_controllers.forEach(map);
  Database.ProjectData.ResourcePacks.animations.forEach(map);
  Database.ProjectData.ResourcePacks.entities.forEach(map);
  Database.ProjectData.ResourcePacks.render_controllers.forEach(map);
  //Database.ProjectData.ResourcePacks.particles.forEach(map);

  return References.ConvertLocation(locations);
}

function GetTemp(variable: string): Location[] {
  const locations: BaseObject[] = [];
  const map = (item: BaseObject & MolangCarrier<MolangSet>) => {
    if (item.molang.temps.defined.includes(variable)) locations.push(item);
  };

  Database.ProjectData.BehaviorPacks.animation_controllers.forEach(map);
  Database.ProjectData.BehaviorPacks.animations.forEach(map);
  Database.ProjectData.BehaviorPacks.entities.forEach(map);

  Database.ProjectData.ResourcePacks.animation_controllers.forEach(map);
  Database.ProjectData.ResourcePacks.animations.forEach(map);
  Database.ProjectData.ResourcePacks.entities.forEach(map);
  Database.ProjectData.ResourcePacks.render_controllers.forEach(map);
  //Database.ProjectData.ResourcePacks.particles.forEach(map);

  return References.ConvertLocation(locations);
}
