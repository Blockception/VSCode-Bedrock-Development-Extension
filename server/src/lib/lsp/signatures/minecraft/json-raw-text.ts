import { ParameterInformation } from "vscode-languageserver";

export function provideParameterInformation(): ParameterInformation {
  return {
    label: "Json Raw Text",
    documentation: {
      kind: "markdown",
      value: "The raw text components",
    },
  };
}
