import { JsonCompletionContext } from "../../Completion/Context";
import * as Sound from "../General/Sound/Completion";
import * as Textures from "./Textures/Completion";

export function provideCompletion(context: JsonCompletionContext) {
  //Prepare data to be fixed for json
  const data = context.currentText;

  if (data.startsWith("textures/")) Textures.provideCompletion(context);
  if (data.startsWith("sounds/")) Sound.provideCompletion(context);
}
