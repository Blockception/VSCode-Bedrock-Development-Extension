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

//Checks the number if it is there
export function CheckIntegerIf(sObject: Selector, name: string, range: vscode.Range, collection: vscode.Diagnostic[]): boolean {
  if (sObject.hasParameter(name)) {
    CheckInteger(sObject.getParameter(name), range, collection);
    return true;
  }

  return false;
}

//Checks the number
export function CheckInteger(Parameter: SelectorParameter, range: vscode.Range, collection: vscode.Diagnostic[]): void {
  let Number = Parameter.value;

  if (!IsInteger(Number)) {
    collection.push(new vscode.Diagnostic(range, "parameter: " + Parameter.name + ": The integer is not valid", vscode.DiagnosticSeverity.Error));
  }
}

//Check if the given value is a number
export function IsInteger(value: string): boolean {
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