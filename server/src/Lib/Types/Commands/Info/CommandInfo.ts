import { SignatureInformation } from "vscode-languageserver";
import { MCCommand } from "../Command/MCCommand";

/**
 *
 */
export class CommandInfo {
  /**
   *
   */
  public Command: MCCommand;

  /**
   *
   */
  public Signature: SignatureInformation | undefined;

  constructor(Command: MCCommand) {
    this.Command = Command;
  }

  /**
   *
   * @returns
   */
  GetRequiredAmount(): number {
    for (var I = 0; I < this.Command.parameters.length; I++) {
      const Current = this.Command.parameters[I];

      if (!Current.Required) {
        return I;
      }
    }

    return 0;
  }
}
