import { CompletionBuilder, JsonPathCompletion } from '../../builder';
import { CompletionContext } from '../../context';
import { Context } from '../../../context/context';

import * as Textures from './textures';

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return atlasJsonCompletion.onCompletion(context);
}

const atlasJsonCompletion = new JsonPathCompletion(
  {
    match: (path) => path.endsWith('flipbook_texture'),
    onCompletion: Textures.provideCompletion
  },
  {
    match: /\/textures\/(\d+)$/,
    onCompletion: Textures.provideCompletion
  }
);