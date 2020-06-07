import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of xp
export const xpTree = createxp();

function createxp() : CommandStructureTree {
	var Tree = new CommandStructureTree("xp");
	Tree.Description = "Adds or removes player experience.";
	Tree.CanEnd = true;

	//Branch: xp.<amount: int>
	{
	var item_amountint = Tree.Add("amount", CommandStructureType.Integer);
	item_amountint.Description = "amount: int";
	item_amountint.IsOptional = false;

	var item_playertarget = item_amountint.Add("player", CommandStructureType.Target);
	item_playertarget.Description = "The player target/selector";
	item_playertarget.IsOptional = true;

	}

	//Branch: xp.<amount: int>L
	{
	var item_amountint>L = Tree.Add("amount: int>L", CommandStructureType.Any);
	item_amountint>L.Description = "amount: int>L";
	item_amountint>L.IsOptional = false;

	var item_playertarget = item_amountint>L.Add("player", CommandStructureType.Target);
	item_playertarget.Description = "The player target/selector";
	item_playertarget.IsOptional = true;

	}

	return Tree;
}
