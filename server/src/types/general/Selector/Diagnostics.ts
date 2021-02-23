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
import { Database } from "../../../database/include";
import { NewError2, NewWarning } from "../../../diagnostics/include";
import { IsRangeInteger, IsRangeNumber } from "../../../process/Range";
import { ValidationData } from "../../../validation/include";
import { MCCommandParameter } from "../../commands/parameter/include";
import { IsFloat } from "../Float/include";
import { IsInteger } from "../Integer/include";
import { IScoreParameter, Selector } from "./Selector";
import { DiagnosticsBuilder } from "../../../diagnostics/Builder";
import { DiagnosticSeverity } from "vscode-languageserver";
import { parameter } from "../../commands/include";

/**
 *
 * @param pattern
 * @param data
 * @param receiver
 * @param validation
 */
export function ProvideDiagnostics(pattern: MCCommandParameter, data: LocationWord, builder: DiagnosticsBuilder, validation: ValidationData): void {
  let text = data.text;

  if (pattern.Options?.acceptedValues?.includes(data.text)) return;

  if (text.startsWith("@")) {
    let selector = Selector.Parse(data);
    DiagnoseSelector(selector, builder, pattern.Options?.playerOnly ?? false, validation);
  } else {
    if (pattern.Options?.allowFakePlayers) {
      DiagnoseFakePlayer(data, builder);
    } else {
      builder.AddWord(data, "Fake players for this parameter are not allowed");
    }
  }
}

/**
 *
 * @param data
 * @param receiver
 */
function DiagnoseFakePlayer(data: LocationWord, builder: DiagnosticsBuilder): void {
  let fakePlayer = data.text;

  //Has fake player
  if (Database.Data.General.FakeEntities.HasID(fakePlayer)) {
    return;
  }

  builder.AddWord(data, 'Fake player: "' + fakePlayer + '" has not been assigned a value.');
}

/**
 *
 * @param selector
 * @param receiver
 * @param onlyPlayer
 * @param validation
 */
function DiagnoseSelector(selector: Selector, builder: DiagnosticsBuilder, onlyPlayer: boolean, validation: ValidationData): void {
  var HasType = selector.contains("type");

  if (onlyPlayer) {
    if (HasType) {
      builder.Add("Selector has type definitions but this parameter should only be for players", selector.Range);
    } else {
      if (selector.Type == Selector.AllEntitiesType) {
        builder.Add("Selector is for all entities but this parameter should only be for players", selector.Range);
      }
    }
  }

  if (IsBox(selector) && IsSphere(selector)) {
    builder.Add("Selector has both box and sphere definitions", selector.Range);
  }

  Coordinate("x", selector, builder);
  Coordinate("y", selector, builder);
  Coordinate("z", selector, builder);
  Coordinate("dx", selector, builder);
  Coordinate("dy", selector, builder);
  Coordinate("dz", selector, builder);
  Coordinate("rx", selector, builder);
  Coordinate("rxm", selector, builder);
  Coordinate("ry", selector, builder);
  Coordinate("rym", selector, builder);

  Number("c", selector, builder);

  Range("l", selector, builder);
  Range("lm", selector, builder);

  //Family attribute is allowed multiple tests
  OnlyPositiveOrMultipleNegatives("m", selector, builder);
  OnlyPositiveOrMultipleNegatives("name", selector, builder);
  OnlyPositiveOrMultipleNegatives("type", selector, builder);

  AllPositivesAndNegatives("family", selector, builder);
  AllPositivesAndNegatives("tag", selector, builder);
  ScoresCheck(selector, builder, validation);

  for (let index = 0; index < selector.Parameters.length; index++) {
    const element = selector.Parameters[index];

    switch (element.Name.text) {
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
        builder.AddWord(element.Name, "Illegal selector attribute " + element.Name.text);
    }
  }
}

/**
 *
 * @param name
 * @param selector
 * @param receiver
 */
function NoDuplicates(name: string, selector: Selector, builder: DiagnosticsBuilder): void {
  var Count = selector.count(name);

  if (Count > 1) {
    builder.Add('Parameter: "' + name + '" can only be used once in a selector', selector.Range);
  }
}

/**
 *
 * @param name
 * @param selector
 * @param receiver
 */
function OnlyPositiveOrMultipleNegatives(name: string, selector: Selector, builder: DiagnosticsBuilder): void {
  var Parameters = selector.get(name);

  if (Array.isArray(Parameters)) {
    if (Parameters.length <= 1) return;

    var Negatives = 0;

    for (let index = 0; index < Parameters.length; index++) {
      const element = Parameters[index];

      if (element.Value.text.startsWith("!")) Negatives++;
    }

    if (Negatives != Parameters.length) {
      builder.Add('Parameter: "' + name + '" can only have a positive test or multiple negatives test', selector.Range);
    }
  }
}

