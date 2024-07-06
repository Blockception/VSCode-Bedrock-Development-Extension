import { Database } from "../Database";
import { FileBuilder } from "../Files/FileBuilder";
import { Fs, Vscode } from "../Code";
import { FunctionContext, TemplateFunctions } from "./Functions";
import { TemplateFallback } from "./Data";

import path from "path";
import * as fs from "fs";

export class TemplateProcessor {
  protected _filename: string;
  protected _content: string;
  public processor: TemplateFunctions;

  constructor(
    filename: string,
    content: string,
    templateId: string,
    folder: string,
    attributes: Record<string, string>
  ) {
    this._filename = filename;
    this._content = content;

    const context: FunctionContext = {
      filename: filename,
      folder: folder,
      attributes: attributes,
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
    const filepath = Vscode.join(this.processor._context.folder, this._filename);

    fileBuilder.CreateFile(filepath, this._content);

    return fileBuilder.Send();
  }

  public Process(): void {
    this._filename = this.processor.process(this._filename);
    this._content = this.processor.process(this._content);
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
  export function create(
    template: string,
    folder: string,
    attributes: Record<string, string> = {},
    fallback?: TemplateFallback
  ): TemplateProcessor {
    fallback = fallback || errorFallback;
    let ws = Database.WorkspaceData.getFolder(folder);
    if (ws === undefined) {
      throw new Error("No workspace found");
    }

    const project = Database.WorkspaceData.getProject(ws);
    const attr = template.replace("-", ".");
    const filename = project.attributes[`template.${attr}.filename`] || fallback.filename();
    const file = project.attributes[`template.${attr}.file`];
    let content = undefined;

    if (file) {
      const filepath = path.resolve(Fs.FromVscode(ws), file);
      if (fs.existsSync(filepath)) {
        content = fs.readFileSync(file, "utf8");
      }
    }

    if (content === undefined || content === "") {
      content = fallback.content();
    }

    return new TemplateProcessor(filename, content, template, folder, attributes);
  }
}
