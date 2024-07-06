import { Text } from 'bc-minecraft-bedrock-project';
import { CodeAction, CodeActionKind, CodeActionParams, Command, Range } from "vscode-languageserver";
import { GetDocument } from "../Types/Document/Document";
import { TextDocument } from '../Types/Document/TextDocument';

/** */
export class CodeActionBuilder {
  /** */
  public params: CodeActionParams;
  /** */
  out: (Command | CodeAction)[];

  public doc : TextDocument;


  /** */
  constructor(params: CodeActionParams, doc : TextDocument) {
    this.params = params;
    this.out = [];
    this.doc = doc
  }

  /**
   * 
   * @returns 
   */
  getText(range : Range | undefined): string {
    return this.doc.getText(range ?? this.params.range);
  }

  getId(range : Range | undefined) : string {
    let id = this.getText(range);

    return Text.UnQuote(id);
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
   * @param commandId
   * @param args
   * @returns
   */
  Command(title: string, commandId: string, args: string[] | undefined): Command {
    const item: Command = { command: commandId, title: title, arguments: args };

    this.out.push(CodeAction.create(title, item, CodeActionKind.QuickFix));

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
