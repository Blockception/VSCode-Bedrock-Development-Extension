import * as vscode from 'vscode';
import { DiagnosticsManager, DiagnosticProvider, Errors } from '../DiagnosticsManager';
import { SyntaxItem } from '../../../general/include';

export class ScoreboardDiagnosticProvider implements DiagnosticProvider {

	//provides diagnostics
	provideDiagnostic(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var Sub = item.Child;

		if (Sub == undefined) {
			Errors.Missing('mode', 'scoreboard', lineIndex, item, collector);
			return;
		}

		switch (Sub.Text.text) {
			case 'objectives':
				this.branchObjectives(item, lineIndex, collector, dm, document);
				return;

			case 'players':
				this.branchPlayers(item, lineIndex, collector, dm, document);
				return;

			default:
				Errors.UnknownWords('objectives, players', lineIndex, Sub, collector);
				return;
		}

	}

	//All the objectives
	branchObjectives(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var Mode = item.Child;

		//objectives
		if (Mode == undefined) {
			Errors.Missing('mode', 'scoreboard objectives', lineIndex, item, collector);
			return;
		}

		switch (Mode.Text.text) {
			case 'list':
				return;

			case 'add':
				this.branchAdd(item, lineIndex, collector, dm, document);
				return;

			case 'remove':
				this.branchRemove(item, lineIndex, collector, dm, document);
				return;

			case 'setdisplay':
				this.branchSetdisplay(item, lineIndex, collector, dm, document);
				return;

			default:
				Errors.UnknownWords('list, add, remove, setdisplay', lineIndex, Mode, collector);
				return;
		}
	}

	//scoreboard objectives add
	branchAdd(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var ScoreName = item.Child;

		//<name>
		if (ScoreName == undefined) {
			Errors.Missing('objective', 'scoreboard objectives add', lineIndex, item, collector);
			return;
		}

		dm.ScoreDiagnoser?.provideDiagnostic(ScoreName, lineIndex, collector, dm, document);

		var Dummy = ScoreName.Child;

		//dummy
		if (Dummy == undefined) {
			Errors.Missing('dummy', 'scoreboard objectives add', lineIndex, ScoreName, collector);
			return;
		}

		if (Dummy.Text.text != "dummy") {
			collector.push(new vscode.Diagnostic(
				Dummy.Text.ToRange(lineIndex),
				"only objective type dummy is allowed",
				vscode.DiagnosticSeverity.Error
			));
		}

		var Display = Dummy.Child;

		//[display name: string]
		if (Display == undefined) {
			return;
		}
		dm.StringDiagnoser?.provideDiagnostic(Display, lineIndex, collector, dm, document);

	}

	//scoreboard objectives remove
	branchRemove(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var ScoreName = item.Child;

		//<name>
		if (ScoreName == undefined) {
			Errors.Missing('objective', 'scoreboard objectives add', lineIndex, item, collector);
			return;
		}

		dm.ScoreDiagnoser?.provideDiagnostic(ScoreName, lineIndex, collector, dm, document);
	}

	branchSetdisplay(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var DisplayType = item.Child;

		//setdisplay
		if (DisplayType == undefined) {
			Errors.Missing('display type', 'scoreboard objectives setdisplay', lineIndex, item, collector);
			return;
		}

		var Sortable = false;

		switch (DisplayType.Text.text) {
			case 'belowname':
				break;

			case 'list':
			case 'sidebar':
				Sortable = true;
				break;

			default:
				Errors.UnknownWords('belowname, list, sidebar', lineIndex, DisplayType, collector);
				return;
		}

		var Objective = DisplayType.Child;

		if (Objective == undefined) {
			return;
		}

		dm.ScoreDiagnoser?.provideDiagnostic(Objective, lineIndex, collector, dm, document);

		if (!Sortable)
			return;

		var Sort = Objective.Child;

		if (Sort == undefined) {
			return;
		}

		switch (Sort.Text.text) {
			case 'ascending':
			case 'descending':
				return;

			default:
				Errors.UnknownWords('ascending, descending', lineIndex, DisplayType, collector);
				return;
		}
	}

