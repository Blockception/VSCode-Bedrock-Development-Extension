import { CancellationToken, CodeLens, Position, Uri, workspace } from "vscode";
import { Command, ResolveCodeLensSignature } from "vscode-languageclient";
import { GetPosition } from "../code/document-location";

export function resolveCodeLens(
  codeLens: CodeLens,
  token: CancellationToken,
  next: ResolveCodeLensSignature
): Thenable<CodeLens> {
  const command = codeLens.command;

  if (!command) {
    if (hasData(codeLens)) {
      const data = codeLens.data;

      if (isBaseObject(data)) {
        const uri = Uri.parse(data.location.uri);
        return workspace.openTextDocument(uri).then((doc) => {
          const p = GetPosition(data.location.position, doc);
          const title = data.documentation ? 
            data.documentation.replace(':', ' |') :
            data.id;

          codeLens.command = Command.create(
            title,
            "editor.action.goToLocations",
            uri,
            p,
            [],
            "gotoAndPeek"
          );

          return codeLens;
        });
      }
    }
  }

  next(codeLens, token);
  return Promise.resolve(codeLens);
}

interface CodeLensData {
  data: any;
}

function hasData(value: any): value is CodeLensData {
  if (typeof value.data === "object") return true;

  return false;
}

interface BaseObject {
  id: string;
  location: { uri: string; position: string | number | Position };
  documentation?: string;
}

function isBaseObject(value: any): value is BaseObject {
  if (typeof value === "object") {
    if (typeof value.id === "string" && typeof value.location === "object") return true;
  }

  return false;
}
