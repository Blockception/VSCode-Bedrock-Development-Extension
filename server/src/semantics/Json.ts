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
import { Range, TextDocument } from 'vscode-languageserver-textdocument';
import { SemanticTokenModifiers, SemanticTokens } from 'vscode-languageserver/node';
import { words } from '../code/include';
import { LocationWord } from '../code/words/include';
import { OffsetWord } from '../code/words/OffsetWord';
import { IsMolang } from '../molang/Functions';
import { CreateMolangTokens } from '../molang/Words';
import { IsFloat } from '../types/general/Float/include';
import { IsSelector } from '../types/general/Selector/include';
import { JsonSemanticTokensBuilder } from './builders/JsonSemanticTokensBuilder';
import { SemanticModifiers, SemanticModifiersEnum, SemanticTokensEnum } from './Legend';

export function ProvideJsonSemanticTokens(doc: TextDocument, range?: Range | undefined): SemanticTokens {
   let Builder = new JsonSemanticTokensBuilder(doc);
   let text = doc.getText(range);
   let offset = 0;

   if (range) {
      offset = doc.offsetAt(range.start);
   }
   else {
      offset = 0;
   }

   CreateTokens(text, offset, Builder);

   return Builder.Build();
}

/**
 * 
 * @param text 
 * @param offset 
 * @param Builder 
 */
function CreateTokens(text: string, offset: number, Builder: JsonSemanticTokensBuilder): void {
   let index = 0;
   let max = text.length;

   while (index >= 0) {
      let startindex = findNext(text, index);
      if (startindex < 0) return;

      let endindex = findNext(text, startindex);
      if (endindex < 0) return;

      startindex++;
      let property = text.substring(startindex, endindex);

      if (IsMolang(property)) {

         if (property.startsWith('/')) {

         }
         else {
            let Words = CreateMolangTokens(property, offset);
            ConvertWords(Words, Builder);
         }
      }
   }
}

function ConvertWords(Words: OffsetWord[], Builder: JsonSemanticTokensBuilder) {
   for (let I = 0; I < Words.length; I++) {
      let Word = Words[I];

      let text = Word.text;
      switch (text) {
         case 'Math':
         case 'math':
         case 'query':
         case 'variable':
            Builder.AddWord(Word, SemanticTokensEnum.class, SemanticModifiersEnum.static);
            break;

         case '==':
         case '!=':
         case '&&':
         case '>=':
         case '<=':
         case '>':
         case '!':
         case '<':
         case '?':
         case ':':
         case '+':
         case '-':
         case '/':
         case '*':
            Builder.AddWord(Word, SemanticTokensEnum.operator);
            break;

         default:
            if (IsFloat(text)) {
               Builder.AddWord(Word, SemanticTokensEnum.number);
            }
            else if (IsSelector(text, undefined)) {
               Builder.AddWord(Word, SemanticTokensEnum.variable);
            }
            else {
               Builder.AddWord(Word, SemanticTokensEnum.method);
            }
      }
   }
}


function findNext(text: string, startIndex: number): number {
   while (startIndex > -1) {
      let startindex = text.indexOf('"', startIndex);
      if (startindex < 0) break;

      if (text.charAt(startindex - 1) === '\\' && text.charAt(startindex - 2) !== '\\') {
         continue;
      }

      return startindex;
   }

   return -1;
}