import { Command, ParameterType, ParameterTypeDocumentation } from "bc-minecraft-bedrock-command";
import { Database } from "../../Database/Database";
import { Documentated, Identifiable, Locatable } from "bc-minecraft-bedrock-types/lib/src/Types";
import { HoverParams, Hover, Range } from "vscode-languageserver";
import { IDataSet } from "bc-minecraft-bedrock-project";
import { IsEducationEnabled } from '../../Project/Attributes';
import { ParameterInfo } from "bc-minecraft-bedrock-command/lib/src/Lib/Data/CommandInfo";
import { RawText } from "../Json";
import { TextDocument } from "../../Types/Document/TextDocument";

/**
 *
 * @param params
 * @param doc
 * @returns
 */
export function provideHover(params: HoverParams, doc: TextDocument): Hover | undefined {
  const cursor = doc.offsetAt(params.position);
  const LineIndex = params.position.line;
  const Line = doc.getLine(LineIndex);
  const offset = doc.offsetAt({ character: 0, line: LineIndex });
  const Edu = IsEducationEnabled(doc);

  let command: Command = Command.parse(Line, offset);
  let Sub = command.isInSubCommand(cursor, Edu);

  while (Sub) {
    command = Sub;
    Sub = Sub.isInSubCommand(cursor, Edu);
  }

  const Data = command.getBestMatch(Edu);

  if (Data.length >= 1) {
    const Info = Data[0];
    const parameters = Info.parameters;
    const Index = command.findCursorIndex(cursor);

    if (parameters.length > Index) {
      const p = parameters[Index];
      const T = command.parameters[Index];

      if (T) {
        const pdoc = ParameterTypeDocumentation[p.type] ?? '';
        const r = Range.create(doc.positionAt(T.offset), doc.positionAt(T.offset + T.text.length));

        if (Index == 0) {
          return { contents: `## ${Info.name}\n${Info.documentation}\n${pdoc}`, range: r };
        } else {
          return GetHoverContent(p, r, T.text, pdoc);
        }
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
function GetHoverContent(parameter: ParameterInfo, range: Range, Text: string, additional: string): Hover | undefined {
  switch (parameter.type) {
    case ParameterType.block:
      return GetDocumentation(Text, range, Database.ProjectData.BehaviorPacks.blocks, additional);

    case ParameterType.entity:
      return GetDocumentation(Text, range, Database.ProjectData.BehaviorPacks.entities, additional);

    case ParameterType.function:
      return GetDocumentation(Text, range, Database.ProjectData.BehaviorPacks.functions, additional);

    case ParameterType.jsonRawText:
      return RawText.provideHover(range);

    case ParameterType.objective:
      return GetDocumentation(Text, range, Database.ProjectData.General.objectives, additional);

    case ParameterType.particle:
      return GetDocumentation(Text, range, Database.ProjectData.ResourcePacks.particles, additional);

    case ParameterType.sound:
      return GetDocumentation(Text, range, Database.ProjectData.ResourcePacks.sounds, additional);

    case ParameterType.tag:
      return GetDocumentation(Text, range, Database.ProjectData.General.tags, additional);

    case ParameterType.tickingarea:
      return GetDocumentation(Text, range, Database.ProjectData.General.tickingAreas, additional);
  }

  const title = parameter.text;
  const doc = `## ${title}\n${GetString(parameter.type) ?? ""}\n${additional}`;

  return { contents: {kind: 'markdown', value: doc }, range: range };
}

function GetString(type: ParameterType): string | undefined {
  switch (type) {
    case ParameterType.boolean:
      return "A boolean value (true or false)";
      
    case ParameterType.command:
      return "A sub command to execute";

    case ParameterType.coordinate:
      return "A coordinate";

    case ParameterType.effect:
      return "A effect identifier";

    case ParameterType.event:
      return "A event";

    case ParameterType.float:
      return "A float number";

    case ParameterType.gamemode:
      return "A minecraft gamemode";

    case ParameterType.integer:
      return "An integer number";

    case ParameterType.item:
      return "An item identifier";

    case ParameterType.jsonItem:
      return "The json schema for items";

    case ParameterType.locateFeature:
      return "A locate feature";

    case ParameterType.operation:
      return "A scoreboard math operation";

    case ParameterType.replaceMode:
      return "A replace mode";

    case ParameterType.selector:
      return "A selector that target all players, entities or fake players";

    case ParameterType.slotID:
      return "A slot id";

    case ParameterType.slotType:
      return "A slot type";

    case ParameterType.string:
      return "A string";

    case ParameterType.unknown:
      return "no idea, I quit";

    case ParameterType.xp:
      return "A xp number";
  }

  return undefined;
}

function GetDocumentation<T extends Identifiable & Locatable>(query: string, range: Range, Collection: IDataSet<T>, additional: string): Hover | undefined {
  let out : Hover | undefined = undefined;

  Collection.forEach((item) => {
    let doc : string;
    if (Documentated.is(item) && item.documentation) {
      doc = item.documentation;
    } else {
      doc = item.id + "\n" + item.location.uri;
    }

    doc += "\n" + additional;
    out = { contents: {kind:'markdown', value: doc}, range: range };
  });

  return out;
}
