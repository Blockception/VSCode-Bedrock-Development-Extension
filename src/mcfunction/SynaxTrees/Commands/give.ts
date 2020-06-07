import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of give
export const giveTree = creategive();

function creategive() : CommandStructureTree {
	var Tree = new CommandStructureTree("give");
	Tree.Description = "Gives an item to a player.";
	Tree.CanEnd = true;

	var item_player = Tree.Add("player:", CommandStructureType.Any);
	item_player.Description = "player:";
	item_player.IsOptional = false;

	var item_target = Tree.Add("target", CommandStructureType.Any);
	item_target.Description = "target";
	item_target.IsOptional = false;

	var item_itemName = Tree.Add("itemName:", CommandStructureType.Any);
	item_itemName.Description = "itemName:";
	item_itemName.IsOptional = false;

	var item_Item = Tree.Add("Item", CommandStructureType.Any);
	item_Item.Description = "Item";
	item_Item.IsOptional = false;

	var item_amountint = Tree.Add("amount: int", CommandStructureType.Any);
	item_amountint.Description = "amount: int";
	item_amountint.IsOptional = true;

	var item_dataint = Tree.Add("data: int", CommandStructureType.Any);
	item_dataint.Description = "data: int";
	item_dataint.IsOptional = true;

	//Branch: item_dataint.[components: json]
	{
	var item_componentsjson = item_dataint.Add("components: json", CommandStructureType.Any);
	item_componentsjson.Description = "components: json";
	item_componentsjson.IsOptional = true;

	}

	//Branch: item_dataint.{ "minecraft:can_destroy": { "blocks": [ "grass" ]}, "minecraft:can_place_on": { "blocks": [ "grass" ]}}
	{
	var item_{"minecraftcan_destroy"{"blocks"["grass"]},"minecraftcan_place_on"{"blocks"["grass"]}} = item_dataint.Add("{ "minecraft:can_destroy": { "blocks": [ "grass" ]}, "minecraft:can_place_on": { "blocks": [ "grass" ]}}", CommandStructureType.Any);
	item_{"minecraftcan_destroy"{"blocks"["grass"]},"minecraftcan_place_on"{"blocks"["grass"]}}.Description = "{ "minecraft:can_destroy": { "blocks": [ "grass" ]}, "minecraft:can_place_on": { "blocks": [ "grass" ]}}";
	item_{"minecraftcan_destroy"{"blocks"["grass"]},"minecraftcan_place_on"{"blocks"["grass"]}}.IsOptional = false;

	}

	return Tree;
}
