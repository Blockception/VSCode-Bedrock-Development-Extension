import { GetFilename, Vscode } from "../Code/include";
import { DocumentSymbolParams, SymbolInformation, SymbolKind, Location, Range, WorkspaceSymbolParams } from "vscode-languageserver";

/**
 * The request to provide document symbols, asynchorious
 *
 * @param params The parameter that specify which symbols to provide
 */
export async function OnDocumentSymbolRequestAsync(params: DocumentSymbolParams): Promise<SymbolInformation[] | undefined> {
  return new Promise<SymbolInformation[] | undefined>((resolve, reject) => {
    resolve(OnDocumentSymbolRequest(params));
  });
}

/**
 * The request to provide workspace symbols, asynchorious
 *
 * @param params The parameter that specify which symbols to provide
 */
export async function OnWorkspaceSymbolRequestAsync(params: WorkspaceSymbolParams): Promise<SymbolInformation[]> {
  return new Promise<SymbolInformation[]>((resolve, reject) => {
    resolve(OnWorkspaceSymbolRequest(params));
  });
}

/**
 * The request to provide document symbols
 *
 * @param params The parameter that specify which symbols to provide
 */
function OnDocumentSymbolRequest(params: DocumentSymbolParams): SymbolInformation[] | undefined {
  //TODO language and other files included
  let uri = params.textDocument.uri;
  uri = Vscode.UniformUrl(uri);

  if (uri.endsWith(".json")) return undefined;

  const Out: SymbolInformation[] = [];

  Out.push({
    kind: SymbolKind.Class,
    location: Location.create(uri, Range.create(0, 0, 0, 0)),
    name: GetFilename(uri),
  });

  //TODO redo
  //ConvertAllFile(uri, Out);

  return Out;
}

/**
 * The request to provide workspace symbols
 *
 * @param params The parameter that specify which symbols to provide
 */
function OnWorkspaceSymbolRequest(params: WorkspaceSymbolParams): SymbolInformation[] {
  let Query = params.query;
  let Out: SymbolInformation[] = [];

  //TODO redo
  //ConvertQueried("", Out, Query);

  return Out;
}
