import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of xp
export const xpTree = createxp();

function createxp() : CommandStructureTree {
	var Tree = new CommandStructureTree("xp");
	Tree.Description = "Adds or removes player experience.";
	Tree.CanEnd = true;

	var item_amount = Tree.Add("amount:", CommandStructureType.Any);
	item_amount.Description = "amount:";
	item_amount.IsOptional = false;

	//Branch: item_amount.int>
	{
	var item_int = item_amount.Add("int", CommandStructureType.Any);
	item_int.Description = "int";
	item_int.IsOptional = false;

	var item_playertarget = Tree.Add("player: target", CommandStructureType.Any);
	item_playertarget.Description = "player: target";
	item_playertarget.IsOptional = true;

	}

	//Branch: item_amount.int>L
	{
	var item_int>L = item_amount.Add("int>L", CommandStructureType.Any);
	item_int>L.Description = "int>L";
	item_int>L.IsOptional = false;

	var item_playertarget = Tree.Add("player: target", CommandStructureType.Any);
	item_playertarget.Description = "player: target";
	item_playertarget.IsOptional = true;

	}

	return Tree;
}
