import { DiagnoserContext } from "bc-minecraft-bedrock-diagnoser";
import { TextDocument } from "../documents/text-document";
import { Glob } from "../../files/glob";
import { MCIgnore, MCProject } from "bc-minecraft-project";
import { IExtendedLogger } from "../logger/logger";
import { ProjectData } from "bc-minecraft-bedrock-project";
import { InternalDiagnoser } from "./diagnoser";
import { IDocumentManager } from "../documents/manager";

import path from "path";
import { Emitter } from "vscode-languageserver-protocol";

export class InternalContext implements DiagnoserContext<TextDocument> {
  private getCacheFn: () => ProjectData;
  private logger: IExtendedLogger;
  private documents: IDocumentManager;
  private _onDiagnosingDone: Emitter<InternalDiagnoser>;

  constructor(logger: IExtendedLogger, documents: IDocumentManager, getCacheFn: () => ProjectData) {
    this.logger = logger;
    this.getCacheFn = getCacheFn;
    this.documents = documents;

    this._onDiagnosingDone = new Emitter();
  }

  get onDiagnosingFinished() {
    return this._onDiagnosingDone.event;
  }

  /**@inheritdoc*/
  getDiagnoser(doc: TextDocument, project: MCProject): InternalDiagnoser | undefined {
    if (Glob.isMatch(doc.uri, project.ignores.patterns)) {
      this.logger.info("Skipping diagnostics on document, because its ignored: " + doc.uri);
      return undefined;
    }

    //Check if project disabled diagnostics
    if (project.attributes["diagnostic.enable"] === "false") return undefined;
    if (project.attributes["diagnostic" + path.extname(doc.uri)] === "false") return undefined;

    return new InternalDiagnoser(doc, project, this, (e) => this._onDiagnosingDone.fire(e));
  }

  /**@inheritdoc*/
  getDocument(uri: string): TextDocument | undefined {
    //return CachedDocuments.getOrAdd(uri, GetDocument);
    return this.documents.get(uri);
  }

  /**@inheritdoc*/
  getFiles(folder: string, patterns: string[], ignores: MCIgnore): string[] {
    return Glob.getFiles(patterns, ignores.patterns, folder);
  }

  /**@inheritdoc*/
  getCache(): ProjectData {
    return this.getCacheFn();
  }
}
