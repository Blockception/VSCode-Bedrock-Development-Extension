import { Modes } from 'bc-minecraft-bedrock-types';
import { CompletionItemKind } from 'vscode-languageserver';
import { SimpleContext } from '../../../../Code/SimpleContext';
import { CompletionBuilder } from "../../../../Completion/Builder";
import { ProvideModeCompletion} from '../../../Modes/Completion';


//Doesnt do scores and doesnt need to
export function ProvideCompletion(context : SimpleContext<CompletionBuilder>, forEntities: boolean): void {
  ProvideModeCompletion(Modes.SelectorAttribute, context, CompletionItemKind.Property); 
}
