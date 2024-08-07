import { Languages } from "@blockception/shared";
import { MCAttributes, MCIgnore, MCDefinition } from "bc-minecraft-project";
import path from "path";

/**
 * Returns the language ID based upon the uri
 * @param uri The documents uri
 */
export function identifyDocument(uri: string): string {
  const ext = path.extname(uri).toLowerCase();
  switch (ext) {
    case ".lang":
      return Languages.McLanguageIdentifier;
    case ".json":
      return Languages.JsonIdentifier;
    case ".mcfunction":
      return Languages.McFunctionIdentifier;
    case ".molang":
      return Languages.McMolangIdentifier;
  }

  const filename = path.basename(uri);
  switch (filename) {
    case MCAttributes.filename:
      return Languages.McProjectIdentifier;
    case MCIgnore.filename:
      return Languages.McProjectIdentifier;
    case MCDefinition.filename:
      return Languages.McProjectIdentifier;
  }

  return Languages.McOtherIdentifier;
}
