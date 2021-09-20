import { Command, ParameterType } from "bc-minecraft-bedrock-command";
import { CommandInfo } from "bc-minecraft-bedrock-command/lib/src/Lib/Data/CommandInfo";
import { ParameterInformation, SignatureHelp, SignatureInformation } from "vscode-languageserver";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { SignatureCarrier } from "../../../Signatures/Carrier";
import { TextDocument } from "../../../Types/Document/TextDocument";
import { RawText } from "../../Json/include";

export function ProvideSignature(Line: string, StartOffset: number, cursorOffset: number, doc: TextDocument): SignatureHelp | undefined {
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
    activeParameter: command.findCursorIndex(cursorOffset),
    activeSignature: 0,
  };

  return Out;
}

function ConverToSignatures(Commands: CommandInfo[]): SignatureInformation[] {
  return Commands.map((item) => SignatureCarrier.get(item, ConverToSignature));
}

//Converts the given MCCommand into a signature
function ConverToSignature(command: CommandInfo): SignatureInformation {
  let Sign: SignatureInformation = {
    label: "",
    documentation: command.documentation,
    parameters: [],
  };

  const parameters = command.parameters;
  for (let I = 0; I < parameters.length; I++) {
    const parameter = parameters[I];
    let p: ParameterInformation;

    if (parameter.required) {
      if (parameter.type === ParameterType.keyword) {
        p = CreateParameter(parameter.text, parameter.type);
      } else {
        p = CreateParameter("<" + parameter.text + ">", parameter.type);
      }
    } else {
      p = CreateParameter("[" + parameter.text + "]", parameter.type);
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
