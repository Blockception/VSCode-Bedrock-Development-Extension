import {
  Diagnoser,
  DiagnoserContext,
  DiagnosticsBuilderContent,
  DiagnosticSeverity,
  ManagedDiagnosticsBuilder
} from "bc-minecraft-bedrock-diagnoser";
import { Console } from "../Manager/Console";
import { DataCache } from "../Types/Cache/Cache";
import { Diagnostic } from "vscode-languageserver";
import { GetDocument } from "../Types/Document/Document";
import { GetRange } from "../Code/DocumentLocation";
import { Glob } from "../Glob/Glob";
import { Manager } from "../Manager/Manager";
import { MCIgnore, MCProject } from "bc-minecraft-project";
import { ProjectData } from "bc-minecraft-bedrock-project";
import { TextDocument } from "../Types/Document/TextDocument";
import { Types } from "bc-minecraft-bedrock-types";

import path from "path";

import * as vscode from "vscode-languageserver";
import * as vstd from "vscode-languageserver-textdocument";

export namespace DiagnoserUtility {
  /**Creates a new bedrock diagnoser
   * @returns A diagnoser*/
  export function createDiagnoser(getCacheFn: () => ProjectData): Diagnoser {
    //create diagnoser
    const context = createContext(getCacheFn);
    const out = new Diagnoser(context);

    return out;
  }

  /**Creates the content for the diagnoser
   * @returns*/
  export function createContext(getCacheFn: () => ProjectData): DiagnoserContext {
    //create context
    return new _InternalDiagnoserContext(getCacheFn);
  }

  type CachedFilesKey = { folder: string; patterns: string[]; ignores: string[] };

  class _InternalDiagnoserContext implements DiagnoserContext {
    private getCacheFn: () => ProjectData;
    private CachedDocuments: DataCache<string, TextDocument | undefined>;
    private CachedPatternFiles: DataCache<string, string[]>;

    constructor(getCacheFn: () => ProjectData) {
      this.getCacheFn = getCacheFn;
      this.CachedDocuments = new DataCache<string, TextDocument | undefined>();
      this.CachedPatternFiles = new DataCache<string, string[]>();
    }

    /**@inheritdoc*/
    getDiagnoser(doc: TextDocument, project: MCProject): ManagedDiagnosticsBuilder<TextDocument> | undefined {
      if (Glob.IsMatch(doc.uri, project.ignores.patterns)) {
        Console.Info("Skipping diagnostics on document, because its ignored: " + doc.uri);
        return undefined;
      }

      //Check if project disabled diagnostics
      if (project.attributes["diagnostic.enable"] === "false") return undefined;
      if (project.attributes["diagnostic" + path.extname(doc.uri)] === "false") return undefined;

      return new _InternalDiagnoser(<vstd.TextDocument>doc, project, this);
    }

    /**@inheritdoc*/
    getDocument(uri: string): TextDocument | undefined {
      //return CachedDocuments.getOrAdd(uri, GetDocument);
      return GetDocument(uri);
    }

    /**@inheritdoc*/
    getFiles(folder: string, patterns: string[], ignores: MCIgnore): string[] {
      //return Glob.GetFiles(patterns, ignores.patterns, folder);

      const key: CachedFilesKey = {
        folder: folder,
        patterns: patterns,
        ignores: ignores.patterns,
      };

      return this.CachedPatternFiles.getOrAdd(JSON.stringify(key), (data) => {
        return Glob.GetFiles(patterns, ignores.patterns, folder);
      });
    }

    /**@inheritdoc*/
    getCache(): ProjectData {
      return this.getCacheFn();
    }
  }

  /**Make sure the given text document is from <vstd.TextDocument>*/
  class _InternalDiagnoser implements ManagedDiagnosticsBuilder<TextDocument> {
    public doc: vstd.TextDocument;
    public Items: Diagnostic[];
    public context: DiagnosticsBuilderContent<TextDocument>;
    public project: MCProject;

    /**@inheritdoc*/
    constructor(doc: vstd.TextDocument, project: MCProject, context: DiagnosticsBuilderContent<TextDocument>) {
      this.doc = doc;
      this.Items = [];

      this.project = project;
      this.context = context;
    }

    /**@inheritdoc*/
    done(): void {
      Manager.Diagnostic.SendDiagnostics(this.doc, this.Items);
    }

    /**@inheritdoc*/
    add(position: Types.DocumentLocation, message: string, severity: DiagnosticSeverity, code: string | number): void {
      //Was diagnostics code disabled
      if (this.project.attributes["diagnostic.disable." + code] === "true") return;

      const Error: Diagnostic = {
        message: message,
        code: code,
        severity: getSeverity(severity),
        range: GetRange(position, this.doc),
        source: "mc",
      };

      if (typeof code === "number") {
        Error.codeDescription = {
          href: `https://github.com/Blockception/Minecraft-Error-Codes/blob/main/codes/main.md#${code}`,
        };
      } else {
        Error.codeDescription = {
          href: `https://github.com/Blockception/Minecraft-Error-Codes/blob/main/${code.replace(/\./gi, "/")}.md`,
        };
      }

      this.Items.push(Error);
    }
  }

  /**
   *
   * @param severity
   * @returns
   */
  function getSeverity(severity: DiagnosticSeverity): vscode.DiagnosticSeverity {
    switch (severity) {
      case DiagnosticSeverity.info:
        return vscode.DiagnosticSeverity.Information;

      case DiagnosticSeverity.none:
        return vscode.DiagnosticSeverity.Hint;

      case DiagnosticSeverity.warning:
        return vscode.DiagnosticSeverity.Warning;

      case DiagnosticSeverity.error:
      default:
        return vscode.DiagnosticSeverity.Error;
    }
  }
}
