import { CommandStructureTree, CommandStructureType, CommandStructureItem } from "../CommandStructure";

//The tree structure of enchant
export const enchantTree = createenchant();

function createenchant() : CommandStructureTree {
	var Tree = new CommandStructureTree("enchant");
	Tree.Description = "Adds an echantment to a player's selected item.";
	Tree.CanEnd = true;

	var item_playertarget = Tree.Add("player", CommandStructureType.Target);
	item_playertarget.Description = "The player target/selector";
	item_playertarget.IsOptional = false;

	var item_EnchantName = item_playertarget.Add("Enchant Name", CommandStructureType.Any);
	item_EnchantName.Description = "The enchantment name";
	item_EnchantName.IsOptional = false;

	var item_intEnchant = item_playertarget.Add("int Enchant", CommandStructureType.Enchantment);
	item_intEnchant.Description = "The integer of the enchantment";
	item_intEnchant.IsOptional = false;

	var item_levelint = new CommandStructureItem("level", CommandStructureType.Integer);
	item_intEnchant.Childs.push(item_levelint);
	item_EnchantName.Childs.push(item_levelint);

	item_levelint.Description = "The level of the enchantment to add";
	item_levelint.IsOptional = true;

	return Tree;
}
