import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of clear
export const clearTree = createclear();

function createclear() : CommandStructureTree {
	var Tree = new CommandStructureTree("clear");
	Tree.Description = "Clears items from player inventory.";
	Tree.CanEnd = true;

	var item_playertarget = Tree.Add("player: target", CommandStructureType.Any);
	item_playertarget.Description = "player: target";
	item_playertarget.IsOptional = true;

	var item_itemNameItem = Tree.Add("itemName: Item", CommandStructureType.Any);
	item_itemNameItem.Description = "itemName: Item";
	item_itemNameItem.IsOptional = true;

	var item_dataint = Tree.Add("data: int", CommandStructureType.Any);
	item_dataint.Description = "data: int";
	item_dataint.IsOptional = true;

	var item_maxCountint = Tree.Add("maxCount: int", CommandStructureType.Any);
	item_maxCountint.Description = "maxCount: int";
	item_maxCountint.IsOptional = true;

	return Tree;
}
