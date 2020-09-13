import { PublishDiagnosticsParams } from 'vscode-languageserver';
import { IDocument } from '../code/include';
import { Manager } from '../Manager';

export function provideLanguageDiagnostics(doc : IDocument){
	let Out : PublishDiagnosticsParams = {	
		uri:doc.Uri, 
		diagnostics:[]
	};

	Manager.Connection.sendDiagnostics(Out);
}