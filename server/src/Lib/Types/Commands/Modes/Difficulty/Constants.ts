import { MarkupContent } from "vscode-languageserver";

export interface DifficultyDescription {
  readonly short: string;
  readonly long: string;
  readonly value: string;
  readonly documentation: MarkupContent;
}

export namespace Difficulty {
  //easy mode
  export const easy: DifficultyDescription = {
    value: "1",
    short: "e",
    long: "easy",
    documentation: { value: "Easy mode, mobs will attack in this mode. but at a minimum.", kind: "markdown" },
  };
  //normal mode
  export const normal: DifficultyDescription = {
    value: "2",
    short: "n",
    long: "normal",
    documentation: { value: "The default difficulty mode for minecraft, mobs will attack.", kind: "markdown" },
  };
  //hard mode
  export const hard: DifficultyDescription = {
    value: "3",
    short: "h",
    long: "hard",
    documentation: { value: "The most difficult mode for minecraft, mobs will attack somewhat harder.", kind: "markdown" },
  };
  //peacefull mode
  export const peacefull: DifficultyDescription = {
    value: "0",
    short: "p",
    long: "peacefull",
    documentation: { value: "The relaxed mode, no mobs with attacking behaviour can be spawned", kind: "markdown" },
  };
}
