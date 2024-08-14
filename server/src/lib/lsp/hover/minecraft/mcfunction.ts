import { Command, ParameterInfo, ParameterType, ParameterTypeDocumentation } from "bc-minecraft-bedrock-command";
import { IDataSet } from "bc-minecraft-bedrock-project";
import { Documentated, Identifiable, Locatable } from "bc-minecraft-bedrock-types/lib/src/types";
import { Hover, Range } from "vscode-languageserver";
import { IsEducationEnabled } from "../../../project/attributes";
import { Context } from "../../context/context";
import { HoverContext } from "../context";

import * as RawText from "./json-raw-text";

export function provideHover(context: Context<HoverContext>): Hover | undefined {
  const { params, document } = context;

  const cursor = document.offsetAt(params.position);
  const LineIndex = params.position.line;
  const Line = document.getLine(LineIndex);
  const offset = document.offsetAt({ character: 0, line: LineIndex });
  const Edu = IsEducationEnabled(document);

  let command: Command = Command.parse(Line, offset);
  let subCommand = command.isInSubCommand(cursor, Edu);

  while (subCommand) {
    command = subCommand;
    subCommand = subCommand.isInSubCommand(cursor, Edu);
  }

  const data = command.getBestMatch(Edu);

  if (data.length >= 1) {
    const info = data[0];
    const parameters = info.parameters;
    const index = command.findCursorIndex(cursor);

    if (parameters.length > index) {
      const parameterInfo = parameters[index];
      const parameter = command.parameters[index];

      if (parameter) {
        const pdoc = ParameterTypeDocumentation[parameterInfo.type] ?? "";
        const r = Range.create(
          document.positionAt(parameter.offset),
          document.positionAt(parameter.offset + parameter.text.length)
        );

        if (index == 0) {
          return { contents: `## ${info.name}\n${info.documentation}\n${pdoc}`, range: r };
        } else {
          return GetHoverContent(context, parameterInfo, r, parameter.text, pdoc);
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
 * @param text
 * @returns
 */
function GetHoverContent(
  context: Context<HoverContext>,
  parameter: ParameterInfo,
  range: Range,
  text: string,
  additional: string
): Hover | undefined {
  const { database } = context;

  switch (parameter.type) {
    case ParameterType.block:
      return getDocumentation(text, range, database.ProjectData.behaviorPacks.blocks, additional);

    case ParameterType.entity:
      return getDocumentation(text, range, database.ProjectData.behaviorPacks.entities, additional);

    case ParameterType.function:
      return getDocumentation(text, range, database.ProjectData.behaviorPacks.functions, additional);

    case ParameterType.jsonRawText:
      return RawText.provideHover(range);

    case ParameterType.objective:
      return getDocumentation(text, range, database.ProjectData.general.objectives, additional);

    case ParameterType.particle:
      return getDocumentation(text, range, database.ProjectData.resourcePacks.particles, additional);

    case ParameterType.sound:
      return getDocumentation(text, range, database.ProjectData.resourcePacks.sounds, additional);

    case ParameterType.tag:
      return getDocumentation(text, range, database.ProjectData.general.tags, additional);

    case ParameterType.tickingarea:
      return getDocumentation(text, range, database.ProjectData.general.tickingAreas, additional);
  }

  const title = parameter.text;
  const doc = `## ${title}\n${GetString(parameter.type) ?? ""}\n${additional}`;

  return { contents: { kind: "markdown", value: doc }, range: range };
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

function getDocumentation<T extends Identifiable & Locatable>(
  query: string,
  range: Range,
  collection: IDataSet<T>,
  additional: string
): Hover | undefined {
  let out: Hover | undefined = undefined;

  collection.forEach((item) => {
    let doc: string;
    if (Documentated.is(item) && item.documentation) {
      doc = item.documentation;
    } else {
      doc = item.id + "\n" + item.location.uri;
    }

    doc += "\n" + additional;
    out = { contents: { kind: "markdown", value: doc }, range: range };
  });

  return out;
}
