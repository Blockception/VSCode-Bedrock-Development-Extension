import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of deop
export const deopTree = createdeop();

function createdeop() : CommandStructureTree {
	var Tree = new CommandStructureTree("deop");
	Tree.Description = "Revokes operator status from a player.";
	Tree.CanEnd = true;

	var item_player = Tree.Add("player:", CommandStructureType.Any);
	item_player.Description = "player:";
	item_player.IsOptional = false;

	var item_target = Tree.Add("target", CommandStructureType.Any);
	item_target.Description = "target";
	item_target.IsOptional = false;

	return Tree;
}
