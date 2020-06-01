import * as vscode from "vscode";
import * as CompletionFunction from "../../general/CompletionFunctions";
import * as SF from "./functions"

export class SelectorCompletion implements vscode.CompletionItemProvider {
  default: vscode.CompletionList;
  letters: vscode.CompletionList;
  firstitems: vscode.CompletionList;
  items: vscode.CompletionList;

  constructor() {
    this.default = new vscode.CompletionList([
      CompletionFunction.createCompletionItem("@a", "All players", "Returns a selector that selects all players"),
      CompletionFunction.createCompletionItem("@e", "All entities", "Returns a selector that selects all entities"),
      CompletionFunction.createCompletionItem("@s", "Executing entity", "Returns a selector that selects the current executing entity"),
      CompletionFunction.createCompletionItem("@r", "Random player/entity", "Returns a selector that a random player, if type is specified then entities are included, use c to target more entities"),
      CompletionFunction.createCompletionItem("@p", "Nearest player", "Returns a selector that selects the nearest player from the execution location"),
      CompletionFunction.createCompletionItem("\"<entity name>\"", "all players", "Returns a example for an named entity")
    ]);

    this.letters = new vscode.CompletionList([
      CompletionFunction.createCompletionItem("a", "All players", "Returns a selector that selects all players"),
      CompletionFunction.createCompletionItem("e", "All entities", "Returns a selector that selects all entities"),
      CompletionFunction.createCompletionItem("s", "Executing entity", "Returns a selector that selects the current executing entity"),
      CompletionFunction.createCompletionItem("r", "Random player/entity", "Returns a selector that a random player, if type is specified then entities are included, use c to target more entities"),
      CompletionFunction.createCompletionItem("p", "Nearest player", "Returns a selector that selects the nearest player from the execution location")
    ]);

    this.items = new vscode.CompletionList([
      CompletionFunction.createCompletionItem(",tag=", "tag", "A tag test"),
      CompletionFunction.createCompletionItem(",x=", "x", "An X Coordinate test"),
      CompletionFunction.createCompletionItem(",y=", "y", "An Y Coordinate test"),
      CompletionFunction.createCompletionItem(",z=", "z", "An Z Coordinate test"),
      CompletionFunction.createCompletionItem(",dx=", "dx", "The length over X of the box to test"),
      CompletionFunction.createCompletionItem(",dy=", "dy", "The length over Y of the box to test"),
      CompletionFunction.createCompletionItem(",dz=", "dz", "The length over Z of the box to test"),
      CompletionFunction.createCompletionItem(",scores={<name>=}", "scores", "The scores to test, can only be one"),
      CompletionFunction.createCompletionItem(",type=", "type", "The type of entity to find"),
      CompletionFunction.createCompletionItem(",c=", "c", "The amount of entities to limit to, negative numbers result in the entites at the end of the list"),
      CompletionFunction.createCompletionItem(",m=", "m", "The gamemode test"),
      CompletionFunction.createCompletionItem(",r=", "r", "The minimum radius test, number included"),
      CompletionFunction.createCompletionItem(",rm=", "rm", "The maximumm radius test, number included"),
      CompletionFunction.createCompletionItem(",team=", "team", "The team test"),
      CompletionFunction.createCompletionItem(",l=", "l", "The minimum xp level test, number included"),
      CompletionFunction.createCompletionItem(",lm=", "lm", "The maximum xp level test, number included"),
      CompletionFunction.createCompletionItem(",name=", "name", "The name of the entity, be be specified between quotes"),
      CompletionFunction.createCompletionItem(",rx=", "rx", "The minimum rotation of the X axis, or up and down, number included"),
      CompletionFunction.createCompletionItem(",rxm=", "rxm", "The maximum rotation of the X axis, or up and down, number included"),
      CompletionFunction.createCompletionItem(",ry=", "ry", "The minimum rotation of the Y axis, or left and right, number included"),
      CompletionFunction.createCompletionItem(",rym=", "rym", "The maximum rotation of the Y axis, or left and right, number included"),
    ]);

    this.firstitems = new vscode.CompletionList([
      CompletionFunction.createCompletionItem("tag=", "tag", "A tag test"),
      CompletionFunction.createCompletionItem("x=", "x", "An X Coordinate test"),
      CompletionFunction.createCompletionItem("y=", "y", "An Y Coordinate test"),
      CompletionFunction.createCompletionItem("z=", "z", "An Z Coordinate test"),
      CompletionFunction.createCompletionItem("dx=", "dx", "The length over X of the box to test"),
      CompletionFunction.createCompletionItem("dy=", "dy", "The length over Y of the box to test"),
      CompletionFunction.createCompletionItem("dz=", "dz", "The length over Z of the box to test"),
      CompletionFunction.createCompletionItem("scores={<name>=}", "scores", "The scores to test, can only be one"),
      CompletionFunction.createCompletionItem("type=", "type", "The type of entity to find"),
      CompletionFunction.createCompletionItem("c=", "c", "The amount of entities to limit to, negative numbers result in the entites at the end of the list"),
      CompletionFunction.createCompletionItem("m=", "m", "The gamemode test"),
      CompletionFunction.createCompletionItem("r=", "r", "The minimum radius test, number included"),
      CompletionFunction.createCompletionItem("rm=", "rm", "The maximumm radius test, number included"),
      CompletionFunction.createCompletionItem("team=", "team", "The team test"),
      CompletionFunction.createCompletionItem("l=", "l", "The minimum xp level test, number included"),
      CompletionFunction.createCompletionItem("lm=", "lm", "The maximum xp level test, number included"),
      CompletionFunction.createCompletionItem("name=", "name", "The name of the entity, be be specified between quotes"),
      CompletionFunction.createCompletionItem("rx=", "rx", "The minimum rotation of the X axis, or up and down, number included"),
      CompletionFunction.createCompletionItem("rxm=", "rxm", "The maximum rotation of the X axis, or up and down, number included"),
      CompletionFunction.createCompletionItem("ry=", "ry", "The minimum rotation of the Y axis, or left and right, number included"),
      CompletionFunction.createCompletionItem("rym=", "rym", "The maximum rotation of the Y axis, or left and right, number included"),
    ]);
  }

  provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    var Line = document.lineAt(position.line);
    var Text = Line.text;

    var C = Text.charAt(position.character - 1);

    switch(C){
      case "[":
      case ",":
        return this.firstitems;

      case "@":
        return this.letters;

      default:
        if (SF.IsInSelector(document, position)) {
          return this.items;
        }
    
        return null;
    }
  }
}
