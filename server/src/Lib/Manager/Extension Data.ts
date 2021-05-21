import { TextDocuments } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { MolangData } from "../Molang/MolangData";
import { CommandManager } from "../Types/Commands/Manager/include";

/**
 *
 */
export class ExtensionData {
  /**
   * The command manager that stores all the minecraft commands
   */
  public Commands: CommandManager = new CommandManager();

  /**
   * The molang data manager that stores all default molang values
   */
  public Molang: MolangData = new MolangData();

  /**
   * The document manager that has possible cached documents, use GetDocument!
   */
  public Documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);
}
