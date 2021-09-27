import { OffsetWord } from 'bc-vscode-words';
import { DefinitionParams, Location, ReferenceParams } from 'vscode-languageserver-protocol';
import { TextDocument } from '../../Types/Document/TextDocument';
import { Molang, MolangSet } from 'bc-minecraft-molang';

export function ProvideReferences(text : OffsetWord, doc : TextDocument, params :DefinitionParams | ReferenceParams) : Location[] | undefined {
	//const cursor = doc.offsetAt(params.position);

	//const data = MolangSet.harvest(text.text);

	//TODO find molang variables

	return undefined;
}