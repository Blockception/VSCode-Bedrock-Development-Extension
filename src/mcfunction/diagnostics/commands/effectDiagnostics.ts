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

import * as vscode from 'vscode';
import { DiagnosticsManager, DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class EffectDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var Target = item.Child;

		//<player: target>
		if (Target == undefined) {
			Errors.Missing('target', 'effect', lineIndex, item, collector);
			return;
		}

		dm.SelectorDiagnoser?.provideDiagnostic(Target, lineIndex, collector, dm, document);

		var Next = Target.Child;

		if (Next == undefined) {
			Errors.Missing('effect | clear', 'effect', lineIndex, Target, collector);
			return;
		}

		if (Next.Text.text == "clear") {
			return;
		}

		this.brancheffect(item, lineIndex, collector, dm, document);
		return;
	}

	//When an effect has been specified
	brancheffect(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		dm.EffectDiagnoser?.provideDiagnostic(item, lineIndex, collector, dm, document);

		var Seconds = item.Child;

		//[seconds: int]
		if (Seconds == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(Seconds, lineIndex, collector, dm, document);

		var amplifier = Seconds.Child;

		//[amplifier: int]
		if (amplifier == undefined) {
			return;
		}
		dm.IntegerDiagnoser?.provideDiagnostic(amplifier, lineIndex, collector, dm, document);

		var HideParticles = amplifier.Child;

		//[hideParticles: Boolean]
		if (HideParticles == undefined) {
			return;
		}
		dm.BooleanDiagnoser?.provideDiagnostic(HideParticles, lineIndex, collector, dm, document);

	}
}
