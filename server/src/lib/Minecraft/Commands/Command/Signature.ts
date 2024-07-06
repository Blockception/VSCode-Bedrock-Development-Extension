import { Command, CommandInfo, ParameterInfo, ParameterType } from "bc-minecraft-bedrock-command";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { ParameterInformation, SignatureHelp, SignatureInformation } from "vscode-languageserver";
import { SignatureCarrier } from "../../../Signatures/Carrier";
import { TextDocument } from "../../../Types/Document/TextDocument";
import * as RawText from "../../Json/RawText/Signature";

/**
 *
 * @param Line
 * @param StartOffset
 * @param cursorOffset
 * @param doc
 * @returns
 */
export function provideSignature(
  Line: string,
  StartOffset: number,
  cursorOffset: number,
  doc: TextDocument
): SignatureHelp | undefined {
  let command: Command = Command.parse(Line, StartOffset);

  if (command.isEmpty()) return undefined;

  const edu = IsEducationEnabled(doc);
  let SubCommand = command.isInSubCommand(cursorOffset, edu);

  while (SubCommand) {
    if (SubCommand) {
      command = SubCommand;
    }

    SubCommand = command.isInSubCommand(cursorOffset, edu);
  }

  if (SubCommand != undefined) {
    command = SubCommand;
  }

  const Matches = command.getBestMatch();

  const Out: SignatureHelp = {
    signatures: ConvertToSignatures(Matches),
    activeParameter: command.findCursorIndex(cursorOffset),
    activeSignature: 0,
  };

  return Out;
}

function ConvertToSignatures(Commands: CommandInfo[]): SignatureInformation[] {
  return Commands.map((item) => SignatureCarrier.get(item, ConvertToSignature));
}

//Converts the given MCCommand into a signature
function ConvertToSignature(command: CommandInfo): SignatureInformation {
  let Sign: SignatureInformation = {
    label: "",
    documentation: command.documentation,
    parameters: [],
  };

  const parameters = command.parameters;
  for (let I = 0; I < parameters.length; I++) {
    const parameter = parameters[I];
    let t = parameter.text;

    if (parameter.type !== ParameterType.keyword) {
      if (parameter.required) {
        t = `<${t}>`;
      } else {
        t = `[${t}]`;
      }
    }

    const p = createParameter(t, parameter);
    Sign.label += t + " ";
    Sign.parameters?.push(p);
  }

  Sign.label = Sign.label.trim();

  return Sign;
}

function createParameter(label: string, p: ParameterInfo): ParameterInformation {
  switch (p.type) {
    case ParameterType.jsonRawText:
      return RawText.provideParameterInformation();
  }

  let documentation = label;

  if (p.options) {
    documentation += "\n\n**Options**:\n";
    if (typeof p.options.allowFakePlayers === "boolean") {
      documentation += `\nAllow fake players: ${p.options.allowFakePlayers}`;
    }
    if (typeof p.options.maximum === "number") {
      documentation += `\nMaximum: ${p.options.maximum}`;
    }
    if (typeof p.options.minimum === "number") {
      documentation += `\nMinimum: ${p.options.minimum}`;
    }
    if (typeof p.options.playerOnly === "boolean") {
      documentation += `\nPlayer only: ${p.options.playerOnly}`;
    }
    if (typeof p.options.wildcard === "boolean") {
      documentation += `\nWildcard: ${p.options.wildcard}`;
    }
    if (p.options.acceptedValues) {
      documentation += `Accepted values: \n- ${p.options.acceptedValues.join("\n- ")}`;
    }
  }

  documentation += "\n---";

  const Temp: ParameterInformation = {
    label: label,
    documentation: { kind: "markdown", value: documentation },
  };

  return Temp;
}
