import { Manifest } from 'bc-minecraft-bedrock-project/lib/src/Lib/Internal/include';
import { JsonDocument } from "../../../Types/Document/Json Document";

export function AddBlockception(uri: string): void {
  const doc = JsonDocument.GetDocument(uri);

  if (doc === undefined) return;

	const manifest = doc.CastTo<Manifest>();
	
	if (!Manifest.is(manifest)) return;

	let save = false;
}
