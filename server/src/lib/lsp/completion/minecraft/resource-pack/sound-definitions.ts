
import { CompletionBuilder } from "../../builder/builder";
import { provideSoundFileCompletion } from "./sounds";
import { JsonPathCompletion } from "../../builder";
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return jsonSoundDefinitionsCompletion.onCompletion(context);
}

const jsonSoundDefinitionsCompletion = new JsonPathCompletion({
  match: /\/sounds\/(\d+)/,
  onCompletion: provideSoundFileCompletion,
});
