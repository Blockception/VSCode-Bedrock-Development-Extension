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
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { LocationWord } from "../../../code/words/include";
import { Database } from "../../../database/include";
import { NewError2, NewWarning } from "../../../diagnostics/include";
import { IsRangeInteger, IsRangeNumber } from "../../../process/Range";
import { ValidationData } from "../../../validation/include";
import { MCCommandParameter } from "../../commands/Parameter/include";
import { IsFloat } from "../Float/include";
import { IsInteger } from "../Integer/include";
import { IScoreParameter, Selector } from "./Selector";

/**
 * 
 * @param pattern 
 * @param data 
 * @param receiver 
 * @param validation 
 */
export function ProvideDiagnostics(pattern: MCCommandParameter, data: LocationWord, receiver: Diagnostic[], validation: ValidationData): void {
  let text = data.text;

  if (pattern.Options?.acceptedValues?.includes(data.text)) return;

  if (text.startsWith("@")) {
    let selector = Selector.Parse(data);
    DiagnoseSelector(selector, receiver, pattern.Options?.playerOnly ?? false, validation);
  } else {
    if (pattern.Options?.allowFakePlayers) {
      DiagnoseFakePlayer(data, receiver);
    } else {
      NewError2(receiver, data.range, "Fake players for this parameter are not allowed");
    }
  }
}

/**
 * 
 * @param data 
 * @param receiver 
 */
function DiagnoseFakePlayer(data: LocationWord, receiver: Diagnostic[]): void {
  let fakePlayer = data.text;

  //Has fake player
  if (Database.Data.General.FakeEntities.HasID(fakePlayer)) {
    return;
  }

  receiver.push({
    message: 'Fake player: "' + fakePlayer + '" has not been assigned a value.',
    range: data.range,
    severity: DiagnosticSeverity.Error,
  });
}

/**
 * 
 * @param selector 
 * @param receiver 
 * @param onlyPlayer 
 * @param validation 
 */
function DiagnoseSelector(selector: Selector, receiver: Diagnostic[], onlyPlayer: boolean, validation: ValidationData): void {
  var HasType = selector.contains("type");

  if (onlyPlayer) {
    if (HasType) {
      NewError2(receiver, selector.Range, "Selector has type definitions but this parameter should only be for players");
    } else {
      if (selector.Type == Selector.AllEntitiesType) {
        NewError2(receiver, selector.Range, "Selector is for all entities but this parameter should only be for players");
      }
    }
  }

  if (IsBox(selector) && IsSphere(selector)) NewError2(receiver, selector.Range, "Selector has both box and sphere definitions");

  Coordinate("x", selector, receiver);
  Coordinate("y", selector, receiver);
  Coordinate("z", selector, receiver);
  Coordinate("dx", selector, receiver);
  Coordinate("dy", selector, receiver);
  Coordinate("dz", selector, receiver);
  Coordinate("rx", selector, receiver);
  Coordinate("rxm", selector, receiver);
  Coordinate("ry", selector, receiver);
  Coordinate("rym", selector, receiver);

  Number("c", selector, receiver);

  Range("l", selector, receiver);
  Range("lm", selector, receiver);

  //Family attribute is allowed multiple tests
  OnlyPositiveOrMultipleNegatives("m", selector, receiver);
  OnlyPositiveOrMultipleNegatives("name", selector, receiver);
  OnlyPositiveOrMultipleNegatives("type", selector, receiver);

  AllPositivesAndNegatives("family", selector, receiver);
  AllPositivesAndNegatives("tag", selector, receiver);
  ScoresCheck(selector, receiver, validation);

  for (let index = 0; index < selector.Parameters.length; index++) {
    const element = selector.Parameters[index];

    switch (element.Name) {
      case "c":
      case "dx":
      case "dy":
      case "dz":
      case "family":
      case "lm":
      case "l":
      case "m":
      case "name":
      case "rm":
      case "r":
      case "scores":
      case "type":
      case "tag":
      case "x":
      case "y":
      case "z":
      case "rx":
      case "rxm":
      case "ry":
      case "rym":
        continue;

      default:
        NewError2(receiver, element.Range, "Illegal selector attribute " + element.Name);
    }
  }
}

/**
 * 
 * @param name 
 * @param selector 
 * @param receiver 
 */
function NoDuplicates(name: string, selector: Selector, receiver: Diagnostic[]): void {
  var Count = selector.count(name);

  if (Count > 1) {
    NewError2(receiver, selector.Range, 'Parameter: "' + name + '" can only be used once in a selector');
  }
}

/**
 * 
 * @param name 
 * @param selector 
 * @param receiver 
 */
function OnlyPositiveOrMultipleNegatives(name: string, selector: Selector, receiver: Diagnostic[]): void {
  var Parameters = selector.get(name);

  if (Array.isArray(Parameters)) {
    if (Parameters.length <= 1) return;

    var Negatives = 0;

    for (let index = 0; index < Parameters.length; index++) {
      const element = Parameters[index];

      if (element.Value.startsWith("!")) Negatives++;
    }

    if (Negatives != Parameters.length) {
      NewError2(receiver, selector.Range, 'Parameter: "' + name + '" can only have a positive test or multiple negatives test');
    }
  }
}

/**
 * 
 * @param name 
 * @param selector 
 * @param receiver 
 */
