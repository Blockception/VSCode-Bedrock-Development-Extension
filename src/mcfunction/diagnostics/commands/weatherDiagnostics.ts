import * as vscode from 'vscode';
import { DiagnosticsManager, DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class WeatherDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var WeatherType = item.Child;

		//<clear|rain|thunder>
		if (WeatherType == undefined) {
			Errors.Missing('weather', 'weather', lineIndex, item, collector);
			return;
		}

		switch (WeatherType.Text.text) {
			case 'clear':
			case 'rain':
			case 'thunder':
				break;
			default:
				Errors.UnknownWords('weather', 'clear, rain, thunder', lineIndex, WeatherType, collector);
		}

		var Duration = WeatherType.Child;

		//[duration: int]
		if (Duration == undefined) {
			return;
		}

		dm.IntegerDiagnoser?.provideDiagnostic(Duration, lineIndex, collector, dm, document);
	}
}
