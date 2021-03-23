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
import { LocationWord } from "bc-vscode-words";
import { Position } from "vscode-languageserver-textdocument";
import { CommandInfo } from "../../Types/Commands/Info/include";
import { CommandIntr } from "../../Types/Commands/Interpertation/CommandIntr";
import { MCCommandParameter } from "../../Types/Commands/Parameter/Parameter";
import { CompletionBuilder } from "../include";

/**
 *
 */
export interface CommandCompletionContext {
  Parameter: MCCommandParameter;
  ParameterIndex: number;
  Command: CommandIntr;
  BestMatch: CommandInfo;
  Pos: Position;
  receiver: CompletionBuilder;
  Current: LocationWord | undefined;
}

/**
 *
 */
export namespace CommandCompletionContext {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is CommandCompletionContext {
    if (value) {
      let temp = value as CommandCompletionContext;

      if (temp.Parameter && temp.Command && temp.Pos && temp.receiver) return true;
    }

    return false;
  }

  /**
   *
   * @param Parameter
   * @param Command
   * @param pos
   * @param receiver
   * @param Current
   * @returns
   */
  export function create(
    Parameter: MCCommandParameter,
    ParameterIndex: number,
    Command: CommandIntr,
    Pos: Position,
    receiver: CompletionBuilder,
    Current: LocationWord | undefined = undefined
  ): CommandCompletionContext {
    let BestMatch = Command.GetCommandData()[0];

    return {
      Parameter: Parameter,
      ParameterIndex: ParameterIndex,
      Command: Command,
      BestMatch: BestMatch,
      Pos: Pos,
      receiver: receiver,
      Current: Current,
    };
  }
}
