import { DiagnosticsBuilder } from "../Diagnostics/Builder";
import { TextDocument } from "../Types/Document/TextDocument";

/**
 *
 * @param doc
 * @returns
 */
export function ValidateBehaviorFolder(doc: TextDocument): void {
  const SubFolder = GetSubFolder(doc.uri);

  if (!SubFolder) return;

  switch (SubFolder.toLowerCase()) {
    case "animation_controllers":
    case "animations":
    case "blocks":
    case "biomes":
    case "documentation":
    case "entities":
    case "feature_rules":
    case "functions":
    case "loot_tables":
    case "items":
    case "recipes":
    case "scripts":
    case "spawn_rules":
    case "structures":
    case "trading":
    case "texts":
      return;

    default:
      IllegalFolder(doc, SubFolder);
  }
}

/**
 *
 * @param doc
 * @returns
 */
export function ValidateResourceFolder(doc: TextDocument): void {
  const SubFolder = GetSubFolder(doc.uri);

  if (!SubFolder) return;

  switch (SubFolder.toLowerCase()) {
    case "animation_controllers":
    case "animations":
    case "attachables":
    case "blocks":
    case "entity":
    case "fogs":
    case "font":
    case "items":
    case "materials":
    case "models":
    case "particles":
    case "render_controllers":
    case "sounds":
    case "texts":
    case "textures":
    case "ui":
      return;

    default:
      IllegalFolder(doc, SubFolder);
  }
}

/**
 *
 * @param uri
 * @returns
 */
function GetSubFolder(uri: string): string | undefined {
  let match = uri.match(/((rp|bp|RP|BP)\\|(behavior_packs|resource_packs)\\[^\\]+\\)/);

  if (match) {
    let index = 0;
    if (match.index) {
      index = match.index;
    }
    const StartIndex = index + match[0].length;
    const EndIndex = uri.indexOf("\\", StartIndex);

    if (EndIndex < 0) return undefined;
    const element = uri.substring(StartIndex, EndIndex);
    return element;
  }

  return undefined;
}

/**
 *
 * @param doc
 * @param SubFolder
 */
function IllegalFolder(doc: TextDocument, SubFolder: string): void {
  let builder: DiagnosticsBuilder = new DiagnosticsBuilder(doc);
  builder.Add(`Illegal folder found in behavior pack: "${SubFolder}"`);
}
