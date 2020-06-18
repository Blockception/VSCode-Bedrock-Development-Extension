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

import * as vscode from "vscode";
import { Selector, SelectorParameter } from "../../selectors/selector";
import { DiagnosticsManager, DiagnosticProvider } from "../DiagnosticsManager";
import { SyntaxItem, RangedWord } from "../../../general/include";

export class SelectorDiagnosticProvider implements DiagnosticProvider {

  //provides diagnostics
  provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
    var Selector = item.Text;

    if (Selector.text.startsWith('"')){
      if (!Selector.text.endsWith('"')){
        collector.push(new vscode.Diagnostic(
          new vscode.Range(lineIndex, Selector.startindex, lineIndex, Selector.endindex),
          "Target needs to be closed with a \"",
          vscode.DiagnosticSeverity.Error
        ));
      }

      return;
    }
    else if (Selector.text.startsWith("@")) {
      if (Selector.text.length <= 2) {
        switch (Selector.text) {
          case "@a":
          case "@e":
          case "@r":
          case "@s":
          case "@p":
            break;

          default:
            collector.push(new vscode.Diagnostic(
              new vscode.Range(lineIndex, Selector.startindex, lineIndex, Selector.endindex),
              "Missing or invalid selector",
              vscode.DiagnosticSeverity.Error
            ));
            return;
        }
      }
      else {
        CheckSelector(lineIndex, Selector, document, collector);
      }
    }
    else{
      var match = Selector.text.match("^[\w_\-]+$");
      if (match == undefined || match.length == 0){
        collector.push(new vscode.Diagnostic(
          new vscode.Range(lineIndex, Selector.startindex, lineIndex, Selector.endindex),
          "invalid target/selector",
          vscode.DiagnosticSeverity.Error
        ));
      }
    }
  }
}

//Checks the selector
function CheckSelector(lineIndex: number, selectorText: RangedWord, document: vscode.TextDocument, collection: vscode.Diagnostic[]): void {
  var sObject = Selector.Parse(selectorText.text);
  var Range = new vscode.Range(lineIndex, selectorText.startindex, lineIndex, selectorText.endindex);
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

//Check the scores
function MultipleScores(selectorText: string): boolean {
  var index = selectorText.indexOf("scores={");

  if (index < 0) return false;

  index = selectorText.indexOf("scores={", index + 1);

  if (index >= 0) {
    return true;
  }

  return false;
}

//Checks the coordinate if it is there
function CheckCoordinateIf(sObject: Selector, name: string, range: vscode.Range, collection: vscode.Diagnostic[]): boolean {
  if (sObject.hasParameter(name)) {
    CheckCoordinate(sObject.getParameter(name), range, collection);
    return true;
  }

  return false;
}

//Checks the coordinate
function CheckCoordinate(Parameter: SelectorParameter, range: vscode.Range, collection: vscode.Diagnostic[]): void {
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

//Checks the number if it is there
function CheckNumberIf(sObject: Selector, name: string, range: vscode.Range, collection: vscode.Diagnostic[]): boolean {
  if (sObject.hasParameter(name)) {
    CheckNumber(sObject.getParameter(name), range, collection);
    return true;
  }

  return false;
}

//Checks the number
function CheckNumber(Parameter: SelectorParameter, range: vscode.Range, collection: vscode.Diagnostic[]): void {
  var Number = Parameter.value;

  if (!IsNumber(Number)) {
    collection.push(new vscode.Diagnostic(range, "parameter: " + Parameter.name + ": The number is not valid", vscode.DiagnosticSeverity.Error));
  }
}

//Check if the given value is a number
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

//Checks for duplicates
function DuplicateCheck(selector: Selector, names: string[], range: vscode.Range, collection: vscode.Diagnostic[]): void {
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var Count = selector.countParameter(name);

    if (Count > 1) {
      collection.push(new vscode.Diagnostic(range, "parameter: " + name + ": parameter cannot be specified multiple times", vscode.DiagnosticSeverity.Error));
    }
  }
}

//Checks the names
function nameCheck(sObject: Selector, range: vscode.Range, collection: vscode.Diagnostic[]): void {

  if (!sObject.hasParameter("name"))
    return;

  var Parameter = sObject.getParameter("name");

  if (Parameter.name.startsWith("\"")) {
    if (Parameter.name.endsWith("\"")) {
      return;
    }

    collection.push(
      new vscode.Diagnostic(
        range,
        "name parameter has no closing quote",
        vscode.DiagnosticSeverity.Error));
    return;
  }

  if (Parameter.value.startsWith('"')){
    if (!Parameter.value.endsWith('"')){
      new vscode.Diagnostic(
        range,
        "Started on a quoted name but never finished it",
        vscode.DiagnosticSeverity.Error);
    }

    return;
  }

  for (var index = 0; index < Parameter.value.length; index++) {
    var C = Parameter.value.charAt(index);
    if (C == " " || C == "\t") {
      collection.push(
        new vscode.Diagnostic(
          range,
          "name parameter has spaces/tabs, these are only allowed when using quotes",
          vscode.DiagnosticSeverity.Error));
    }
  }
}

//Checks the type
function typeCheck(sObject: Selector, range: vscode.Range, collection: vscode.Diagnostic[]): void {
  var Parameters = sObject.parameters;
  var PositiveTest = false;

  for (var index = 0; index < Parameters.length; index++) {
    var P = Parameters[index];

    if (P.name == "type") {
      if (!P.value.startsWith("!")) {
        if (PositiveTest) {
          collection.push(new vscode.Diagnostic(
            range,
            "type: cannot test for multiple types that it must match, excludes can only be tested multiple times",
            vscode.DiagnosticSeverity.Error
          ));
        }
        else {
          PositiveTest = true;
        }
      }
    }
  }
}