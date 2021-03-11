/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { CompletionItemKind } from "vscode-languageserver";
import { CompletionBuilder } from "../../../../completion/Builder";
import {
  cRawTextComponent,
  cRawTextExample,
  cScoreComponent,
  cSelectorComponent,
  cTextComponent,
  cTranslationComponent,
  cTranslationWith,
  cTranslationWithComplex,
} from "./Constants";

export function ProvideCompletion(receiver: CompletionBuilder): void {
  receiver.Add("Json Raw Text", cRawTextComponent, CompletionItemKind.Snippet, cRawTextComponent);
  receiver.Add("Json Raw Text example", cRawTextExample, CompletionItemKind.Snippet, cRawTextExample);
  receiver.Add("Translation component", cTranslationComponent, CompletionItemKind.Snippet, cTranslationComponent);
  receiver.Add("Translation component, with", cTranslationWith, CompletionItemKind.Snippet, cTranslationWith);
  receiver.Add("Translation component, with complex", cTranslationWithComplex, CompletionItemKind.Snippet, cTranslationWithComplex);
  receiver.Add("Text component", cTextComponent, CompletionItemKind.Snippet, cTextComponent);
  receiver.Add("Score component", cScoreComponent, CompletionItemKind.Snippet, cScoreComponent);
  receiver.Add("Selector component", cSelectorComponent, CompletionItemKind.Snippet, cSelectorComponent);
}
