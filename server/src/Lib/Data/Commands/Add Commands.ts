import { MarkupKind } from "vscode-languageserver";
import { Manager } from "../../Manager/Manager";
import { MCCommand } from "../../Types/Commands/Command/include";
import { ParameterOptions, MCCommandParameterType, MCCommandParameter } from "../../Types/Commands/Parameter/include";
import * as vanilla from "./vanilla.json";
import * as edu from "./edu.json";

interface Command {
  parameters: {
    Text: string;
    Type: string;
    Required: boolean;
    Options?: ParameterOptions | undefined;
  }[];
  name: string;
  documentation: {
    value: string;
    kind?: string;
  };
}

export function AddCommands(): void {
  vanilla.commands.forEach((com) => {
    const Command = Convert(com);
    Manager.Data.Vanilla.Commands.add(Command);
  });

  edu.commands.forEach((com) => {
    const Command = Convert(com);
    Command.documentation.value = "**[EDU]** " + Command.documentation.value;
    Manager.Data.Edu.Commands.add(Command);
  });
}

function Convert(com: Command): MCCommand {
  const Command = new MCCommand();
  let kind: MarkupKind = MarkupKind.Markdown;

  if (com.documentation.kind === MarkupKind.PlainText) kind = MarkupKind.PlainText;

  Command.documentation = { value: com.documentation.value, kind: kind };
  Command.name = com.name;

  com.parameters.forEach((par) => {
    let type = par.Type as keyof typeof MCCommandParameterType;
    let Par = new MCCommandParameter(par.Text, MCCommandParameterType[type], par.Required);
    Command.parameters.push(Par);

    if (par.Options) {
      Par.Options = par.Options;
    } else {
      Par.Options = undefined;
    }
  });

  return Command;
}
