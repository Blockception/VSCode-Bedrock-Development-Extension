import { HoverParams, Hover, Range } from "vscode-languageserver";
import { Database, DataCollector } from "../Database/include";
import { Command, GetSubCommand } from "../Types/Commands/Interpertation/include";
import { ParameterInfo, ParameterType } from "../Minecraft/Commands/Parameter/include";
import { TextDocument } from "../Types/Document/TextDocument";
import { Identifiable, Locatable, Documentable } from "../Types/Minecraft/Interfaces/include";
import { RawText } from "../Types/Minecraft/Json/include";

/**
 *
 * @param params
 * @param doc
 * @returns
 */
export function provideHoverMcFunction(params: HoverParams, doc: TextDocument): Hover | undefined {
  const pos = params.position;
  const LineIndex = pos.line;
  const Line = doc.getLine(LineIndex);
  const Edu = IsEducationEnabled(doc);

  let Command: Command = Command.parse(Line, params.position, doc.uri);
  let Sub = GetSubCommand(Command, Edu);

  while (Sub) {
    if (Sub && Sub.Parameters[0].location.range.start.character <= pos.character) {
      Command = Sub;
      Sub = GetSubCommand(Command, Edu);
    } else {
      Sub = undefined;
    }
  }

  const Data = command.getCommandData(Edu);

  if (Data.length >= 1) {
    const Info = Data[0];
    const parameters = Info.command.parameters;
    const Index = Command.CursorParamater;

    if (parameters.length > Index) {
      const p = parameters[Index];
      const T = command.parameters[Index];

      if (T) {
        const r = T.location.range;

        if (Index == 0) {
          return { contents: Info.Command.documentation, range: r };
        } else return GetHoverContent(p, r, T.text);
      }
    }
  }

  return undefined;
}

/**
 *
 * @param parameter
 * @param range
 * @param Text
 * @returns
 */
function GetHoverContent(parameter: ParameterInfo, range: Range, Text: string): Hover | undefined {
  const title = parameter.Text;
  let doc: string = "";

  switch (parameter.Type) {
    case ParameterType.block:
      return GetDocumentation(Text, range, Database.ProjectData.General.Blocks);

    case ParameterType.boolean:
      doc = "A boolean value (true or false)";
      break;

    case ParameterType.command:
      doc = "A sub command to execute";
      break;

    case ParameterType.coordinate:
      doc = "A coordinate";
      break;

    case ParameterType.effect:
      doc = "A effect identifier";
      break;

    case ParameterType.entity:
      return GetDocumentation(Text, range, Database.ProjectData.General.Entities);

    case ParameterType.event:
      doc = "A event";
      break;

    case ParameterType.float:
      doc = "A float number";
      break;

    case ParameterType.function:
      return GetDocumentation(Text, range, Database.ProjectData.General.Functions);

    case ParameterType.gamemode:
      doc = "A minecraft gamemode";
      break;

    case ParameterType.integer:
      doc = "An integer number";
      break;

    case ParameterType.item:
      doc = "An item identifier";
      break;

    case ParameterType.jsonItem:
      doc = "The json schema for items";
      break;

    case ParameterType.jsonRawText:
      return RawText.provideHover(range);

    case ParameterType.locateFeature:
      doc = "A locate feature";
      break;

    case ParameterType.objective:
      return GetDocumentation(Text, range, Database.ProjectData.General.Objectives);

    case ParameterType.operation:
      doc = "A scoreboard math operation";
      break;

    case ParameterType.particle:
      return GetDocumentation(Text, range, Database.ProjectData.ResourcePacks.Particles);

    case ParameterType.replaceMode:
      doc = "A replace mode";
      break;

    case ParameterType.selector:
      doc = "A selector that target all players, entities or fake players";
      break;

    case ParameterType.slotID:
      doc = "A slot id";
      break;

    case ParameterType.slotType:
      doc = "A slot type";
      break;

    case ParameterType.sound:
      return GetDocumentation(Text, range, Database.ProjectData.General.Sounds);

    case ParameterType.string:
      doc = "A string";
      break;

    case ParameterType.tag:
      return GetDocumentation(Text, range, Database.ProjectData.General.Tag);

    case ParameterType.tickingarea:
      return GetDocumentation(Text, range, Database.ProjectData.General.TickingAreas);

    case ParameterType.unknown:
      doc = "no idea, I quit";
      break;

    case ParameterType.xp:
      doc = "A xp number";
      break;
  }

  return { contents: [title, doc], range: range };
}

function GetDocumentation<T extends Identifiable & Locatable>(query: string, range: Range, Collection: DataCollector<T>): Hover | undefined {
  const Item = Collection.GetFromID(query);

  if (!Item) return undefined;

  if (Documentable.is(Item)) {
    return {
      contents: Item.Documentation,
      range: range,
    };
  } else {
    return {
      contents: Item.id + "\n" + Item.Location.uri,
      range: range,
    };
  }
}
