import { IWord } from "bc-vscode-words";
import { Manager } from "../../../Manager/include";

/**
 *
 * @param text
 * @param edu
 * @returns
 */
export function IsCommand(text: string | IWord, edu: boolean): boolean {
  if (typeof text !== "string") text = text.text;

  if (Manager.Data.Vanilla.Commands.has(text)) return true;
  if (edu && Manager.Data.Edu.Commands.has(text)) return true;

  return false;
}