	branchPlayers(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {

		var Mode = item.Child;

		if (Mode == undefined) {
			Errors.Missing('mode', 'scoreboard players', lineIndex, item, collector);
			return;
		}

		switch (Mode.Text.text) {
			case 'list':
				this.branchList(item, lineIndex, collector, dm, document);
				return;

			case 'set':
				this.branchSetAddRemove(item, lineIndex, collector, dm, document, 'set');
				return;

			case 'add':
				this.branchSetAddRemove(item, lineIndex, collector, dm, document, 'add');
				return;

			case 'remove':
				this.branchSetAddRemove(item, lineIndex, collector, dm, document, 'remove');
				return;

			case 'reset':
				this.branchReset(item, lineIndex, collector, dm, document);
				return;

			case 'operation':
				this.branchOperation(item, lineIndex, collector, dm, document);
				return;

			case 'test':
				this.branchTest(item, lineIndex, collector, dm, document);
				return;

			case 'random':
				this.branchRandom(item, lineIndex, collector, dm, document);
				return;

			default:
				//NOT FOUND ERROR
				return;
		}
	}

	//scoreboard players list
	branchList(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var Entity = item.Child;

		//[entity]
		if (Entity == undefined) {
			return;
		}

		dm.SelectorDiagnoser?.provideDiagnostic(Entity, lineIndex, collector, dm, document);
	}

	//scoreboard players set/add/remove
	branchSetAddRemove(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument, Mode: string): void {
		var Entity = item.Child;

		//<entity: string>
		if (Entity == undefined) {
			Errors.Missing('target/selector', `scoreboard players ${Mode}`, lineIndex, item, collector);
			return;
		}

		dm.SelectorDiagnoser?.provideDiagnostic(Entity, lineIndex, collector, dm, document);

		var Objective = Entity.Child;

		//<objective>
		if (Objective == undefined) {
			Errors.Missing('objective', `scoreboard players ${Mode}`, lineIndex, Entity, collector);
			return;
		}

		dm.ScoreDiagnoser?.provideDiagnostic(Objective, lineIndex, collector, dm, document);

		var Score = Objective.Child;

		//<score>
		if (Score == undefined) {
			Errors.Missing('integer', `scoreboard players ${Mode}`, lineIndex, Objective, collector);
			return;
		}

		dm.IntegerDiagnoser?.provideDiagnostic(Score, lineIndex, collector, dm, document);
	}

	//scoreboard players reset
	branchReset(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var Entity = item.Child;

		//<entity: string>
		if (Entity == undefined) {
			Errors.Missing('target/selector', 'scoreboard players reset', lineIndex, item, collector);
			return;
		}
		dm.SelectorDiagnoser?.provideDiagnostic(Entity, lineIndex, collector, dm, document);
		var Objective = Entity.Child;

		//<objective>
		if (Objective == undefined) {
			return;
		}

		dm.ScoreDiagnoser?.provideDiagnostic(Objective, lineIndex, collector, dm, document);
	}

	//scoreboard players operation
	branchOperation(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var Target = item.Child;

		//<targetName>
		if (Target == undefined) {
			Errors.Missing('target/selector', 'scoreboard players reset', lineIndex, item, collector);
			return;
		}

		dm.SelectorDiagnoser?.provideDiagnostic(Target, lineIndex, collector, dm, document);

		var TargetObjective = Target.Child;

		//<targetObjective>
		if (TargetObjective == undefined) {
			Errors.Missing('objective', 'scoreboard players operation', lineIndex, Target, collector);
			return;
		}

		dm.ScoreDiagnoser?.provideDiagnostic(TargetObjective, lineIndex, collector, dm, document);

		var Operation = TargetObjective.Child;

		if (Operation == undefined) {
			Errors.Missing('operation', 'scoreboard players operation', lineIndex, TargetObjective, collector);
			return;
		}

		switch (Operation.Text.text) {
			case '%=':
			case '*=':
			case '+=':
			case '-=':
			case '/=':
			case '<':
			case '=':
			case '>':
			case '><':
				break;
			default:
				Errors.UnknownWords('', lineIndex, Operation, collector);
				return;
		}

		var SourceTarget = Operation.Child;

		//<targetName>
		if (SourceTarget == undefined) {
			Errors.Missing('target/selector', 'scoreboard players reset', lineIndex, item, collector);
			return;
		}

		dm.SelectorDiagnoser?.provideDiagnostic(SourceTarget, lineIndex, collector, dm, document);

		var SourceTargetObjective = SourceTarget.Child;

		//<targetObjective>
		if (SourceTargetObjective == undefined) {
			Errors.Missing('objective', 'scoreboard players operation', lineIndex, SourceTarget, collector);
			return;
		}

		dm.ScoreDiagnoser?.provideDiagnostic(SourceTargetObjective, lineIndex, collector, dm, document);
	}

	//scoreboard players test
	branchTest(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var Target = item.Child;

		//<entity>
		if (Target == undefined) {
			Errors.Missing('target/selector', 'scoreboard players test', lineIndex, item, collector);
			return;
		}

		var Objective = Target.Child;

		//<objective>
		if (Objective == undefined) {
			Errors.Missing('objective', 'scoreboard players test', lineIndex, Target, collector);
			return;
		}

		var Min = Objective.Child;

		//<min|*>
		if (Min == undefined) {
			Errors.Missing('TODO Type', 'scoreboard players test', lineIndex, Objective, collector);
			return;
		}

		var Max = Min.Child;

		//<max|*>
		if (Max == undefined) {
			Errors.Missing('TODO Type', 'scoreboard players test', lineIndex, Min, collector);
			return;
		}
	}

	//scoreboard players random
	branchRandom(item: SyntaxItem, lineIndex: number, collector: vscode.Diagnostic[], dm: DiagnosticsManager, document: vscode.TextDocument): void {
		var Target = item.Child;

		//<entity>
		if (Target == undefined) {
			Errors.Missing('target/selector', 'scoreboard players random', lineIndex, item, collector);
			return;
		}

		var Objective = Target.Child;

		//<objective>
		if (Objective == undefined) {
			Errors.Missing('objective', 'scoreboard players random', lineIndex, Target, collector);
			return;
		}

		var Min = Objective.Child;

		//<min|*>
		if (Min == undefined) {
			Errors.Missing('TODO Type', 'scoreboard players random', lineIndex, Objective, collector);
			return;
		}

		var Max = Min.Child;

		//<max|*>
		if (Max == undefined) {
			Errors.Missing('TODO Type', 'scoreboard players random', lineIndex, Min, collector);
			return;
		}
	}
}
