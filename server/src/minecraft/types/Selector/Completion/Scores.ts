import { CompletionList, CompletionItemKind } from 'vscode-languageserver';
import { RangedWord } from '../../../../code/include';
import { provideObjectiveCompletion } from '../../include';
import { IsEditingValue } from '../Selector';

export function provideSelectorScoreCompletion(receiver: CompletionList, selector: RangedWord, pos: number): void {
	if (IsEditingValue(selector, pos)) {
		receiver.items.push(
			{ label: '0', kind: CompletionItemKind.Constant, documentation: 'test for the exact value of 0' },
			{ label: '!0', kind: CompletionItemKind.Constant, documentation: 'test for the exact value of everything but 0' },
			{ label: '0..', kind: CompletionItemKind.Constant, documentation: 'test for the everything equal to 0 or higher' },
			{ label: '..0', kind: CompletionItemKind.Constant, documentation: 'test for the everything equal to 0 or lower' },
			{ label: '0..10', kind: CompletionItemKind.Constant, documentation: 'test for the everything equal to 0 or 10 and everything in between' },
		)
	}
	else {
		provideObjectiveCompletion(receiver, '=');
	}
}