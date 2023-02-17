import { exec } from "child_process";
import { readdir, readFile } from "fs/promises";
import { join, resolve as resolvePath } from "path";
import { commands, ExtensionContext, Uri, window } from "vscode";
import { Commands, VanillaPacks } from "../../Constants";
import { jsonc } from "jsonc";

export function Activate(context: ExtensionContext): void {
  context.subscriptions.push(commands.registerCommand(Commands.ShowVanillaFile, ShowVanillaFile));
}

var dataDir: string = "";
var vanillaFiles: Map<string, Map<string, string>> = new Map();
const exclude:string[] = ['behavior_trees', 'contents.json']

function ShowVanillaFile(args: any): any {
  FindAllVanillaFiles().then(() => {
    let options: [string, string][] = [];
    let keys: string[] = [];
    vanillaFiles.forEach((files, prefix) => {
      files.forEach((file, relative) => {
        options.push([prefix + ": " + relative, file]);
        keys.push(prefix + ": " + relative);
      });
    });
    window.showQuickPick(keys).then((key) => {
      if (key) {
        let file = options.find((option) => option[0] === key);
        if (file) {
          window.showTextDocument(Uri.file(file[1]), {
            preview: false,
          });
        }
      }
    });
  });
}

function FindDataDir(): Promise<string> {
  if (dataDir !== "") {
    return Promise.resolve(dataDir);
  }
  // Check if windows
  if (process.platform !== "win32") {
    return Promise.reject("This command is only supported on windows");
  }
  // Find data dir
  return new Promise((resolve, reject) => {
    exec(VanillaPacks.MinecraftInstallLocationCommand, { shell: "powershell.exe" }, (error, stdout, stderr) => {
      if (error) {
        reject("Failed to find Minecraft data directory: " + error.message);
      }
      if (stderr) {
        reject("Failed to find Minecraft data directory: " + stderr);
      }
      dataDir = join(stdout.trim(), "data");
      resolve(dataDir);
    });
  });
}

function FindAllVanillaFiles(): Promise<void | [any, any]> {
  return FindDataDir().then((dir) => {
    return Promise.all([
      FindVanillaFiles(join(dir, "behavior_packs"), VanillaPacks.VanillaBehaviorPackUUID, "BP"),
      FindVanillaFiles(join(dir, "resource_packs"), VanillaPacks.VanillaResourcePackUUID, "RP"),
    ]);
  });
}

function FindVanillaFiles(dir: string, uuid: string, prefix: string): any {
  return readdir(dir)
    .then((files) => {
      return Promise.all(
        files.map((file) =>
          readFile(join(dir, file, "manifest.json")).then((data) => [file, jsonc.parse(data.toString())])
        )
      );
    })
    .then((packs) => {
      return new Promise(async (resolve, reject) => {
        vanillaFiles.set(prefix, new Map());
        packs = packs
          .filter((pack) => pack && pack[1] && pack[1].header && pack[1].header.uuid === uuid)
          .sort((a, b) => compareSemver(a[1].header.version, b[1].header.version));
          for (const pack of packs) {
            let base = join(dir, pack[0]);
            let files = await getFiles(base)
              files
                .filter((file) => file.endsWith(".json") && !exclude.some((ex) => file.includes(ex)))
                .forEach((file) => {
                  let relative = file.substring(base.length + 1);
                  vanillaFiles.get(prefix)?.set(relative, file);
            });
          }
          resolve(null);
      });
    });
}

function compareSemver(a: [number, number, number], b: [number, number, number]): number {
  if (a[0] === b[0]) {
    if (a[1] === b[1]) {
      return a[2] - b[2];
    }
    return a[1] - b[1];
  }
  return a[0] - b[0];
}

// From https://stackoverflow.com/a/45130990
async function getFiles(dir: string): Promise<string[]> {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files: any = await Promise.all(
    dirents.map((dirent) => {
      const res = resolvePath(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}
