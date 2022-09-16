import { Database } from "../Database";
import { TemplateFallback } from "./Data";
import * as fs from "fs";
import { FunctionContext, TemplateFunctions } from "./Functions";
import { FileBuilder } from "../Files/FileBuilder";

export class TemplateProcessor {
  protected _filename: string;
  protected _content: string;
  public processor: TemplateFunctions;

  constructor(filename: string, content: string, templateId: string, folder: string) {
    this._filename = filename;
    this._content = content;

    const context: FunctionContext = {
      filename: filename,
      folder: folder,
      attributes: {},
      pack: Database.ProjectData.get(folder)?.folder || "",
      templateID: templateId,
    };

    this.processor = new TemplateFunctions(context);
  }

  /**
   *
   * @returns
   */
  public async CreateFile(): Promise<void> {
    const fileBuilder = new FileBuilder();
    fileBuilder.CreateFile(this._filename, this._content);

    return fileBuilder.Send();
  }
}

const errorFallback = {
  filename: () => {
    throw new Error("No fallback filename provided");
  },
  content: () => {
    throw new Error("No fallback content provided");
  },
};

/**
 *
 */
export namespace TemplateProcessor {
  /**
   *
   * @param template
   * @param folder
   * @param fallback
   * @returns
   */
  export function create(template: string, folder: string, fallback?: TemplateFallback): TemplateProcessor {
    fallback = fallback || errorFallback;
    const ws = Database.WorkspaceData.getFolder(folder);
    if (ws === undefined) {
      throw new Error("No workspace found");
    }

    const project = Database.WorkspaceData.getProject(ws);
    const filename = project.attributes[`template.${template}.filename`] || fallback.filename();

    const file = project.attributes[`template.${template}.file`];
    let content = "";

    if (file && fs.existsSync(file)) {
      content = fs.readFileSync(file, "utf8");
    } else {
      content = fallback.content();
    }

    return new TemplateProcessor(filename, content, template, folder);
  }
}
