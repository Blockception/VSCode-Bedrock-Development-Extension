import { existsSync } from "fs";
import { Diagnostic } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { GetFilename } from "../../../../Code/File";
import { GetProjectData, ProjectData } from "../../../../Code/include";
import { DocumentReader } from "../../../../Code/Reader";
import { UniformUrl } from "../../../../Code/Url";
import { Console } from "../../../../Console/Console";
import { Manager } from "../../../../Manager/Manager";
import { GeneralDataType } from "../../Format/General Data Type";
import { ContentError, CreateErrors } from "./Errors";
import { GetHeader, ContentLogHeader, CreateDiagnostics } from "./Header";

export function ProcessContentLog(doc: TextDocument): void {
  let PD = GetProjectData();
  PD.then((PD) => {
    if (PD) PrivateProcessContentLog(PD, doc);
  });
}

function PrivateProcessContentLog(PD: ProjectData, doc: TextDocument): void {
  Console.Log("Reading content log: " + GetFilename(doc.uri));
  let Lines: ContentLogHeader[] = [];

  let Reader = new DocumentReader(doc);

  while (Reader.IsReading()) {
    let Line = Reader.ReadLine().trim();

    if (Line === "") continue;

    let Header = GetHeader(Line);

    if (Header) {
      Lines.push(Header);
    }
  }

  Console.Log("Found: " + Lines.length + " lines");
  let Errors = CreateErrors(Lines);

  for (let I = 0; I < Errors.length; I++) {
    let Err = Errors[I];
    let Filepath = UniformUrl(FindFile(PD, Err));
    let diags: Diagnostic[] = [];

    diags.push(CreateDiagnostics(Err.Header));

    Err.Suberrors.forEach((err) => diags.push(CreateDiagnostics(err)));

    //Send the information
    Manager.Connection.sendDiagnostics({ diagnostics: diags, uri: DiagFilepath(PD, Filepath) });
  }
}

function FindFile(PD: ProjectData, Err: ContentError): string {
  let F: string | undefined;

  switch (Err.Type) {
    case GeneralDataType.behaviour_pack:
      F = Check(PD.BehaviourPackFolders, Err.Filepath);
      if (F) {
        return F;
      }
      break;

    case GeneralDataType.resource_pack:
      F = Check(PD.ResourcePackFolders, Err.Filepath);
      if (F) {
        return F;
      }
      break;

    case GeneralDataType.world:
      F = Check(PD.WorldFolders, Err.Filepath);
      if (F) {
        return F;
      }
      break;
  }

  F = Check(PD.BehaviourPackFolders, Err.Filepath);
  if (F) {
    return F;
  }

  F = Check(PD.ResourcePackFolders, Err.Filepath);
  if (F) {
    return F;
  }

  F = Check(PD.WorldFolders, Err.Filepath);
  if (F) {
    return F;
  }

  return "File not found in workspace!!!";
}

function DiagFilepath(PD: ProjectData, filepath: string): string {
  PD.WorldFolders.forEach((ws) => {
    filepath = filepath.replace(ws, "");
  });

  return filepath;
}

function Check(folder: string[], pattern: string): string | undefined {
  for (let index = 0; index < folder.length; index++) {
    let dir = folder[index];
    let Filepath = dir + pattern;

    if (existsSync(Filepath)) {
      return Filepath;
    }
  }

  return undefined;
}
