import { Location } from "vscode-languageserver";
import { MarkupContent } from "vscode-languageserver";
import { Identifiable, Locatable, Documentable } from "../../Minecraft/Interfaces/include";
import { EmptyTypes } from "../Empty";

export class ObjectBase implements Identifiable, Locatable, Documentable {
  public Identifier: string;
  public Location: Location;
  public Documentation: MarkupContent;

  constructor() {
    this.Identifier = "";
    this.Documentation = EmptyTypes.EmptyDocumentation();
    this.Location = EmptyTypes.EmptyLocation();
  }
}
