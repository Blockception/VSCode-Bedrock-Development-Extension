import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of op
export const opTree = createop();

function createop() : CommandStructureTree {
	var Tree = new CommandStructureTree("op");
	Tree.Description = "Grants operator status to a player.";
	Tree.CanEnd = true;

	var item_player = Tree.Add("player:", CommandStructureType.Any);
	item_player.Description = "player:";
	item_player.IsOptional = false;

	var item_target = Tree.Add("target", CommandStructureType.Target);
	item_target.Description = "target";
	item_target.IsOptional = false;

	return Tree;
}
