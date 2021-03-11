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

import { CompletionItem } from 'vscode-languageserver';
import { ModeCollection } from '../../../commands/modes/Interface';
import { Kinds } from '../../include';

export const SelectorBaseMode : ModeCollection = {
	Name: "selector base mode",
	Modes: [
		{ Name: "@a", Description: "Targets all players"},
		{ Name: "@e", Description: "Targets all entities"},
		{ Name: "@s", Description: "Targets the executing entity"},
		{ Name: "@r", Description: "Targets random players, or if specified, random types"},
		{ Name: "@p", Description: "Targets the nearest player" },
	]
}

export namespace SelectorBase {
	export namespace Completion {
		export const AllPlayer: CompletionItem = { label: "@a", kind: Kinds.Completion.Selector, documentation: "Targets all players" };
		export const AllEntities: CompletionItem = { label: "@e", kind: Kinds.Completion.Selector, documentation: "Targets all entities" };
		export const Executing: CompletionItem = { label: "@s", kind: Kinds.Completion.Selector, documentation: "Targets the executing entity" };
		export const Random: CompletionItem = { label: "@r", kind: Kinds.Completion.Selector, documentation: "Targets random players, or if specified, random types", };
		export const NearestPlayer: CompletionItem = { label: "@p", kind: Kinds.Completion.Selector, documentation: "Targets the nearest player" };
	}
}
