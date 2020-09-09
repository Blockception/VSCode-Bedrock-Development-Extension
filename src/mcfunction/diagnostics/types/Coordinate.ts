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
import { IsNumber } from "./Number";

//Checks the coordinate if it is there
export function CheckCoordinateIf(sObject: Selector, name: string, range: vscode.Range, collection: vscode.Diagnostic[]): boolean {
  if (sObject.hasParameter(name)) {
    CheckCoordinate(sObject.getParameter(name), range, collection);
    return true;
  }

  return false;
}

//Checks the coordinate
export function CheckCoordinate(Parameter: SelectorParameter, range: vscode.Range, collection: vscode.Diagnostic[]): void {
  if (Parameter.value.indexOf("^") > -1) {
    collection.push(new vscode.Diagnostic(range, "parameter: " + Parameter.name + ": ^ coordinate references are not allowed in selectors", vscode.DiagnosticSeverity.Error));
    return;
  } else if (Parameter.value === "") {
    collection.push(new vscode.Diagnostic(range, "parameter: " + Parameter.name + ": empty coordinate", vscode.DiagnosticSeverity.Error));
    return;
  }

  var Number = Parameter.value;

  if (!IsCoordinate(Number)) {
    collection.push(new vscode.Diagnostic(range, "parameter: " + Parameter.name + ": The coordinate is not valid", vscode.DiagnosticSeverity.Error));
  }
}

//Check if the given value is a number
export function IsCoordinate(value: string): boolean {
  if (value.startsWith("~") || value.startsWith("^") ) {
    value = value.substring(1, value.length);
  }

  return IsNumber(value);
}