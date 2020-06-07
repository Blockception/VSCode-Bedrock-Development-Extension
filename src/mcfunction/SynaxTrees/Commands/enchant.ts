import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of enchant
export const enchantTree = createenchant();

function createenchant() : CommandStructureTree {
	var Tree = new CommandStructureTree("enchant");
	Tree.Description = "Adds an echantment to a player's selected item.";
	Tree.CanEnd = true;

	var item_player = Tree.Add("player:", CommandStructureType.Any);
	item_player.Description = "player:";
	item_player.IsOptional = false;

	var item_target = Tree.Add("target", CommandStructureType.Target);
	item_target.Description = "target";
	item_target.IsOptional = false;

	var item_int|Enchant = Tree.Add("int|Enchant", CommandStructureType.Any);
	item_int|Enchant.Description = "int|Enchant";
	item_int|Enchant.IsOptional = false;

	var item_Name = Tree.Add("Name", CommandStructureType.Any);
	item_Name.Description = "Name";
	item_Name.IsOptional = false;

	var item_levelint = Tree.Add("level", CommandStructureType.Integer);
	item_levelint.Description = "level: int";
	item_levelint.IsOptional = true;

	return Tree;
}
