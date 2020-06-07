import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of give
export const giveTree = creategive();

function creategive() : CommandStructureTree {
	var Tree = new CommandStructureTree("give");
	Tree.Description = "Gives an item to a player.";
	Tree.CanEnd = true;

	var item_playertarget = Tree.Add("player", CommandStructureType.Target);
	item_playertarget.Description = "The player target/selector";
	item_playertarget.IsOptional = false;

	var item_itemNameItem = item_playertarget.Add("Item name", CommandStructureType.Item);
	item_itemNameItem.Description = "The item to give.";
	item_itemNameItem.IsOptional = false;

	var item_amountint = item_itemNameItem.Add("amount", CommandStructureType.Integer);
	item_amountint.Description = "The amount of items to give.";
	item_amountint.IsOptional = true;

	var item_dataint = item_amountint.Add("item data", CommandStructureType.Integer);
	item_dataint.Description = "The item data.";
	item_dataint.IsOptional = true;

	var item_componentsjson = item_dataint.Add("components: json", CommandStructureType.Json);
	item_componentsjson.Description = "components: json";
	item_componentsjson.IsOptional = true;

	return Tree;
}
