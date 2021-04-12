import { HoverParams, Hover, Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getLine } from "../Code/include";
import { Database, DataCollector } from "../Database/include";
import { CommandIntr, GetSubCommand } from "../Types/Commands/Interpertation/include";
import { MCCommandParameter, MCCommandParameterType } from "../Types/Commands/Parameter/include";
import { Identifiable, Locatable, Documentable } from "../Types/Minecraft/Interfaces/include";
import { RawText } from "../Types/Minecraft/Json/include";

export function provideHoverMcFunction(params: HoverParams, doc: TextDocument): Hover | undefined {
  const pos = params.position;
  const LineIndex = pos.line;
  const Line = getLine(doc, LineIndex);

  let Command: CommandIntr = CommandIntr.parse(Line, params.position, doc.uri);

  let Sub = GetSubCommand(Command);

  while (Sub) {
    if (Sub && Sub.Parameters[0].location.range.start.character <= pos.character) {
      Command = Sub;
      Sub = GetSubCommand(Command);
    } else {
      Sub = undefined;
    }
  }

  let Data = Command.GetCommandData();

  if (Data.length >= 1) {
    let Info = Data[0];
    let parameters = Info.Command.parameters;
    let Index = Command.CursorParamater;

    if (parameters.length > Index) {
      let p = parameters[Index];
      let T = Command.Parameters[Index];

      if (T) {
        let r = T.location.range;

        if (Index == 0) {
          return { contents: Info.Command.documentation, range: r };
        } else return GetHoverContent(p, r, T.text);
      }
    }
  }

  return undefined;
}

function GetHoverContent(parameter: MCCommandParameter, range: Range, Text: string): Hover | undefined {
  let title = parameter.Text;
  let doc: string = "";

  switch (parameter.Type) {
    case MCCommandParameterType.block:
      return GetDocumentation(Text, range, Database.Data.General.Blocks);

    case MCCommandParameterType.boolean:
      doc = "A boolean value (true or false)";
      break;

    case MCCommandParameterType.command:
      doc = "A sub command to execute";
      break;

    case MCCommandParameterType.coordinate:
      doc = "A coordinate";
      break;

    case MCCommandParameterType.effect:
      doc = "A effect identifier";
      break;

    case MCCommandParameterType.entity:
      return GetDocumentation(Text, range, Database.Data.General.Entities);

    case MCCommandParameterType.event:
      doc = "A event";
      break;

    case MCCommandParameterType.float:
      doc = "A float number";
      break;

    case MCCommandParameterType.function:
      return GetDocumentation(Text, range, Database.Data.General.Functions);

    case MCCommandParameterType.gamemode:
      doc = "A minecraft gamemode";
      break;

    case MCCommandParameterType.integer:
      doc = "An integer number";
      break;

    case MCCommandParameterType.item:
      doc = "An item identifier";
      break;

    case MCCommandParameterType.jsonItem:
      doc = "The json schema for items";
      break;

    case MCCommandParameterType.jsonRawText:
      return RawText.provideHover(range);

    case MCCommandParameterType.locateFeature:
      doc = "A locate feature";
      break;

    case MCCommandParameterType.objective:
      return GetDocumentation(Text, range, Database.Data.General.Objectives);

    case MCCommandParameterType.operation:
      doc = "A scoreboard math operation";
      break;

    case MCCommandParameterType.particle:
      return GetDocumentation(Text, range, Database.Data.Resourcepack.Particles);

    case MCCommandParameterType.replaceMode:
      doc = "A replace mode";
      break;

    case MCCommandParameterType.selector:
      doc = "A selector that target all players, entities or fake players";
      break;

    case MCCommandParameterType.slotID:
      doc = "A slot id";
      break;

    case MCCommandParameterType.slotType:
      doc = "A slot type";
      break;

    case MCCommandParameterType.sound:
      return GetDocumentation(Text, range, Database.Data.General.Sounds);

    case MCCommandParameterType.string:
      doc = "A string";
      break;

    case MCCommandParameterType.tag:
      return GetDocumentation(Text, range, Database.Data.General.Tag);

    case MCCommandParameterType.tickingarea:
      return GetDocumentation(Text, range, Database.Data.General.TickingAreas);

    case MCCommandParameterType.unknown:
      doc = "no idea, I quit";
      break;

    case MCCommandParameterType.xp:
      doc = "A xp number";
      break;
  }

  return { contents: [title, doc], range: range };
}

function GetDocumentation<T extends Identifiable & Locatable>(query: string, range: Range, Collection: DataCollector<T>): Hover | undefined {
  let Item = Collection.GetFromID(query);

  if (!Item) return undefined;

  if (Documentable.is(Item)) {
    return {
      contents: Item.Documentation,
      range: range,
    };
  } else {
    return {
      contents: Item.Identifier + "\n" + Item.Location.uri,
      range: range,
    };
  }
}