function OnlyPositiveAndMultipleNegatives(name: string, selector: Selector, receiver: Diagnostic[]): void {
  var Parameters = selector.get(name);

  if (Array.isArray(Parameters)) {
    if (Parameters.length <= 1) return;

    var Negatives = 0;

    for (let index = 0; index < Parameters.length; index++) {
      const element = Parameters[index];

      if (element.Value.startsWith("!")) Negatives++;
    }

    if (Negatives != Parameters.length - 1) {
      NewError2(receiver, selector.Range, 'Parameter: "' + name + '" can only have 1 positive test or/and multiple negatives test');
    }
  }
}

/**
 * 
 * @param name 
 * @param selector 
 * @param receiver 
 */
function AllPositivesAndNegatives(name: string, selector: Selector, receiver: Diagnostic[]): void {
  var Parameters = selector.get(name);

  if (Array.isArray(Parameters)) {
    if (Parameters.length <= 1) return;

    for (let I = 0; I < Parameters.length; I++) {
      const first = Parameters[I];

      for (let J = I + 1; J < Parameters.length; J++) {
        const second = Parameters[J];

        if (first.Value == second.Value) NewWarning(receiver, second.Range, 'duplicate test statement found for: "' + name + '"');
      }
    }
  }
}

/**
 * 
 * @param name 
 * @param selector 
 * @param receiver 
 */
function Coordinate(name: string, selector: Selector, receiver: Diagnostic[]): void {
  NoDuplicates(name, selector, receiver);

  var Parameter = selector.get(name);

  if (Array.isArray(Parameter)) {
    if (Parameter.length == 0) return;
    Parameter = Parameter[0];
  }

  let value = Parameter.Value;

  if (value.startsWith("^"))
    NewError2(receiver, Parameter.Range, 'Parameter: "' + name + '" cannot be a local coordinate, only relative or absolute');
}

/**
 * 
 * @param selector 
 */
function IsBox(selector: Selector): boolean {
  if (selector.contains("dx")) return true;
  if (selector.contains("dy")) return true;
  if (selector.contains("dz")) return true;

  return false;
}

/**
 * 
 * @param selector 
 */
function IsSphere(selector: Selector): boolean {
  if (selector.contains("r")) return true;
  if (selector.contains("rm")) return true;

  return false;
}

/**
 * 
 * @param name 
 * @param selector 
 * @param receiver 
 */
function Number(name: string, selector: Selector, receiver: Diagnostic[]) {
  NoDuplicates(name, selector, receiver);

  var Parameters = selector.get(name);

  if (Array.isArray(Parameters)) {
    if (Parameters.length == 0) return;
    Parameters = Parameters[0];
  }

  let Value = Parameters.Value;
  let NegativeTest = false;

  if (Value.startsWith("!")) {
    NegativeTest = true;
    Value = Value.substring(1);
  }

  if (!IsFloat(Value)) {
    NewError2(receiver, Parameters.Range, 'Parameter: "' + name + '" must be valid a number/float');
  }
}

/**
 * 
 * @param name 
 * @param selector 
 * @param receiver 
 */
function Range(name: string, selector: Selector, receiver: Diagnostic[]) {
  NoDuplicates(name, selector, receiver);

  var Parameters = selector.get(name);

  if (Array.isArray(Parameters)) {
    if (Parameters.length == 0) return;
    Parameters = Parameters[0];
  }

  let Value = Parameters.Value;
  let NegativeTest = false;

  if (Value.startsWith("!")) {
    NegativeTest = true;
    Value = Value.substring(1);
  }

  if (IsRangeNumber(Value)) {
    return;
  } else {
    if (!IsFloat(Value)) {
      NewError2(receiver, Parameters.Range, 'Parameter: "' + name + '" must be valid a number/float/range');
    }
  }
}

/**
 * 
 * @param selector 
 * @param receiver 
 * @param validation 
 */
function ScoresCheck(selector: Selector, receiver: Diagnostic[], validation: ValidationData): void {
  let Parameter = selector.get("scores");

  if (Array.isArray(Parameter)) {
    if (Parameter.length == 0) return;

    if (Parameter.length > 1) {
      NewError2(receiver, selector.Range, "Selector has multiple scores definitions, but can only have 1");
    }

    Parameter = Parameter[0];
  }

  if (!IScoreParameter.is(Parameter)) {
    return;
  }

  let Scores = Parameter.Scores;

  for (let index = 0; index < Scores.length; index++) {
    const Score = Scores[index];
    let Value = Score.Value;
    let NegativeTest = false;

    if (Value.startsWith("!")) {
      NegativeTest = true;
      Value = Value.substring(1);
    }

    if (!(IsRangeInteger(Value) || IsInteger(Value))) {
      NewError2(receiver, Score.Range, `Not a valid range or integer: ${Score.Name}=${Score.Value}`);
    }

    if (validation.objectives?.valid?.includes(Score.Name)) {
      continue;
    } else if (validation.objectives?.invalid?.includes(Score.Name)) {
      NewError2(receiver, Score.Range, `Score: ${Score.Name} has been marked as invalid`);
    } else {
      if (!Database.Data.General.Objectives.HasID(Score.Name)) {
        NewError2(receiver, Score.Range, `No valid definition of ${Score.Name} has been found.`);
      }
    }
  }
}
