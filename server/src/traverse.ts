import * as fs from 'fs';
import { Manager } from './Manager';
import { URI } from 'vscode-uri';
import { TextDocument } from 'vscode-languageserver-textdocument';


export function TraveseDirectory(Dir: string): void {
	//console.log('exploring: ' + Dir);
	if (!Dir.endsWith('\\')){
		Dir += '\\';
	}

	fs.readdir(Dir, (err, files) => {
		if (err) {
			console.log(err);
		}
		else {
			if (files)
				files.forEach(file => {
					var Path = Dir + file;

					if (Path.endsWith(".mcfunction")) {
						Parse(Path, 'bc-minecraft-mcfunction');
					}
					else if (Path.endsWith(".lang")){
						Parse(Path, 'bc-minecraft-language');
					}
					else if (fs.lstatSync(Path).isDirectory()) {
						TraveseDirectory(Path);
					}
				});
		}
	});
}

function Parse(path : string, languageID : string) : void {
	var uri = URI.file(path);
	var Content = fs.readFileSync(path, 'utf8');
	Parse(TextDocument.create(uri.toString(), languageID, 0, Content));
}