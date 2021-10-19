import { ProjectData } from 'bc-minecraft-bedrock-project';
import * as vscode from "vscode";
import { Manifest } from 'bc-minecraft-bedrock-project/lib/src/Lib/Internal/include';

export function ManifestType(uri :string) : PackType {
	const Type = Manifest.DetectTypeUri(uri, (uri)=>vscode.workspace.openTextDocument(uri) );
}