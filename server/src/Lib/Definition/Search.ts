import { ParameterType } from "bc-minecraft-bedrock-command";
import { Location } from "vscode-languageserver";
import { Database } from "../Database/Database";

export function SearchDefinition(text: string, type: ParameterType[]): Location[] {
  let Out: Location[] = [];

  //prune types
  type.filter((t) => {
    switch (t) {
      case ParameterType.block:
      case ParameterType.entity:
      case ParameterType.function:
      case ParameterType.item:
      case ParameterType.objective:
      case ParameterType.selector:
      case ParameterType.sound:
      case ParameterType.tag:
      case ParameterType.tickingarea:
        //keep
        return true;

      default:
        return false;
    }
  });

  if (type.length <= 0) {
    return Out;
  }

  //forEach dataset
  SearchDefinitionIn(text, type, Out);

  return Out;
}

export function SearchDefinitionIn(text: string, type: ParameterType[], receiver: Location[]) {
  const Data = Database.ProjectData.General;

  for (let I = 0; I < type.length; I++) {
    switch (
      type[I]
      /*case ParameterType.block:
        SearchInCollection(text, Data.Blocks, receiver);
        break;

      case ParameterType.entity:
        SearchInCollection(text, Data.Entities, receiver);
        break;

      case ParameterType.function:
        SearchInCollection(text, Data.Functions, receiver);
        break;

      case ParameterType.item:
        SearchInCollection(text, Data.Items, receiver);
        break;

      case ParameterType.objective:
        SearchInCollection(text, Data.Objectives, receiver);
        break;

      case ParameterType.selector:
        SearchInCollection(text, Data.FakeEntities, receiver);
        break;

      case ParameterType.sound:
        SearchInCollection(text, Data.Sounds, receiver);
        break;

      case ParameterType.tag:
        SearchInCollection(text, Data.Tag, receiver);
        break;

      case ParameterType.tickingarea:
        SearchInCollection(text, Data.TickingAreas, receiver);
        break;*/
    ) {
    }
  }
}

/**
function SearchInCollection<T extends Identifiable & Locatable>(text: string, collection: DataCollector<T>, receiver: Location[]): void {
  collection.ForEachID(text, (f) => receiver.push(f.Location));
}
 */
