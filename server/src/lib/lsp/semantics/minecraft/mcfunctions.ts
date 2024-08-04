import { Command, ParameterType } from "bc-minecraft-bedrock-command";
import { CreateNamespaced, CreateRangeTokensWord } from "../functions";
import { CreateSelectorTokens } from "./selectors";
import { IsEducationEnabled } from "../../../project/attributes";
import { McfunctionSemanticTokensBuilder } from "../builders/mcfunction";
import { Position, Range, SemanticTokens } from "vscode-languageserver";
import { SemanticModifiersEnum, SemanticTokensEnum } from "../constants";
import { TextDocument } from "../../documents/text-document";

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

  const Matches = command.getBestMatch(edu);
  let Match;

  if (Matches.length == 0) return;

  Match = Matches[0];

  let Max = command.parameters.length;
  if (Match.parameters.length < Max) Max = Match.parameters.length;

  for (let I = 1; I < Max; I++) {
    const Data = Match.parameters[I];
    const Word = command.parameters[I];

    switch (Data.type) {
      case ParameterType.executeSubcommand:
      case ParameterType.command:
        let Sub = command.getSubCommand(edu);
        if (Sub) {
          CreateTokens(Sub, builder);
        }
        return;

      case ParameterType.boolean:
        builder.AddWord(Word, SemanticTokensEnum.keyword);
        break;

      //Values
      case ParameterType.block:
      case ParameterType.entity:
      case ParameterType.item:
      case ParameterType.particle:
      case ParameterType.sound:
      case ParameterType.tickingarea:
      case ParameterType.structure:
        CreateNamespaced(Word, builder);
        break;

      case ParameterType.coordinate:
      case ParameterType.float:
      case ParameterType.integer:
      case ParameterType.xp:
        CreateRangeTokensWord(Word, builder);

        break;

      case ParameterType.keyword:
        builder.AddWord(Word, SemanticTokensEnum.method, SemanticModifiersEnum.defaultLibrary);
        break;

      case ParameterType.function:
      case ParameterType.string:
        builder.AddWord(Word, SemanticTokensEnum.string);
        break;

      case ParameterType.objective:
        builder.AddWord(Word, SemanticTokensEnum.variable);
        break;

      case ParameterType.tag:
        builder.AddWord(Word, SemanticTokensEnum.regexp, SemanticModifiersEnum.readonly);
        break;

      case ParameterType.operation:
        builder.AddWord(Word, SemanticTokensEnum.operator);
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
        builder.AddWord(Word, SemanticTokensEnum.enumMember);
        break;

      //json
      case ParameterType.blockStates:
      case ParameterType.jsonItem:
      case ParameterType.jsonRawText:
        break;

      //
      case ParameterType.selector:
        CreateSelectorTokens(Word, builder);
        break;

      default:
        break;
    }
  }
}
