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
export interface TextComponent {
  text: string;
}

export namespace TextComponent {
  export function is(value: any): value is TextComponent {
    if (value && value.text) {
      return true;
    }

    return false;
  }
}

export interface TranslateComponent {
  translate: string;
  with: string[] | RawText | undefined;
}

export namespace TranslateComponent {
  export function is(value: any): value is TranslateComponent {
    if (value && value.translate) {
      return true;
    }

    return false;
  }
}

export interface SelectorComponent {
  selector: string;
}

export namespace SelectorComponent {
  export function is(value: any): value is SelectorComponent {
    if (value && value.selector) {
      return true;
    }

    return false;
  }
}

export interface ScoreComponent {
  score: {
    name: string,
    objective: string
  };
}

export namespace ScoreComponent {
  export function is(value: any): value is ScoreComponent {
    if (value && value.score && value.score.name && value.score.objective) {
      return true;
    }

    return false;
  }
}


export type RawTextComponent = TextComponent | TranslateComponent | SelectorComponent | ScoreComponent;

export interface RawText {
  rawtext: RawTextComponent[];
}

export namespace RawText {
  export function is(value: any): value is RawText {
    if (value && value.rawtext) {
      return true;
    }

    return false;
  }
}
