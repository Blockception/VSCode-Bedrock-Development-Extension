import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of op
export const opTree = createop();

function createop() : CommandStructureTree {
	var Tree = new CommandStructureTree("op");
	Tree.Description = "Grants operator status to a player.";
	Tree.CanEnd = true;

	var item_playertarget = Tree.Add("player", CommandStructureType.Target);
	item_playertarget.Description = "The player target/selector";
	item_playertarget.IsOptional = false;

	return Tree;
}
