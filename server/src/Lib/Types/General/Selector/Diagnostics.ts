import { LocationWord, RangedWord } from "bc-vscode-words";
import { Database } from "../../../Database/include";
import { IsRangeInteger, IsRangeNumber } from "../Range/Functions";
import { MCCommandParameter } from "../../Commands/Parameter/include";
import { IsFloat } from "../Float/include";
import { IsInteger } from "../Integer/include";
import { IScoreParameter, Selector } from "./Selector";
import { DiagnosticsBuilder } from "../../../Diagnostics/Builder";
import { DiagnosticSeverity } from "vscode-languageserver";
import { Names } from "../include";

const attributes = ["c", "dx", "dy", "dz", "family", "lm", "l", "m", "name", "rm", "r", "scores", "type", "tag", "x", "y", "z", "rx", "rxm", "ry", "rym"];

/**
 *
 * @param pattern
 * @param data
 * @param receiver
 * @param validation
 */
export function ProvideDiagnostic(pattern: MCCommandParameter, data: LocationWord, builder: DiagnosticsBuilder): void {
  let text = data.text;

  if (pattern.Options?.acceptedValues?.includes(data.text)) return;

  if (text.startsWith("@")) {
    let selector = Selector.Parse(data);
    DiagnoseSelector(selector, builder, pattern.Options?.playerOnly ?? false);
  } else {
    if (pattern.Options?.allowFakePlayers) {
      DiagnoseFakePlayer(data, builder);
    } else {
      builder.AddWord(data, "Fake players for this parameter are not allowed").code = "fakeplayer.excluded";
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

  builder.AddWord(data, 'Fake player: "' + fakePlayer + '" has not been assigned a value.').code = "fakeplayer.missing";
}

/**
 *
 * @param selector
 * @param receiver
 * @param onlyPlayer
 * @param validation
 */
function DiagnoseSelector(selector: Selector, builder: DiagnosticsBuilder, onlyPlayer: boolean): void {
  var HasType = selector.contains("type");

  if (onlyPlayer) {
    if (HasType) {
      builder.Add("Selector has type definitions but this parameter should only be for players", selector.Range).code = "selector.mistyped";
    } else {
      if (selector.Type == Selector.AllEntitiesType) {
        builder.Add("Selector is for all entities but this parameter should only be for players", selector.Range).code = "selector.mistyped";
      }
    }
  }

  if (IsBox(selector) && IsSphere(selector)) {
    builder.Add("Selector has both box and sphere definitions", selector.Range).code = "selector.area.both";
  }

  Name(selector, builder);

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

  OnlyPositiveOrMultipleNegatives("type", selector, builder);

  AllPositivesAndNegatives("family", selector, builder);
  AllPositivesAndNegatives("tag", selector, builder);
  ScoresCheck(selector, builder);

  for (let index = 0; index < selector.Parameters.length; index++) {
    const element = selector.Parameters[index];

    if (!attributes.includes(element.Name.text)) {
      builder.AddWord(element.Name, "Illegal selector attribute " + element.Name.text).code = "selector.attribute.invalid";
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
    builder.Add('Parameter: "' + name + '" can only be used once in a selector', selector.Range).code = "selector.name";
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
      builder.Add('Parameter: "' + name + '" can only have a positive test or multiple negatives test', selector.Range).code = `selector.${name}.testp|n`;
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
      builder.Add('Parameter: "' + name + '" can only have 1 positive test or/and multiple negatives test', selector.Range).code = `selector.${name}.testp&n`;
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
          builder.AddWord(second.Name, 'duplicate test statement found for: "' + name + '"', DiagnosticSeverity.Warning).code = `selector.${name}.duplicate`;
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
    builder.AddWord(Parameter.Value, 'Parameter: "' + name + '" cannot be a local coordinate, only relative or absolute').code = "selector.coordinate.invalid";
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

function Name(selector: Selector, builder: DiagnosticsBuilder): void {
  var Parameters = selector.get("name");

  if (!Array.isArray(Parameters)) {
    Parameters = [Parameters];
  }

  for (let I = 0; I < Parameters.length; ++I) {
    Names.ProvideDiagnostic(Parameters[I].Value, builder);
  }

  OnlyPositiveAndMultipleNegatives("name", selector, builder);
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
    builder.AddWord(Value, 'Parameter: "' + name + '" must be valid a number/float').code = `selector.${name}.float.invalid`;
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
      builder.AddWord(Value, 'Parameter: "' + name + '" must be valid a number/float/range').code = `selector.${name}.range.invalid`;
    }
  }
}

/**
 *
 * @param selector
 * @param receiver
 * @param validation
 */
function ScoresCheck(selector: Selector, builder: DiagnosticsBuilder): void {
  let Parameter = selector.get("scores");

  if (Array.isArray(Parameter)) {
    if (Parameter.length == 0) return;

    if (Parameter.length > 1) {
      builder.Add("Selector has multiple scores definitions, but can only have 1", selector.Range).code = "selector.scores.duplicate";
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
      builder.AddWord(Value, `Not a valid range or integer: ${Score.Name}=${Score.Value}`).code = "selector.range.invalid";
    }

    let objectives = builder.doc.getConfiguration().defintions.objective;
    if (objectives.defined.includes(Score.Name.text)) {
      continue;
    } else if (objectives.excluded.includes(Score.Name.text)) {
      builder.AddWord(Score.Name, `Score: ${Score.Name} has been marked as invalid`).code = "objective.excluded";
    } else {
      if (!Database.Data.General.Objectives.HasID(Score.Name.text)) {
        builder.AddWord(Score.Name, `No valid definition of ${Score.Name.text} has been found.`).code = "objective.missing";
      }
    }
  }
}
