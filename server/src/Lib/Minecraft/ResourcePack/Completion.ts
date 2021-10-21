import { JsonCompletionContext } from "../../Completion/Context";
import { Sound } from "../General/include";
import * as Textures from "./Textures/include";

export function ProvideCompletion(context: JsonCompletionContext) {
  //Prepare data to be fixed for json
  const data = context.currentText;

  if (data.startsWith("textures/")) Textures.ProvideCompletion(context);
  if (data.startsWith("sounds/")) Sound.ProvideCompletion(context);
}
