import { JsonCompletionContext } from "../../Completion/include";
import { Sound } from "../General/include";
import { Textures } from "./include";

export function ProvideCompletion(context: JsonCompletionContext) {
  //Prepare data to be fixed for json
  const data = context.currentText;

  if (data.startsWith("textures/")) Textures.ProvideCompletion(context);
  if (data.startsWith("sounds/")) Sound.ProvideCompletion(context);
}
