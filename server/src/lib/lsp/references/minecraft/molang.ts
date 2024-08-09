import { BaseObject } from "bc-minecraft-bedrock-types/lib/src/types/base-object";
import { Location } from "vscode-languageserver-protocol";
import { MolangCarrier } from "bc-minecraft-bedrock-project";
import { MolangSet } from "bc-minecraft-molang/lib/src/Molang/MolangSet";
import { OffsetWord } from "bc-vscode-words";
import { References } from "../../../util/references";
import { Context } from "../../context/context";
import { ReferenceContext } from "../context";

export function provideReferences(context: Context<ReferenceContext>, text: OffsetWord): Location[] | undefined {
  const { database } = context;

  const index = text.text.indexOf(".");
  if (index < 0) return undefined;

  const type = text.text.slice(0, index);
  const value = text.text.slice(index + 1);

  switch (type.toLowerCase()) {
    // case "context":
    // case "c":
    //   break;

    case "geometry":
      return References.ConvertLocation([database.findReference(text.text)], context.documents);

    // case "math":
    //   break;

    // case "query":
    // case "q":
    //   break;

    // case "texture":
    //   break;

    case "temp":
    case "t":
      return GetTemp(context, value);

    case "variable":
    case "v":
      return GetVariables(context, value);
  }

  return undefined;
}

function GetVariables(context: Context<any>, variable: string): Location[] {
  const { database, documents } = context;
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

  return References.ConvertLocation(locations, documents);
}

function GetTemp(context: Context<any>, variable: string): Location[] {
  const { database, documents } = context;
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

  return References.ConvertLocation(locations, documents);
}
