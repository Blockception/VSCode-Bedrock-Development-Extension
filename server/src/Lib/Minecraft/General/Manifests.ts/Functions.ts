import { Manifest } from "bc-minecraft-bedrock-project/lib/src/Lib/Internal/include";
import { JsonDocument } from "../../../Types/Document/Json Document";

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

  let generated_with = metadata.generated_with;

  if (metadata.generated_with === undefined) {
    save = true;
    generated_with = {};
    metadata.generated_with = generated_with;
  }
}
