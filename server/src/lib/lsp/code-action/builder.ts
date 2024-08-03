import { Text } from "bc-minecraft-bedrock-project";
import { CodeAction, CodeActionKind, CodeActionParams, Command, Range } from "vscode-languageserver";
import { Context } from "../context/context";
import { CodeActionContext } from "./context";

/** */
export class CodeActionBuilder {
  /** */
  public params: CodeActionParams;
  /** */
  out: (Command | CodeAction)[];

  public context: Context<CodeActionContext>;

  /** */
  constructor(params: CodeActionParams, context: Context<CodeActionContext>) {
    this.params = params;
    this.context = context;

    this.out = [];
  }

  /**
   *
   * @returns
   */
  getText(range: Range | undefined): string {
    return this.context.document.getText(range ?? this.params.range);
  }

  getId(range: Range | undefined): string {
    const id = this.getText(range);

    return Text.UnQuote(id);
  }

  /** */
  push(item: Command | CodeAction | undefined): Command | CodeAction | undefined {
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
  command(title: string, commandId: string, args: string[] | undefined): Command {
    const item: Command = { command: commandId, title: title, arguments: args };

    this.out.push(CodeAction.create(title, item, CodeActionKind.QuickFix));

    return item;
  }

  /**
   *
   * @param title
   * @returns
   */
  action(title: string): CodeAction {
    const item: CodeAction = {
      title: title,
    };

    this.out.push(item);

    return item;
  }
}
