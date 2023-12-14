import * as vscode from "vscode-languageserver-textdocument";
import * as mcbe from "bc-minecraft-bedrock-project";
import { Database } from "../../Database/Database";
import { MCProject } from "bc-minecraft-project";
import { MCProjectprovider } from '../../Project/Interfaces';

/**
 *
 */
export interface TextDocument extends vscode.TextDocument, mcbe.TextDocument, MCProjectprovider {
  /**Returns the text at the given text line
   * @param lineIndex The index of the line to retrieve
   */
  getLine(lineIndex: number): string;

  /**
   *
   */
  getConfiguration(): MCProject;

  /**
   *
   */
  getPack(): mcbe.Pack | undefined;
}

export namespace TextDocument {
  /**
   *
   * @param doc
   * @returns
   */
  export function wrap(doc: vscode.TextDocument): TextDocument {
    const out = doc as InternalTextDocument;
    out.__pack = null;

    out.getLine = function getLine(lineIndex: number): string {
      return out.getText({ start: { line: lineIndex, character: 0 }, end: { line: lineIndex, character: Number.MAX_VALUE } });
    };

    out.getPack = function getPack(): mcbe.Pack | undefined {
      if (out.__pack) return out.__pack;

      return (out.__pack = Database.ProjectData.get(out.uri));
    };

    out.getConfiguration = function getConfiguration(): MCProject {
      return out.getPack()?.context ?? Database.WorkspaceData.getProject(out.uri);
    };

    return out;
  }

  export function create(uri: vscode.DocumentUri, languageId: string, version: number, content: string): TextDocument {
    return wrap(vscode.TextDocument.create(uri, languageId, version, content));
  }
}

interface InternalTextDocument extends TextDocument {
  /**A hidden field that helps with storing the cache */
  __pack: mcbe.Pack | null | undefined;
}
