import * as vscode from 'vscode';
import { DiagnosticsManager, DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class GameruleDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var Gamerule = item.Child;

		if (Gamerule == undefined) {
			Errors.Missing('gamerule', 'gamerule', lineIndex, item, collector);
			return;
		}

		switch (Gamerule.Text.text) {
			case 'commandBlocksEnabled':
			case 'commandBlockOutput':
			case 'doDaylightCycle':
			case 'doEntityDrops':
			case 'doFireTick':
			case 'doInsomnia':
			case 'immediateRespawn':
			case 'doMobLoot':
			case 'doMobSpawning':
			case 'doTileDrops':
			case 'doWeatherCycle':
			case 'drowningDamage':
			case 'fallDamage':
			case 'fireDamage':
			case 'keepInventory':
			case 'mobGriefing':
			case 'naturalRegeneration':
			case 'pvp':
			case 'randomTickSpeed':
			case 'sendCommandFeedback':
			case 'showCoordinates':
			case 'showDeathMessages':
			case 'spawnRadius':
			case 'tntExplodes':
			case 'showTags':

				var Next = Gamerule.Child

				if (Next == undefined)
					return;

				dm.BooleanDiagnoser?.provideDiagnostic(Next, lineIndex, collector, dm, document);

				return;
			case 'maxCommandChainLength':

				var Next = Gamerule.Child

				if (Next == undefined)
					return;

				dm.IntegerDiagnoser?.provideDiagnostic(Next, lineIndex, collector, dm, document);

				return;
			default:
				Errors.UnknownWords('see gamerule on the wiki', lineIndex, Gamerule, collector);
				return;
		}

	}
}
