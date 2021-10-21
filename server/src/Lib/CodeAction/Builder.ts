import { CodeAction, CodeActionParams, Command, Range } from "vscode-languageserver";
import { GetDocument } from "../Types/Document/Document";

/** */
export class CodeActionBuilder {
  /** */
  public params: CodeActionParams;
  /** */
  out: (Command | CodeAction)[];

  /** */
  constructor(params: CodeActionParams) {
    this.params = params;
    this.out = [];
  }

  /**
   * 
   * @returns 
   */
  getText(range : Range | undefined): string {
    const doc = GetDocument(this.params.textDocument.uri);
    if (!doc) return "";
    return doc.getText(range ?? this.params.range);
  }

  /** */
  Push(item: Command | CodeAction | undefined): Command | CodeAction | undefined {
    if (item) {
      this.out.push(item);
    }

    return item;
  }

  /**
   *
   * @param title
   * @param commandid
   * @param args
   * @returns
   */

  Command(title: string, commandid: string, args: string[] | undefined): Command {
    const item: Command = { command: commandid, title: title, arguments: args };

    this.out.push(CodeAction.create(title, item, "create"));

    return item;
  }

  /**
   *
   * @param title
   * @returns
   */
  Action(title: string): CodeAction {
    const item: CodeAction = {
      title: title,
    };

    this.out.push(item);

    return item;
  }
}
