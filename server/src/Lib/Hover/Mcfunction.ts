import { ParameterType } from "bc-minecraft-bedrock-command";
import { ParameterInfo } from "bc-minecraft-bedrock-command/lib/src/Lib/Data/CommandInfo";
import { IDataSet } from "bc-minecraft-bedrock-project/lib/src/Lib/Types/DataSet/IDataSet";
import { Documentated, Identifiable, Locatable } from "bc-minecraft-bedrock-types/lib/src/Types/include";
import { HoverParams, Hover, Range } from "vscode-languageserver";
import { Database } from "../Database/include";
import { RawText } from "../Minecraft/Json/include";
import { TextDocument } from "../Types/Document/TextDocument";

/**
 *
 * @param params
 * @param doc
 * @returns
 */
export function provideHoverMcFunction(params: HoverParams, doc: TextDocument): Hover | undefined {
  //TODO redo
  /*const pos = params.position;
  const LineIndex = pos.line;
  const Line = doc.getLine(LineIndex);
  const Edu = IsEducationEnabled(doc);

  let command: Command = Command.parse(Line, params.position);
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
          return { contents: Info.documentation, range: r };
        } else return GetHoverContent(p, r, T.text);
      }
    }
  }*/

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
  const title = parameter.text;
  let doc: string = "";

  switch (parameter.type) {
    case ParameterType.block:
      return GetDocumentation(Text, range, Database.ProjectData.BehaviorPacks.blocks);

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
      return GetDocumentation(Text, range, Database.ProjectData.BehaviorPacks.entities);

    case ParameterType.event:
      doc = "A event";
      break;

    case ParameterType.float:
      doc = "A float number";
      break;

    case ParameterType.function:
      return GetDocumentation(Text, range, Database.ProjectData.BehaviorPacks.functions);

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
      return GetDocumentation(Text, range, Database.ProjectData.General.objectives);

    case ParameterType.operation:
      doc = "A scoreboard math operation";
      break;

    case ParameterType.particle:
      return GetDocumentation(Text, range, Database.ProjectData.ResourcePacks.particles);

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
      return GetDocumentation(Text, range, Database.ProjectData.ResourcePacks.sounds);

    case ParameterType.string:
      doc = "A string";
      break;

    case ParameterType.tag:
      return GetDocumentation(Text, range, Database.ProjectData.General.tags);

    case ParameterType.tickingarea:
      return GetDocumentation(Text, range, Database.ProjectData.General.tickingAreas);

    case ParameterType.unknown:
      doc = "no idea, I quit";
      break;

    case ParameterType.xp:
      doc = "A xp number";
      break;
  }

  return { contents: [title, doc], range: range };
}

function GetDocumentation<T extends Identifiable & Locatable>(query: string, range: Range, Collection: IDataSet<T>): Hover | undefined {
  let out = undefined;

  Collection.forEach((item) => {
    if (Documentated.is(item) && item.documentation) {
      out = {
        contents: item.documentation,
        range: range,
      };
    } else {
      out = {
        contents: item.id + "\n" + item.location.uri,
        range: range,
      };
    }
  });

  return out;
}
