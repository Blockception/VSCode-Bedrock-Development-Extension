import { BaseObject } from "bc-minecraft-bedrock-types/lib/types/base-object";
import { MolangSet } from "bc-minecraft-molang";
import { OffsetWord } from "bc-vscode-words";
import { Location } from "vscode-languageserver";
import { isDefined } from "../../../minecraft/molang";
import { References } from "../../../util";
import { Context } from "../../context/context";
import { ReferenceContext } from "../context";

export async function provideReferences(
  context: Context<ReferenceContext>,
  text: OffsetWord
): Promise<Location[] | undefined> {
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
      return database.findReference(text.text, context.documents, { defined: true, usage: false }, context.token);

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
  const map = (item: BaseObject & { molang: MolangSet }) => {
    if (isDefined(item.molang, variable)) locations.push(item);
  };

  database.ProjectData.behaviorPacks.animation_controllers.forEach(map);
  database.ProjectData.behaviorPacks.animations.forEach(map);
  database.ProjectData.behaviorPacks.entities.forEach(map);

  database.ProjectData.resourcePacks.animation_controllers.forEach(map);
  database.ProjectData.resourcePacks.animations.forEach(map);
  database.ProjectData.resourcePacks.entities.forEach(map);
  database.ProjectData.resourcePacks.render_controllers.forEach(map);
  //Database.ProjectData.ResourcePacks.particles.forEach(map);

  return References.convertLocation(locations, documents);
}

function GetTemp(context: Context<any>, variable: string): Location[] {
  const { database, documents } = context;
  const locations: BaseObject[] = [];
  const map = (item: BaseObject & { molang: MolangSet }) => {
    if (isDefined(item.molang, variable)) locations.push(item);
  };

  database.ProjectData.behaviorPacks.animation_controllers.forEach(map);
  database.ProjectData.behaviorPacks.animations.forEach(map);
  database.ProjectData.behaviorPacks.entities.forEach(map);

  database.ProjectData.resourcePacks.animation_controllers.forEach(map);
  database.ProjectData.resourcePacks.animations.forEach(map);
  database.ProjectData.resourcePacks.entities.forEach(map);
  database.ProjectData.resourcePacks.render_controllers.forEach(map);
  //Database.ProjectData.ResourcePacks.particles.forEach(map);

  return References.convertLocation(locations, documents);
}
