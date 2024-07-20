import { SimpleContext } from '../../../../util';
import { CompletionBuilder, JsonPathCompletion } from '../../builder';

import * as Textures from './textures';

export function provideJsonCompletion(context: SimpleContext<CompletionBuilder>): void {
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