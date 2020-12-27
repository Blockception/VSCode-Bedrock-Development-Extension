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
import { Range } from "vscode-languageserver";
import { LocationWord } from "../../../code/words/include";

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
      if (element.Name == parameter) return true;
    }

    return false;
  }

  count(parameter: string): number {
    let Out = 0;
    for (let index = 0; index < this.Parameters.length; index++) {
      const element = this.Parameters[index];
      if (element.Name == parameter) Out++;
    }

    return Out;
  }

  get(parameter: string): IParameter[] | IParameter {
    let Out = this.Parameters.filter((x) => x.Name == parameter);

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
    let Out = new Selector(text.text.substring(1, 2), text.range);

    //remove prefix
    let data = text.text.substring(2);

    if (data.startsWith("[") && data.endsWith("]")) {
      var Parameters = ParseParameters(data.substring(1, data.length - 1), 3, text.range.start.line);

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
            let P = IParameter.Parse(text.substring(start, index), index + startindex, line);
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
  Range: Range;
  Name: string;
  Value: string;
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

    let Range: Range = { start: { character: startIndex, line: Line }, end: { character: startIndex + text.length, line: Line } };
    let Name = text.substring(0, Index);
    let Value = text.substring(Index + 1, text.length);

    if (Name == "scores") {
      Value = Value.substring(1, Value.length - 1);
      let Scores = Selector.ParseParameters(Value, Index + 2 + startIndex, Line);

      let Out: IScoreParameter = {
        Name: Name,
        Range: Range,
        Value: Value,
        Scores: Scores,
      };

      return Out;
    } else {
      let Out: IParameter = {
        Name: Name,
        Range: Range,
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
