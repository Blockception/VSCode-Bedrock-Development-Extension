import { mkdirSync, writeFileSync } from "fs";
import { Fs } from "../../../util";
import { Context } from "../../context/context";
import { IExtendedLogger } from "../../logger/logger";
import { CommandContext } from "../context";
import { getWorkspace } from "../util";
import { exists } from '../../../io/io';

import path from "path";

export async function storeProject(context: Context<CommandContext>) {
  const { logger, database } = context;
  const workspaceProcessor = getWorkspace(context);
  const ws = await workspaceProcessor.get();
  if (ws === undefined || ws === null) {
    throw new Error("couldn't find workspaces");
  }

  const folder = Fs.FromVscode(ws[0].uri);
  const outputfolder = path.join(folder, ".minecraft");

  if (!exists(outputfolder, context.logger)) mkdirSync(outputfolder);

  database.projectData.behaviorPacks.packs.forEach(createGenerator(logger, "bp_pack", outputfolder));
  database.projectData.resourcePacks.packs.forEach(createGenerator(logger, "rp_pack", outputfolder));
  database.workspaceData.forEach(createGenerator(logger, "workspace", outputfolder));
  database.projectData.general.forEach(createGenerator(logger, "general", outputfolder));
}

function createGenerator<T>(logger: IExtendedLogger, type: string, outputfolder: string) {
  let count = 0;

  return function (data: T) {
    const filepath = path.join(outputfolder, `${type}_${count++}.json`);
    convertStore(logger, filepath, data);
  };
}

function convertStore(logger: IExtendedLogger, filepath: string, data: any): void {
  const temp: Record<string, any> = {};

  convert(data, temp);
  storeObject(logger, filepath, temp);
}

function convert(data: any, receiver: Record<string, any>) {
  const names = Object.getOwnPropertyNames(data);

  for (let I = 0; I < names.length; I++) {
    const name = names[I];
    const value = data[name];

    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      receiver[name] = value;
    } else if (value.forEach) {
      const values: any[] = [];

      value.forEach((item: any) => values.push(item));

      receiver[name] = values;
    } else if (typeof value === "object") {
      receiver[name] = value;
    }
  }
}

function storeObject(logger: IExtendedLogger, path: string, data: any): void {
  try {
    const content = JSON.stringify(data);
    writeFileSync(path, content);
  } catch (err) {
    logger.recordError(err);
  }
}
