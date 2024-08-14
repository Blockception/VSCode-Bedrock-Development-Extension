import { DiagnoserContext } from "bc-minecraft-bedrock-diagnoser";
import { TextDocument } from "../documents/text-document";
import { Glob } from "../../files/glob";
import { MCIgnore, MCProject } from "bc-minecraft-project";
import { IExtendedLogger } from "../logger/logger";
import { ProjectData } from "bc-minecraft-bedrock-project";
import { InternalDiagnoser } from "./diagnoser";
import { IDocumentManager } from "../documents/manager";
import { Emitter } from "vscode-languageserver-protocol";
import { getExtension, Vscode } from "../../util";
import { DataCache } from "../caches";

export class InternalContext implements DiagnoserContext<TextDocument> {
  private getCacheFn: () => ProjectData;
  private logger: IExtendedLogger;
  private documents: IDocumentManager;
  private _onDiagnosingDone: Emitter<InternalDiagnoser>;

  private _getFilesCache: DataCache<string, string[]>;

  constructor(logger: IExtendedLogger, documents: IDocumentManager, getCacheFn: () => ProjectData) {
    this.logger = logger;
    this.getCacheFn = getCacheFn;
    this.documents = documents;

    this._onDiagnosingDone = new Emitter();

    this._getFilesCache = new DataCache(DataCache.defaultTimespan);
    this.documents.onDidSave((e) => this._getFilesCache.clear());
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
    if (project.attributes[`diagnostic${getExtension(doc.uri)}`] === "false") return undefined;

    return new InternalDiagnoser(doc, project, this, (e) => this._onDiagnosingDone.fire(e));
  }

  /**@inheritdoc*/
  getDocument(uri: string): TextDocument | undefined {
    uri = Vscode.fromFs(uri);

    return this.documents.get(uri);
  }

  /**@inheritdoc*/
  getFiles(folder: string, patterns: string[], ignores: MCIgnore): string[] {
    const key = (folder + patterns.join(",") + ignores.patterns.join(","));

    return this._getFilesCache.getOrAdd(key, (k) => {
      return Glob.getFiles(patterns, ignores.patterns, folder);
    });
  }

  /**@inheritdoc*/
  getCache(): ProjectData {
    return this.getCacheFn();
  }
}
