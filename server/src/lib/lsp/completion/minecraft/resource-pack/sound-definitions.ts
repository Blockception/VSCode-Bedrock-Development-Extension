import { SimpleContext } from "../../../../util";
import { CompletionBuilder } from "../../builder/builder";
import { provideSoundFileCompletion } from "./sounds";
import { JsonPathCompletion } from "../../builder";

export function provideJsonCompletion(context: SimpleContext<CompletionBuilder>): void {
  return jsonSoundDefinitionsCompletion.onCompletion(context);
}

const jsonSoundDefinitionsCompletion = new JsonPathCompletion({
  match: /\/sounds\/(\d+)/,
  onCompletion: provideSoundFileCompletion,
});
