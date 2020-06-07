import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of tellraw
export const tellrawTree = createtellraw();

function createtellraw() : CommandStructureTree {
	var Tree = new CommandStructureTree("tellraw");
	Tree.Description = "Sends a JSON message to players.";
	Tree.CanEnd = true;

	var item_player = Tree.Add("player", CommandStructureType.Target);
	item_player.Description = "player";
	item_player.IsOptional = false;

	var item_json = item_player.Add("json", CommandStructureType.Json);
	item_json.Description = "the tellraw";
	item_json.IsOptional = false;

	return Tree;
}
