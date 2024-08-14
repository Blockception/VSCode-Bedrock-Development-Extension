
import { Context } from '../../../context/context';
import { JsonPathCompletion } from "../../builder";
import { CompletionContext } from '../../context';
import { provideSoundFileCompletion } from "./sounds";

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return jsonSoundDefinitionsCompletion.onCompletion(context);
}

const jsonSoundDefinitionsCompletion = new JsonPathCompletion({
  match: /\/sounds\/(\d+)/,
  onCompletion: provideSoundFileCompletion,
});
