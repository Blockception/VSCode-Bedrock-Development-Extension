import { BehaviorPack, Pack } from "bc-minecraft-bedrock-project";
import { ExtensionContext } from "../extension/context";
import { IExtendedLogger } from "../logger/logger";
import { BaseService } from "../services/base";
import { DocumentProcessor } from "./document-processor";
import { ProgressBar } from "../progress";
import { Fs, getFilename } from "../../util";
import { QueueProcessor } from "@daanv2/queue-processor";
import { lstatSync } from "fs";
import { getProject } from "../../project/mcprojects";
import { Database } from "../database/database";
import { MinecraftFormat } from "../../minecraft/format";

export class PackProcessor extends BaseService {
  name: string = "pack processor";
  private _documentProcessor: DocumentProcessor;

  constructor(logger: IExtendedLogger, extension: ExtensionContext, documentProcessor: DocumentProcessor) {
    super(logger.withPrefix("[pack pros]"), extension);
    this._documentProcessor = documentProcessor;
  }

  async process(pack: Pack, reporter?: ProgressBar): Promise<void> {
    const name = getFilename(pack.folder);
    reporter = reporter || (await ProgressBar.create(this.extension, `pack: ${name}`));
    reporter.sendMessage("processing");
    this.logger.info(`Processing pack: ${name}`, {
      uri: pack.folder,
      type: pack.type,
    });

    const files = this.files(pack);
    await QueueProcessor.forEach(files, (file) => {
      reporter.sendMessage(getFilename(file));
      const doc = this._documentProcessor.get(file);
      if (doc === undefined) return;

      return this._documentProcessor.process(doc);
    });

    if (BehaviorPack.BehaviorPack.is(pack)) {
      this.logger.debug("checking structures");
      const structures = MinecraftFormat.GetStructureFiles(pack.folder, pack.context.ignores.patterns);

      const emptyText = () => "";
      structures.forEach((item) => {
        pack.process({ getText: emptyText, uri: item });
      });
    }
  }

  remove(pack: Pack) {
    const pd = this.extension.database.ProjectData;
    pd.deleteFolder(pack.folder);

    this.removePack(pd.behaviorPacks.packs, pack.folder, pd.behaviorPacks.delete);
    this.removePack(pd.resourcePacks.packs, pack.folder, pd.resourcePacks.delete);
    this.removePack(pd.worlds.packs, pack.folder, pd.worlds.delete);
  }

  private removePack(packs: Pack[], uri: string, deletefn: (folder: string) => boolean): void {
    for (var I = 0; I < packs.length; I++) {
      const p = packs[I];

      if (p.folder.startsWith(uri)) deletefn(p.folder);
    }
  }

  diagnose(pack: Pack) {
    this.logger.info(`diagnosing pack: ${pack.folder}`);
    const files = this.files(pack);

    return QueueProcessor.forEach(files, (file) => {
      const doc = this._documentProcessor.get(file);
      if (doc === undefined) return;

      return this._documentProcessor.diagnose(doc);
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

    if (!lstatSync(folderPath).isDirectory()) {
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
