import { Internal } from "bc-minecraft-bedrock-project";
import { writeFile } from "fs";
import { Fs, Vscode } from "../../../Code/Url";
import { ToolIdentification } from "@blockception/shared";
import { JsonDocument } from "../../../Types/Document/Json Document";
import { Version } from "../../../Version";
import * as JSONC from "comment-json";
import { HandleError } from "../../../Code/Error";
import { Manager } from "../../../Manager/Manager";
import { Pack } from "bc-minecraft-bedrock-project";
import { Manifest } from "bc-minecraft-bedrock-project/lib/src/lib/Internal/Types";

export function AddBlockceptionToPack(pack: Pack | undefined): void {
  if (pack === undefined) return;

  const uri = Vscode.join(pack.folder, "manifest.json");

  AddBlockception(uri);
}

export function AddBlockception(uri: string): void {
  const doc = JsonDocument.GetDocument(uri);

  if (doc === undefined) return;

  const manifest = doc.CastTo<Manifest>();

  if (!Manifest.is(manifest)) return;

  let save = false;
  let metadata = manifest.metadata;

  if (metadata === undefined) {
    save = true;
    metadata = {};
    manifest.metadata = metadata;
  }

  let generated_with: Record<string, string[]> | undefined = metadata.generated_with;

  if (generated_with === undefined) {
    save = true;
    generated_with = {};
    metadata.generated_with = generated_with;
  }

  let bc = generated_with[ToolIdentification];

  if (bc === undefined) {
    save = true;
    bc = [];
    generated_with[ToolIdentification] = bc;
  }

  if (!bc.includes(Version)) {
    save = true;
    bc.push(Version);
    bc.sort();
  }

  if (save) {
    const fspath = Fs.FromVscode(doc.doc.uri);
    const json = JSONC.stringify(manifest, undefined, "  ");

    try {
      writeFile(fspath, json, { encoding: "utf8" }, () => {});
    } catch (err) {
      Manager.Connection.window.showWarningMessage(
        "Sorry tried to append tool information to the manifest but something went wrong"
      );
      HandleError(err);
    }
  }
}
