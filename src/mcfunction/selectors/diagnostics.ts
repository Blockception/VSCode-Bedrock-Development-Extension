import * as vscode from "vscode";
import * as S from "./selector";
import { RangedWord } from "../../general/Words";
import { isNumber } from "util";

function MultipleScores(selectorText: string): boolean {
  var index = selectorText.indexOf("scores={");

  if (index < 0) return false;

  index = selectorText.indexOf("scores={", index + 1);

  if (index >= 0) {
    return true;
  }

  return false;
}

export function CheckSelector(line: vscode.TextLine, selectorText: RangedWord, document: vscode.TextDocument, collection: vscode.Diagnostic[]): void {

  if (selectorText.text.length <= 2)
    return;

  var sObject = S.Selector.Parse(selectorText.text);
  var Range = new vscode.Range(line.lineNumber, selectorText.startindex, line.lineNumber, selectorText.endindex);
  var coordsSpec = false;
  var BoxSpec = false;
  var SphereSpec = false;

  if (MultipleScores(selectorText.text)) {
    var item = new vscode.Diagnostic(Range, "Cannot have multiple scores inside a selector", vscode.DiagnosticSeverity.Error);
    collection.push(item);
  }

  DuplicateCheck(sObject, ["x", "y", "z", "dx", "dy", "dz", "c", "m", "r", "rm", "l", "lm", "name", "rx", "rxm", "ry", "rym"], Range, collection);

  coordsSpec = coordsSpec || CheckCoordinateIf(sObject, "x", Range, collection);
  coordsSpec = coordsSpec || CheckCoordinateIf(sObject, "y", Range, collection);
  coordsSpec = coordsSpec || CheckCoordinateIf(sObject, "z", Range, collection);

  BoxSpec = BoxSpec || CheckNumberIf(sObject, "dx", Range, collection);
  BoxSpec = BoxSpec || CheckNumberIf(sObject, "dy", Range, collection);
  BoxSpec = BoxSpec || CheckNumberIf(sObject, "dz", Range, collection);

  SphereSpec = SphereSpec || CheckNumberIf(sObject, "rm", Range, collection);
  SphereSpec = SphereSpec || CheckNumberIf(sObject, "r", Range, collection);

  CheckNumberIf(sObject, "lm", Range, collection);
  CheckNumberIf(sObject, "l", Range, collection);
  CheckNumberIf(sObject, "rx", Range, collection);
  CheckNumberIf(sObject, "rxm", Range, collection);
  CheckNumberIf(sObject, "ry", Range, collection);
  CheckNumberIf(sObject, "rym", Range, collection);
  nameCheck(sObject, Range, collection);
  typeCheck(sObject, Range, collection);

  //Cannot have both
  if (SphereSpec && BoxSpec) {
    collection.push(new vscode.Diagnostic(Range, "Selector contains a box specification as well as a spheric specification", vscode.DiagnosticSeverity.Error));
  }

  //Infor
  if (coordsSpec && !(SphereSpec || BoxSpec)) {
    collection.push(new vscode.Diagnostic(Range, "Specified coordinates but no box or sphere specification, this is not an error as it can changes minecraft behaviour, but probally an error", vscode.DiagnosticSeverity.Information));
  }
}

function CheckCoordinateIf(sObject: S.Selector, name : string, range: vscode.Range, collection: vscode.Diagnostic[]) : boolean {
    if (sObject.hasParameter(name)) {
        CheckCoordinate(sObject.getParameter(name), range, collection);
        return true;
    }

    return false;
}

function CheckCoordinate(Parameter: S.SelectorParameter, range: vscode.Range, collection: vscode.Diagnostic[]): void {
  if (Parameter.value.indexOf("^") > -1) {
    collection.push(new vscode.Diagnostic(range, "parameter: " + Parameter.name + ": ^ coordinate references are not allowed in selectors", vscode.DiagnosticSeverity.Error));
    return;
  } else if (Parameter.value === "") {
    collection.push(new vscode.Diagnostic(range, "parameter: " + Parameter.name + ": empty coordinate", vscode.DiagnosticSeverity.Error));
    return;
  }

  var Number = Parameter.value;
  if (Number.startsWith("~")) {
    Number = Number.substring(1, Parameter.value.length);
  }

  if (!IsNumber(Number)) {
    collection.push(new vscode.Diagnostic(range, "parameter: " + Parameter.name + ": The number part is not valid", vscode.DiagnosticSeverity.Error));
  }
}

function CheckNumberIf(sObject: S.Selector, name : string, range: vscode.Range, collection: vscode.Diagnostic[]): boolean {
    if (sObject.hasParameter(name)) {
        CheckNumber(sObject.getParameter(name), range, collection);
        return true;
    }

    return false;
}

function CheckNumber(Parameter: S.SelectorParameter, range: vscode.Range, collection: vscode.Diagnostic[]): void {
  var Number = Parameter.value;

  if (!IsNumber(Number)) {
    collection.push(new vscode.Diagnostic(range, "parameter: " + Parameter.name + ": The number is not valid", vscode.DiagnosticSeverity.Error));
  }
}

function IsNumber(value: string): boolean {
  for (let index = 0; index < value.length; index++) {
    switch (value.charAt(index)) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "+":
      case "-":
        continue;
      default:
        return false;
    }
  }

  return true;
}

function DuplicateCheck(selector: S.Selector, names: string[], range: vscode.Range, collection: vscode.Diagnostic[]): void {
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var Count = selector.countParameter(name);

    if (Count > 1) {
      collection.push(new vscode.Diagnostic(range, "parameter: " + name + ": parameter cannot be specified multiple times", vscode.DiagnosticSeverity.Error));
    }
  }
}

function nameCheck(sObject: S.Selector, range: vscode.Range, collection: vscode.Diagnostic[]) : void {

    if (!sObject.hasParameter("name"))
        return;

    var Parameter = sObject.getParameter("name");

    if (Parameter.name.startsWith("\"")) {
        if (Parameter.name.endsWith("\"")){
            return;
        }

        collection.push(
            new vscode.Diagnostic(
                range, 
                "name parameter has no closing quote", 
                vscode.DiagnosticSeverity.Error));
        return;
    }

    for (var index = 0; index < Parameter.value.length; index++){
        var C = Parameter.value.charAt(index);
        if (C == " " || C == "\t"){
            collection.push(
                new vscode.Diagnostic(
                    range, 
                    "name parameter has spaces/tabs, these are only allowed when using quotes", 
                    vscode.DiagnosticSeverity.Error));
        }
    }
}

function typeCheck(sObject: S.Selector, range: vscode.Range, collection: vscode.Diagnostic[]) : void {
    var Parameters = sObject.parameters;
    var PositiveTest = false;

    for (var index = 0; index < Parameters.length; index++){
        var P = Parameters[index];

        if (P.name == "type"){
            if (!P.value.startsWith("!")) {
                if (PositiveTest) {
                    collection.push(new vscode.Diagnostic(
                        range,
                        "type: cannot test for multiple types that it must match, excludes can only be tested multiple times",
                        vscode.DiagnosticSeverity.Error
                    ));
                }
                else{
                    PositiveTest = true;
                }
            }
        }
    }
}