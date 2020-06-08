import * as vscode from 'vscode';
import { DiagnosticsManager, DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class PlaysoundDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var Sound = item.Child;

		//<sound: string>
		if (Sound == undefined) {
			Errors.Missing('sound', 'playsound', lineIndex, item, collector);
			return;
		}
		dm.SoundDiagnoser?.provideDiagnostic(Sound, lineIndex, collector, dm, document);

		var Target = Sound.Child;

		//[player: target]
		if (Target == undefined) {
			return;
		}
		dm.SelectorDiagnoser?.provideDiagnostic(Target, lineIndex, collector, dm, document);

		var XCoord = Target.Child;

		//[position: x y z]
		if (XCoord == undefined) {
			return;
		}

		var volume: SyntaxItem | undefined;
		if (XCoord.Text.text != "~~~") {
			dm.CoordinateDiagnoser?.provideDiagnostic(XCoord, lineIndex, collector, dm, document);

			var YCoord = XCoord.Child;

			//[position: x y z]
			if (YCoord == undefined) {
				return;
			}
			dm.CoordinateDiagnoser?.provideDiagnostic(YCoord, lineIndex, collector, dm, document);

			var ZCoord = YCoord.Child;

			//[position: x y z]
			if (ZCoord == undefined) {
				return;
			}
			dm.CoordinateDiagnoser?.provideDiagnostic(ZCoord, lineIndex, collector, dm, document);

			volume = ZCoord.Child;
		}
		else {
			volume = XCoord.Child;
		}

		//[volume: float]
		if (volume == undefined) {
			return;
		}
		dm.FloatDiagnoser?.provideDiagnostic(volume, lineIndex, collector, dm, document);

		var pitch = volume.Child;

		//[pitch: float]
		if (pitch == undefined) {
			return;
		}
		dm.FloatDiagnoser?.provideDiagnostic(pitch, lineIndex, collector, dm, document);

		var minVolume = pitch.Child;

		//[minimumVolume: float]
		if (minVolume == undefined) {
			return;
		}
		dm.FloatDiagnoser?.provideDiagnostic(minVolume, lineIndex, collector, dm, document);

	}

}
