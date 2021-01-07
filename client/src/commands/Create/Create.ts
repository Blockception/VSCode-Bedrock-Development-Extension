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
import { commands, ExtensionContext, InputBoxOptions, window } from "vscode";
import { ExecuteCommandParams, ExecuteCommandRequest } from "vscode-languageclient";
import { Commands } from "../../Constants";
import { Manager } from "../../Manager/Manager";

export function Activate(context: ExtensionContext): void {
  console.log("registering create commands");

  Create(context, Commands.Create.Entity, "Create Entity");
  Create(context, Commands.Create.EntityBP, "Create Entity - Behaviour Pack Only");
  Create(context, Commands.Create.EntityRP, "Create Entity - Resource Pack Only");
}

function Create(context: ExtensionContext, command: string, title: string) {
  context.subscriptions.push(
    commands.registerCommand(command, (arg: any[]) => {
      let Options: InputBoxOptions = {
        validateInput(value): string | undefined {
          return ValidIdentifier(value);
        },
        prompt: title,
        password: false,
        ignoreFocusOut: true,
        placeHolder: "namespace:example",
      };

      window.showInputBox(Options).then((value) => OnComplete(value, command));
    })
  );
}

function OnComplete(value: string, command: string): Promise<any> {
  if (value === undefined) return new Promise<void>(undefined);

  let Options: ExecuteCommandParams = {
    command: command,
    arguments: [value],
  };

  return Manager.Client.sendRequest(ExecuteCommandRequest.type, Options);
}

function ValidIdentifier(ID: string): string | undefined {
  if (ID === undefined) return undefined;

  if (ID.match(/^[0-9a-zA-Z:_\\.\\-]+$/)) {
    return undefined;
  } else {
    return "Does not match pattern: namespace:example OR namespace:example.hello";
  }
}
