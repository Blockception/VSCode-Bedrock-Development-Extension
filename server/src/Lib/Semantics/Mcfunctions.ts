import { Position, Range, SemanticTokens } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getLine } from "../Code/include";
import { CommandIntr, GetSubCommand } from "../Types/Commands/Interpertation/include";
import { MCCommandParameterType } from "../Types/Commands/Parameter/include";
import { McfunctionSemanticTokensBuilder } from "./Builders/McfunctionSemanticTokensBuilder";
import { CreateRangeTokensWord } from "./Functions";
import { CreateSelectorTokens } from "./include";
import { SemanticModifiersEnum, SemanticTokensEnum } from "./Legend";

export function ProvideMcfunctionSemanticTokens(doc: TextDocument, range?: Range | undefined): SemanticTokens {
  let Builder = new McfunctionSemanticTokensBuilder(doc);
  let startindex = 0;
  let endindex = doc.lineCount;

  if (range) {
    startindex = range.start.line;
    endindex = range.end.line;
  }

  for (let I = startindex; I < endindex; I++) {
    let line = getLine(doc, I);

    let CommentIndex = line.indexOf("#");

    if (CommentIndex >= 0) {
      Builder.AddAt(I, CommentIndex, line.length - CommentIndex, SemanticTokensEnum.comment);
    }

    let P = Position.create(I, 0);
    let Command = CommandIntr.parse(line, P, Builder.doc.uri, P);
    CreateTokens(Command, Builder);
  }

  return Builder.Build();
}

export function McfunctionLineTokens(line: string, cursor: number, offset: number, Builder: McfunctionSemanticTokensBuilder): void {
  if (line.startsWith("/")) {
    line = line.substring(1, line.length);
    offset++;
  }

  let Command = CommandIntr.parse(line, Builder.PositionAt(cursor), Builder.doc.uri, Builder.PositionAt(offset));
  CreateTokens(Command, Builder);
}

function CreateTokens(Command: CommandIntr, Builder: McfunctionSemanticTokensBuilder): void {
  if (Command.Parameters.length == 0) return;

  let First = Command.Parameters[0];
  Builder.AddWord(First, SemanticTokensEnum.class);
  let Matches = Command.GetCommandData();
  let Match;

  if (Matches.length == 0) return;

  Match = Matches[0];

  let Max = Command.Parameters.length;
  if (Match.Command.parameters.length < Max) Max = Match.Command.parameters.length;

  for (let I = 1; I < Max; I++) {
    let Data = Match.Command.parameters[I];
    let Word = Command.Parameters[I];

    switch (Data.Type) {
      case MCCommandParameterType.command:
        let Sub = GetSubCommand(Command);
        if (Sub) {
          CreateTokens(Sub, Builder);
        }
        return;

      case MCCommandParameterType.boolean:
        Builder.AddWord(Word, SemanticTokensEnum.keyword);
        break;

      //Values
      case MCCommandParameterType.block:
      case MCCommandParameterType.entity:
      case MCCommandParameterType.item:
      case MCCommandParameterType.particle:
      case MCCommandParameterType.sound:
      case MCCommandParameterType.tickingarea:
        let Index = Word.text.indexOf(":");

        if (Index >= 0) {
          let Line = Word.location.range.start.line;
          let char = Word.location.range.start.character;

          Builder.AddAt(Line, char, Index, SemanticTokensEnum.namespace, SemanticModifiersEnum.static);
          Builder.AddAt(Line, char + Index + 1, Word.text.length - (Index + 1), SemanticTokensEnum.method, SemanticModifiersEnum.readonly);
        } else {
          Builder.AddWord(Word, SemanticTokensEnum.method, SemanticModifiersEnum.readonly);
        }

        break;

      case MCCommandParameterType.coordinate:
      case MCCommandParameterType.float:
      case MCCommandParameterType.integer:
      case MCCommandParameterType.xp:
        CreateRangeTokensWord(Word, Builder);

        break;

      case MCCommandParameterType.keyword:
        Builder.AddWord(Word, SemanticTokensEnum.method, SemanticModifiersEnum.defaultLibrary);
        break;

      case MCCommandParameterType.function:
      case MCCommandParameterType.string:
        Builder.AddWord(Word, SemanticTokensEnum.string);
        break;

      case MCCommandParameterType.objective:
        Builder.AddWord(Word, SemanticTokensEnum.variable);
        break;

      case MCCommandParameterType.tag:
        Builder.AddWord(Word, SemanticTokensEnum.regexp, SemanticModifiersEnum.readonly);
        break;

      case MCCommandParameterType.operation:
        Builder.AddWord(Word, SemanticTokensEnum.operator);
        break;

      //Modes
      case MCCommandParameterType.cameraShakeType:
      case MCCommandParameterType.cloneMode:
      case MCCommandParameterType.difficulty:
      case MCCommandParameterType.effect:
      case MCCommandParameterType.event:
      case MCCommandParameterType.fillMode:
      case MCCommandParameterType.gamemode:
      case MCCommandParameterType.locateFeature:
      case MCCommandParameterType.maskMode:
      case MCCommandParameterType.mirror:
      case MCCommandParameterType.musicRepeatMode:
      case MCCommandParameterType.replaceMode:
      case MCCommandParameterType.rideRules:
      case MCCommandParameterType.rotation:
      case MCCommandParameterType.saveMode:
      case MCCommandParameterType.slotType:
      case MCCommandParameterType.slotID:
      case MCCommandParameterType.structureAnimationMode:
      case MCCommandParameterType.teleportRules:
      case MCCommandParameterType.oldBlockMode:
        Builder.AddWord(Word, SemanticTokensEnum.enumMember);
        break;

      //json
      case MCCommandParameterType.blockStates:
      case MCCommandParameterType.jsonItem:
      case MCCommandParameterType.jsonRawText:
        break;

      //
      case MCCommandParameterType.selector:
        CreateSelectorTokens(Word, Builder);
        break;

      default:
        break;
    }
  }
}
