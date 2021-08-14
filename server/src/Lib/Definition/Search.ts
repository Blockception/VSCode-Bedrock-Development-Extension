import { Location } from "vscode-languageserver";
import { Database } from "../Database/Database";
import { DataCollector } from "../Database/DataCollector";
import { MCCommandParameterType } from "../Types/Commands/Parameter/include";
import { Identifiable, Locatable } from "../Types/Minecraft/Interfaces/include";

export function SearchDefinition(text: string, type: MCCommandParameterType[]): Location[] {
  let Out: Location[] = [];

  //prune types
  type.filter((t) => {
    switch (t) {
      case MCCommandParameterType.block:
      case MCCommandParameterType.entity:
      case MCCommandParameterType.function:
      case MCCommandParameterType.item:
      case MCCommandParameterType.objective:
      case MCCommandParameterType.selector:
      case MCCommandParameterType.sound:
      case MCCommandParameterType.tag:
      case MCCommandParameterType.tickingarea:
        //keep
        return true;

      default:
        return false;
    }
  });

  if (type.length <= 0) {
    return Out;
  }

  //foreach dataset
  SearchDefinitionIn(text, type, Out);

  return Out;
}

export function SearchDefinitionIn(text: string, type: MCCommandParameterType[], receiver: Location[]) {
  let Data = Database.ProjectData.General;
  for (let I = 0; I < type.length; I++) {
    switch (type[I]) {
      case MCCommandParameterType.block:
        SearchInCollection(text, Data.Blocks, receiver);
        break;

      case MCCommandParameterType.entity:
        SearchInCollection(text, Data.Entities, receiver);
        break;

      case MCCommandParameterType.function:
        SearchInCollection(text, Data.Functions, receiver);
        break;

      case MCCommandParameterType.item:
        SearchInCollection(text, Data.Items, receiver);
        break;

      case MCCommandParameterType.objective:
        SearchInCollection(text, Data.Objectives, receiver);
        break;

      case MCCommandParameterType.selector:
        SearchInCollection(text, Data.FakeEntities, receiver);
        break;

      case MCCommandParameterType.sound:
        SearchInCollection(text, Data.Sounds, receiver);
        break;

      case MCCommandParameterType.tag:
        SearchInCollection(text, Data.Tag, receiver);
        break;

      case MCCommandParameterType.tickingarea:
        SearchInCollection(text, Data.TickingAreas, receiver);
        break;
    }
  }
}

function SearchInCollection<T extends Identifiable & Locatable>(text: string, collection: DataCollector<T>, receiver: Location[]): void {
  collection.ForEachID(text, (f) => receiver.push(f.Location));
}
