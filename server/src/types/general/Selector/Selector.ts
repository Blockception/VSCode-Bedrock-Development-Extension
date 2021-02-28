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
import { LocationWord, RangedWord } from "bc-vscode-words";
import { Range } from "vscode-languageserver";

export class Selector {
  public Range: Range;
  public Type: String;
  public Parameters: IParameter[];

  constructor(Type: string, Range: Range) {
    this.Type = Type;
    this.Range = Range;
    this.Parameters = [];
  }

  contains(parameter: string): boolean {
    for (let index = 0; index < this.Parameters.length; index++) {
      const element = this.Parameters[index];
      if (element.Name.text === parameter) return true;
    }

    return false;
  }

  count(parameter: string): number {
    let Out = 0;
    for (let index = 0; index < this.Parameters.length; index++) {
      const element = this.Parameters[index];
      if (element.Name.text === parameter) Out++;
    }

    return Out;
  }

  get(parameter: string): IParameter[] | IParameter {
    let Out = this.Parameters.filter((x) => x.Name.text === parameter);

    if (Out.length == 1) return Out[0];

    return Out;
  }
}

export namespace Selector {
  export const AllPlayersType = "a";
  export const AllEntitiesType = "e";
  export const NearestPlayerType = "p";
  export const ExecutingEntityType = "s";
  export const RandomType = "r";

  export function Parse(text: LocationWord): Selector {
    let Out = new Selector(text.text.substring(1, 2), text.location.range);

    //remove prefix
    let data = text.text.substring(2);

    if (data.startsWith("[") && data.endsWith("]")) {
      var Parameters = ParseParameters(data.substring(1, data.length - 1), text.location.range.start.character + 3, text.location.range.start.line);

      Out.Parameters = Parameters;
    }

    return Out;
  }

  export function ParseParameters(text: string, startindex: number, line: number): IParameter[] {
    let Out: IParameter[] = [];

    let start: number = 0;
    let level: number = 0;

    for (let index = 0; index < text.length; index++) {
      const char = text[index];

      switch (char) {
        case "{":
          level++;
          break;
        case "}":
          level--;
          break;

        case ",":
          if (level == 0) {
            let P = IParameter.Parse(text.substring(start, index), startindex + start, line);
            start = index + 1;

            Out.push(P);
          }

        default:
          continue;
      }
    }

    if (start < text.length) {
      let P = IParameter.Parse(text.substring(start, text.length), start + startindex, line);
      Out.push(P);
    }

    return Out;
  }
}

export interface IParameter {
  Name: RangedWord;
  Value: RangedWord;
}

export namespace IParameter {
  export function is(value: any): value is IParameter {
    if (value) {
      if (value.Name && value.Value && value.Range) {
        if (Range.is(value.Range)) {
          return true;
        }
      }
    }

    return false;
  }

  export function Parse(text: string, startIndex: number, Line: number): IParameter | IScoreParameter {
    let Index = text.indexOf("=");

    if (Index < 0) throw new Error("index cannot be lower then 0");

    let Name = new RangedWord(text.substring(0, Index).trim(), Range.create(Line, startIndex, Line, startIndex + Index));
    Index = Index + 1;
    let Value = new RangedWord(text.substring(Index, text.length), Range.create(Line, Index + startIndex, Line, text.length + startIndex));

    if (Name.text === "scores") {
      let Scores: IParameter[];

      if (Value.text.startsWith("{") && Value.text.endsWith("}") && Value.text.includes("=")) {
        Value.text = Value.text.substring(1, Value.text.length - 1);
        Scores = Selector.ParseParameters(Value.text, 8 + startIndex, Line);
      } else {
        Scores = [];
      }

      let Out: IScoreParameter = {
        Name: Name,
        Value: Value,
        Scores: Scores,
      };

      return Out;
    } else {
      let Out: IParameter = {
        Name: Name,
        Value: Value,
      };

      return Out;
    }
  }
}

export interface IScoreParameter extends IParameter {
  Scores: IParameter[];
}

export namespace IScoreParameter {
  export function is(value: any): value is IScoreParameter {
    if (value) {
      if (value.Name && value.Value && value.Range && value.Scores) {
        if (Range.is(value.Range) && Array.isArray(value.Scores)) {
          return true;
        }
      }
    }

    return false;
  }
}
