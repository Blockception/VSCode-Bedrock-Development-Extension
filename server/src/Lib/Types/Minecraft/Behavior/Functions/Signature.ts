import { SignatureHelp, SignatureInformation, ParameterInformation } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { getLine } from "../../../../Code/include";
import { CommandInfo } from "../../../Commands/Info/include";
import { CommandIntr, IsInSubCommand } from "../../../Commands/Interpertation/include";
import { MCCommand } from "../../../Commands/Command/include";
import { MCCommandParameterType } from "../../../Commands/Parameter/include";
import { RawText } from "../../Json/include";
import { TextDocument } from "../../../Document/TextDocument";

export function ProvideMcfunctionSignature(doc: TextDocument, pos: Position): SignatureHelp | undefined {
  const Line = doc.getLine(pos.line);
  return ProvideMcfunctionCommandSignature(Line, { character: 0, line: pos.line }, pos, doc);
}

export function ProvideMcfunctionCommandSignature(Line: string, Start: Position, cursor: Position, doc: TextDocument): SignatureHelp | undefined {
  let command: CommandIntr = CommandIntr.parse(Line, cursor, doc.uri, Start);

  if (command.IsEmpty()) return undefined;

  let SubCommand = IsInSubCommand(command, cursor.character);

  if (SubCommand != undefined) {
    command = SubCommand;
  }

  let Matches = command.GetCommandData();

  let Out: SignatureHelp = {
    signatures: ConverToSignatures(Matches),
    activeParameter: command.CursorParamater,
    activeSignature: 0,
  };

  return Out;
}

function ConverToSignatures(Commands: CommandInfo[]): SignatureInformation[] {
  let Out: SignatureInformation[] = [];

  for (let I = 0; I < Commands.length; I++) {
    let Current = Commands[I];
    let Signature = Current.Signature;

    if (Signature == undefined) {
      Signature = ConverToSignature(Current.Command);
      Current.Signature = Signature;
    }

    Out.push(Signature);
  }

  return Out;
}

//Converts the given MCCommand into a signature
function ConverToSignature(Command: MCCommand): SignatureInformation {
  let Sign: SignatureInformation = {
    label: "",
    documentation: Command.documentation,
    parameters: [],
  };

  let parameters = Command.parameters;
  for (let I = 0; I < parameters.length; I++) {
    let parameter = parameters[I];
    let p: ParameterInformation;

    if (parameter.Required) {
      if (parameter.Type === MCCommandParameterType.keyword) {
        p = CreateParameter(parameter.Text, parameter.Type);
      } else {
        p = CreateParameter("<" + parameter.Text + ">", parameter.Type);
      }
    } else {
      p = CreateParameter("[" + parameter.Text + "]", parameter.Type);
    }

    Sign.label += p.label + " ";

    Sign.parameters?.push(p);
  }

  Sign.label = Sign.label.trim();

  return Sign;
}

function CreateParameter(label: string, kind: MCCommandParameterType): ParameterInformation {
  switch (kind) {
    case MCCommandParameterType.jsonRawText:
      return RawText.provideParameterInformation();
  }

  let documentation = label;
  let Temp: ParameterInformation = { label: label, documentation: { kind: "markdown", value: documentation } };

  return Temp;
}