/**
 *
 * @param name
 * @param selector
 * @param receiver
 */
function OnlyPositiveAndMultipleNegatives(name: string, selector: Selector, builder: DiagnosticsBuilder): void {
  var Parameters = selector.get(name);

  if (Array.isArray(Parameters)) {
    if (Parameters.length <= 1) return;

    var Negatives = 0;

    for (let index = 0; index < Parameters.length; index++) {
      const element = Parameters[index];

      if (element.Value.text.startsWith("!")) Negatives++;
    }

    if (Negatives != Parameters.length - 1) {
      builder.Add('Parameter: "' + name + '" can only have 1 positive test or/and multiple negatives test', selector.Range);
    }
  }
}

/**
 *
 * @param name
 * @param selector
 * @param receiver
 */
function AllPositivesAndNegatives(name: string, selector: Selector, builder: DiagnosticsBuilder): void {
  var Parameters = selector.get(name);

  if (Array.isArray(Parameters)) {
    if (Parameters.length <= 1) return;

    for (let I = 0; I < Parameters.length; I++) {
      const first = Parameters[I];

      for (let J = I + 1; J < Parameters.length; J++) {
        const second = Parameters[J];

        if (first.Value == second.Value)
          builder.AddWord(second.Name, 'duplicate test statement found for: "' + name + '"', DiagnosticSeverity.Warning);
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
function Coordinate(name: string, selector: Selector, builder: DiagnosticsBuilder): void {
  NoDuplicates(name, selector, builder);

  var Parameter = selector.get(name);

  if (Array.isArray(Parameter)) {
    if (Parameter.length == 0) return;
    Parameter = Parameter[0];
  }

  let value = Parameter.Value;

  if (value.text.startsWith("^"))
    builder.AddWord(Parameter.Value, 'Parameter: "' + name + '" cannot be a local coordinate, only relative or absolute');
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
function Number(name: string, selector: Selector, builder: DiagnosticsBuilder) {
  NoDuplicates(name, selector, builder);

  var Parameters = selector.get(name);

  if (Array.isArray(Parameters)) {
    if (Parameters.length == 0) return;
    Parameters = Parameters[0];
  }

  let Value = Parameters.Value;
  let NegativeTest = false;

  if (Value.text.startsWith("!")) {
    NegativeTest = true;
    Value = new RangedWord(Value.text.substring(1), Value.range);
  }

  if (!IsFloat(Value.text)) {
    builder.AddWord(Value, 'Parameter: "' + name + '" must be valid a number/float');
  }
}

/**
 *
 * @param name
 * @param selector
 * @param receiver
 */
function Range(name: string, selector: Selector, builder: DiagnosticsBuilder) {
  NoDuplicates(name, selector, builder);

  var Parameters = selector.get(name);

  if (Array.isArray(Parameters)) {
    if (Parameters.length == 0) return;
    Parameters = Parameters[0];
  }

  let Value = Parameters.Value;
  let NegativeTest = false;

  if (Value.text.startsWith("!")) {
    NegativeTest = true;
    Value = new RangedWord(Value.text.substring(1), Value.range);
  }

  if (IsRangeNumber(Value.text)) {
    return;
  } else {
    if (!IsFloat(Value.text)) {
      builder.AddWord(Value, 'Parameter: "' + name + '" must be valid a number/float/range');
    }
  }
}

/**
 *
 * @param selector
 * @param receiver
 * @param validation
 */
function ScoresCheck(selector: Selector, builder: DiagnosticsBuilder, validation: ValidationData): void {
  let Parameter = selector.get("scores");

  if (Array.isArray(Parameter)) {
    if (Parameter.length == 0) return;

    if (Parameter.length > 1) {
      builder.Add("Selector has multiple scores definitions, but can only have 1", selector.Range);
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

    if (Value.text.startsWith("!")) {
      NegativeTest = true;
      Value = new RangedWord(Value.text.substring(1), Value.range);
    }

    if (!(IsRangeInteger(Value.text) || IsInteger(Value.text))) {
      builder.AddWord(Value, `Not a valid range or integer: ${Score.Name}=${Score.Value}`);
    }

    if (validation.objectives?.valid?.includes(Score.Name.text)) {
      continue;
    } else if (validation.objectives?.invalid?.includes(Score.Name.text)) {
      builder.AddWord(Score.Name, `Score: ${Score.Name} has been marked as invalid`);
    } else {
      if (!Database.Data.General.Objectives.HasID(Score.Name.text)) {
        builder.AddWord(Score.Name, `No valid definition of ${Score.Name} has been found.`);
      }
    }
  }
}
