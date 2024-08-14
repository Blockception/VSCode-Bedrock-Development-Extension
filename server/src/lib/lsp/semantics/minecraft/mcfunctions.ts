import { Command, ParameterType } from "bc-minecraft-bedrock-command";
import { Position, Range, SemanticTokens } from "vscode-languageserver";
import { IsEducationEnabled } from "../../../project/attributes";
import { TextDocument } from "../../documents/text-document";
import { McfunctionSemanticTokensBuilder } from "../builders/mcfunction";
import { SemanticModifiersEnum, SemanticTokensEnum } from "../constants";
import { CreateNamespaced, CreateRangeTokensWord } from "../functions";
import { CreateSelectorTokens } from "./selectors";

export function provideSemanticToken(doc: TextDocument, range?: Range | undefined): SemanticTokens {
  const Builder = new McfunctionSemanticTokensBuilder(doc);
  let startIndex = 0;
  let endIndex = doc.lineCount;

  if (range) {
    startIndex = range.start.line;
    endIndex = range.end.line;
  }

  for (let I = startIndex; I < endIndex; I++) {
    const line = doc.getLine(I);
    const CommentIndex = line.indexOf("#");

    if (CommentIndex >= 0) {
      Builder.AddAt(I, CommentIndex, line.length - CommentIndex, SemanticTokensEnum.comment);
    }

    const P = Position.create(I, 0);
    const command = Command.parse(line, doc.offsetAt(P));
    CreateTokens(command, Builder);
  }

  return Builder.Build();
}

export function McfunctionLineTokens(line: string, offset: number, Builder: McfunctionSemanticTokensBuilder): void {
  if (line.startsWith("/")) {
    line = line.substring(1, line.length);
    offset++;
  }

  const command = Command.parse(line, offset);
  if (command.getCommandData(true).length <= 0) {
    return;
  }

  CreateTokens(command, Builder);
}

function CreateTokens(command: Command, builder: McfunctionSemanticTokensBuilder): void {
  if (command.parameters.length == 0) return;

  const edu = IsEducationEnabled(builder.document.configuration());
  const first = command.parameters[0];

  if (first.text.startsWith("#")) return;

  if (command.subType === ParameterType.executeSubcommand) {
    builder.AddWord(first, SemanticTokensEnum.keyword, SemanticModifiersEnum.declaration);
  } else {
    builder.AddWord(first, SemanticTokensEnum.class);
  }

  const matches = command.getBestMatch(edu);
  let match;

  if (matches.length == 0) return;
  match = matches[0];

  let max = command.parameters.length;
  if (match.parameters.length < max) max = match.parameters.length;

  for (let I = 1; I < max; I++) {
    const data = match.parameters[I];
    const word = command.parameters[I];

    switch (data.type) {
      case ParameterType.executeSubcommand:
      case ParameterType.command:
        let sub = command.getSubCommand(edu);
        if (sub) {
          CreateTokens(sub, builder);
        }
        return;

      case ParameterType.boolean:
        builder.AddWord(word, SemanticTokensEnum.keyword);
        break;

      //Values
      case ParameterType.block:
      case ParameterType.entity:
      case ParameterType.item:
      case ParameterType.particle:
      case ParameterType.sound:
      case ParameterType.tickingarea:
      case ParameterType.structure:
        CreateNamespaced(word, builder);
        break;

      case ParameterType.coordinate:
      case ParameterType.float:
      case ParameterType.integer:
      case ParameterType.xp:
        CreateRangeTokensWord(word, builder);

        break;

      case ParameterType.keyword:
        builder.AddWord(word, SemanticTokensEnum.method, SemanticModifiersEnum.defaultLibrary);
        break;

      case ParameterType.function:
      case ParameterType.string:
        builder.AddWord(word, SemanticTokensEnum.string);
        break;

      case ParameterType.objective:
        builder.AddWord(word, SemanticTokensEnum.variable);
        break;

      case ParameterType.tag:
        builder.AddWord(word, SemanticTokensEnum.regexp, SemanticModifiersEnum.readonly);
        break;

      case ParameterType.operation:
        builder.AddWord(word, SemanticTokensEnum.operator);
        break;

      //Modes
      case ParameterType.cameraShakeType:
      case ParameterType.cloneMode:
      case ParameterType.difficulty:
      case ParameterType.effect:
      case ParameterType.event:
      case ParameterType.fillMode:
      case ParameterType.gamemode:
      case ParameterType.locateFeature:
      case ParameterType.maskMode:
      case ParameterType.mirror:
      case ParameterType.musicRepeatMode:
      case ParameterType.replaceMode:
      case ParameterType.rideRules:
      case ParameterType.rotation:
      case ParameterType.saveMode:
      case ParameterType.slotType:
      case ParameterType.slotID:
      case ParameterType.structureAnimationMode:
      case ParameterType.teleportRules:
      case ParameterType.oldBlockMode:
      case ParameterType.time:
        builder.AddWord(word, SemanticTokensEnum.enumMember);
        break;

      //json
      case ParameterType.blockStates:
      case ParameterType.jsonItem:
      case ParameterType.jsonRawText:
        break;

      //
      case ParameterType.selector:
        CreateSelectorTokens(word, builder);
        break;

      default:
        break;
    }
  }
}
