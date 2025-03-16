import { BehaviorPack, Pack } from "bc-minecraft-bedrock-project";
import { CancellationToken } from "vscode-languageserver-protocol";
import { MinecraftFormat } from "../../minecraft/format";
import { getProject } from "../../project/mcprojects";
import { Fs, getBasename, getFilename, Processor } from "../../util";
import { ExtensionContext } from "../extension";
import { IExtendedLogger } from "../logger/logger";
import { ProgressBar } from "../progress";
import { BaseService } from "../services/base";
import { DocumentProcessor } from "./document-processor";
import { isDirectory } from "../../io/io";

export class PackProcessor extends BaseService {
  name: string = "pack processor";
  private _documentProcessor: DocumentProcessor;

  constructor(logger: IExtendedLogger, extension: ExtensionContext, documentProcessor: DocumentProcessor) {
    super(logger.withPrefix("[pack pros]"), extension);
    this._documentProcessor = documentProcessor;
  }

  async process(pack: Pack, token?: CancellationToken): Promise<void> {
    const start = Date.now();
    const name = getBasename(Fs.FromVscode(pack.folder));
    const reporter = await ProgressBar.create(this.extension, `pack: ${name}`);
    reporter.sendMessage("processing");
    this.logger.info(`processing pack: ${name}`, {
      uri: pack.folder,
      type: pack.type,
    });

    const files = this.files(pack);
    await Processor.forEach(
      files,
      (file) => {
        reporter.sendMessage(getFilename(file));
        const doc = this._documentProcessor.get(file);
        if (doc === undefined) return;

        return this._documentProcessor.process(doc);
      },
      token
    );

    if (BehaviorPack.BehaviorPack.is(pack)) {
      this.logger.debug("checking structures");
      const structures = MinecraftFormat.GetStructureFiles(pack.folder, pack.context.ignores.patterns);

      const emptyText = () => "";
      structures.forEach((item) => pack.process({ getText: emptyText, uri: item }));
    }

    this.logger.debug("processed pack", {
      uri: pack.folder,
      type: pack.type,
      files: files.length,
      ms: Date.now() - start
    })
    reporter.done();
  }

  remove(pack: Pack) {
    const pd = this.extension.database.ProjectData;
    pd.deleteFolder(pack.folder);

    this.removePack(pd.behaviorPacks.packs, pack.folder, pd.behaviorPacks.delete);
    this.removePack(pd.resourcePacks.packs, pack.folder, pd.resourcePacks.delete);
    this.removePack(pd.worlds.packs, pack.folder, pd.worlds.delete);
  }

  private removePack(packs: Pack[], uri: string, deletefn: (folder: string) => boolean): void {
    for (let I = 0; I < packs.length; I++) {
      const p = packs[I];

      if (p.folder.startsWith(uri)) deletefn(p.folder);
    }
  }

  diagnose(pack: Pack, token?: CancellationToken) {
    this.logger.info(`diagnosing pack: ${pack.folder}`);
    const files = this.files(pack);

    return Processor.forEach(
      files,
      (file) => {
        const doc = this._documentProcessor.get(file);
        if (doc === undefined) return;

        return this._documentProcessor.diagnose(doc);
      },
      token
    ).finally(() => {
      this.logger.info("pack diagnosed", {
        files: files.length,
      });
    });
  }

  /**
   *
   * @param folder The vscode uri of the base folder to start explorer from
   * @returns
   */
  async discover(folder: string): Promise<Pack[]> {
    const folderPath = Fs.FromVscode(folder);
    this.logger.info(`discovery packs from: ${folderPath}`);

    if (!isDirectory(folderPath, this.logger)) {
      return [];
    }

    const project = getProject(folderPath, this.extension.settings);
    this.extension.database.WorkspaceData.set(folder, project);

    const manifests = MinecraftFormat.GetManifests(folder, project.ignores.patterns);
    const packs: Pack[] = [];

    manifests.forEach((m) => {
      const pack = this.extension.database.ProjectData.addPack(m, project);
      if (pack === undefined) return;

      packs.push(pack);
    });

    return packs;
  }

  /**
   *
   * @param folder The vscode uri of the base folder to start explorer from
   * @returns
   */
  get(): Pack[] {
    return this.extension.database.getPacks();
  }

  files(pack: Pack): string[] {
    return MinecraftFormat.GetPackFiles(pack);
  }
}
