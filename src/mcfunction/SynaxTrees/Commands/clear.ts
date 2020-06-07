import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of clear
export const clearTree = createclear();

function createclear() : CommandStructureTree {
	var Tree = new CommandStructureTree("clear");
	Tree.Description = "Clears items from player inventory.";
	Tree.CanEnd = true;

	var item_playertarget = Tree.Add("player: target", CommandStructureType.Target);
	item_playertarget.Description = "The target/selector that targets a player";
	item_playertarget.IsOptional = true;

	var item_itemNameItem = Tree.Add("Item name", CommandStructureType.Item);
	item_itemNameItem.Description = "The name of the item to remove";
	item_itemNameItem.IsOptional = true;

	var item_dataint = Tree.Add("data", CommandStructureType.Integer);
	item_dataint.Description = "The data value to remove";
	item_dataint.IsOptional = true;

	var item_maxCountint = Tree.Add("maxCount", CommandStructureType.Integer);
	item_maxCountint.Description = "The maximum amount of item that need to be removed";
	item_maxCountint.IsOptional = true;

	return Tree;
}
