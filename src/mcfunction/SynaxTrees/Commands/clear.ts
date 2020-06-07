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

	var item_itemName = item_playertarget.Add("Item name", CommandStructureType.Item);
	item_itemName.Description = "The name of the item to remove";
	item_itemName.IsOptional = true;

	var item_data = item_itemName.Add("data", CommandStructureType.Integer);
	item_data.Description = "The data value to remove";
	item_data.IsOptional = true;

	var item_maxCount = item_data.Add("maxCount", CommandStructureType.Integer);
	item_maxCount.Description = "The maximum amount of item that need to be removed";
	item_maxCount.IsOptional = true;

	return Tree;
}
