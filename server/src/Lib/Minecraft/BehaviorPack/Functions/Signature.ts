import { Command } from "bc-minecraft-bedrock-command";
import { SignatureHelp, SignatureInformation, ParameterInformation } from "vscode-languageserver";
import { Position } from "vscode-languageserver-textdocument";
import { IsEducationEnabled } from "../../../Project/include";
import { TextDocument } from "../../../Types/Document/TextDocument";

//TODO Refactor for the new ProjectData?

export function ProvideMcfunctionSignature(doc: TextDocument, pos: Position): SignatureHelp | undefined {
  const Line = doc.getLine(pos.line);
  return ProvideMcfunctionCommandSignature(Line, doc.offsetAt({ character: 0, line: pos.line }), doc.offsetAt(pos), doc);
}

export function ProvideMcfunctionCommandSignature(Line: string, StartOffset: number, cursorOffset: number, doc: TextDocument): SignatureHelp | undefined {
  let command: Command = Command.parse(Line, StartOffset);

  if (command.isEmpty()) return undefined;

  const edu = IsEducationEnabled(doc);
  const SubCommand = command.isInSubCommand(cursorOffset, edu);

  if (SubCommand != undefined) {
    command = SubCommand;
  }

  const Matches = command.getCommandData();

  const Out: SignatureHelp = {
    signatures: ConverToSignatures(Matches),
    activeParameter: command.CursorParamater,
    activeSignature: 0,
  };

  return Out;
}

function ConverToSignatures(Commands: CommandInfo[]): SignatureInformation[] {
  const Out: SignatureInformation[] = [];

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

  const parameters = command.parameters;
  for (let I = 0; I < parameters.length; I++) {
    const parameter = parameters[I];
    let p: ParameterInformation;

    if (parameter.Required) {
      if (parameter.Type === ParameterType.keyword) {
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

function CreateParameter(label: string, kind: ParameterType): ParameterInformation {
  switch (kind) {
    case ParameterType.jsonRawText:
      return RawText.provideParameterInformation();
  }

  const documentation = label;
  const Temp: ParameterInformation = { label: label, documentation: { kind: "markdown", value: documentation } };

  return Temp;
}
