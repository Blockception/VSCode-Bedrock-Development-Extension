import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of tellraw
export const tellrawTree = createtellraw();

function createtellraw() : CommandStructureTree {
	var Tree = new CommandStructureTree("tellraw");
	Tree.Description = "Sends a JSON message to players.";
	Tree.CanEnd = true;

	var item_player = Tree.Add("player", CommandStructureType.Any);
	item_player.Description = "player";
	item_player.IsOptional = false;

	var item_{"rawtext"[{"text"""},"",{"translate"""}]} = item_player.Add("{ "rawtext": [ { "text": "" }, "", { "translate": "" } ] }", CommandStructureType.Any);
	item_{"rawtext"[{"text"""},"",{"translate"""}]}.Description = "{ "rawtext": [ { "text": "" }, "", { "translate": "" } ] }";
	item_{"rawtext"[{"text"""},"",{"translate"""}]}.IsOptional = false;

	return Tree;
}
