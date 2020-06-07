import * as vscode from 'vscode';
import { DiagnosticsManager,DiagnosticProvider } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class gameruleDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		switch(item.text) {
		case 'commandBlocksEnabled':
			this.branchcommandBlocksEnabled(item, lineIndex, collector, dm, document);
			return;

		case 'commandBlockOutput':
			this.branchcommandBlockOutput(item, lineIndex, collector, dm, document);
			return;

		case 'doDaylightCycle':
			this.branchdoDaylightCycle(item, lineIndex, collector, dm, document);
			return;

		case 'doEntityDrops':
			this.branchdoEntityDrops(item, lineIndex, collector, dm, document);
			return;

		case 'doFireTick':
			this.branchdoFireTick(item, lineIndex, collector, dm, document);
			return;

		case 'doInsomnia':
			this.branchdoInsomnia(item, lineIndex, collector, dm, document);
			return;

		case 'immediateRespawn':
			this.branchimmediateRespawn(item, lineIndex, collector, dm, document);
			return;

		case 'doMobLoot':
			this.branchdoMobLoot(item, lineIndex, collector, dm, document);
			return;

		case 'doMobSpawning':
			this.branchdoMobSpawning(item, lineIndex, collector, dm, document);
			return;

		case 'doTileDrops':
			this.branchdoTileDrops(item, lineIndex, collector, dm, document);
			return;

		case 'doWeatherCycle':
			this.branchdoWeatherCycle(item, lineIndex, collector, dm, document);
			return;

		case 'drowningDamage':
			this.branchdrowningDamage(item, lineIndex, collector, dm, document);
			return;

		case 'fallDamage':
			this.branchfallDamage(item, lineIndex, collector, dm, document);
			return;

		case 'fireDamage':
			this.branchfireDamage(item, lineIndex, collector, dm, document);
			return;

		case 'keepInventory':
			this.branchkeepInventory(item, lineIndex, collector, dm, document);
			return;

		case 'maxCommandChainLength':
			this.branchmaxCommandChainLength(item, lineIndex, collector, dm, document);
			return;

		case 'mobGriefing':
			this.branchmobGriefing(item, lineIndex, collector, dm, document);
			return;

		case 'naturalRegeneration':
			this.branchnaturalRegeneration(item, lineIndex, collector, dm, document);
			return;

		case 'pvp':
			this.branchpvp(item, lineIndex, collector, dm, document);
			return;

		case 'randomTickSpeed':
			this.branchrandomTickSpeed(item, lineIndex, collector, dm, document);
			return;

		case 'sendCommandFeedback':
			this.branchsendCommandFeedback(item, lineIndex, collector, dm, document);
			return;

		case 'showCoordinates':
			this.branchshowCoordinates(item, lineIndex, collector, dm, document);
			return;

		case 'showDeathMessages':
			this.branchshowDeathMessages(item, lineIndex, collector, dm, document);
			return;

		case 'spawnRadius':
			this.branchspawnRadius(item, lineIndex, collector, dm, document);
			return;

		case 'tntExplodes':
			this.branchtntExplodes(item, lineIndex, collector, dm, document);
			return;

		case 'showTags':
			this.branchshowTags(item, lineIndex, collector, dm, document);
			return;

		default:
			//NOT FOUND ERROR
			return;
		}

	}

	branchcommandBlocksEnabled(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//commandBlocksEnabled
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchcommandBlockOutput(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//commandBlockOutput
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchdoDaylightCycle(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//doDaylightCycle
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchdoEntityDrops(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//doEntityDrops
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchdoFireTick(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//doFireTick
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchdoInsomnia(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//doInsomnia
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchimmediateRespawn(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//immediateRespawn
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchdoMobLoot(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//doMobLoot
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchdoMobSpawning(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//doMobSpawning
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchdoTileDrops(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//doTileDrops
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchdoWeatherCycle(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//doWeatherCycle
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchdrowningDamage(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//drowningDamage
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchfallDamage(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//fallDamage
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchfireDamage(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//fireDamage
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchkeepInventory(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//keepInventory
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchmaxCommandChainLength(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//maxCommandChainLength
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchmobGriefing(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//mobGriefing
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchnaturalRegeneration(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//naturalRegeneration
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchpvp(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//pvp
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchrandomTickSpeed(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//randomTickSpeed
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchsendCommandFeedback(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//sendCommandFeedback
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchshowCoordinates(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//showCoordinates
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchshowDeathMessages(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//showDeathMessages
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchspawnRadius(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//spawnRadius
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchtntExplodes(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//tntExplodes
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
	branchshowTags(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument) : void {

		//showTags
		if (word == undefined) {
			//MISSING ERROR
		}

		//[value]
		if (word == undefined) {
			return;
		}

	}
}
