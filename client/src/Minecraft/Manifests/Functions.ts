import * as vscode from "vscode";
import { Manifest } from 'bc-minecraft-bedrock-project/lib/src/Lib/Internal/include';
import { PackType } from 'bc-minecraft-bedrock-project/lib/src/Lib/Project/Enum/PackType';

export function ManifestType(uri :string) : PackType {
	const Type = Manifest.DetectTypeUri(uri, (uri)=>vscode.workspace.openTextDocument(uri) );
}