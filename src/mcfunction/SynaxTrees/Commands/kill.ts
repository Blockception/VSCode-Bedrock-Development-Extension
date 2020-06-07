import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of kill
export const killTree = createkill();

function createkill() : CommandStructureTree {
	var Tree = new CommandStructureTree("kill");
	Tree.Description = "Kills entities.";
	Tree.CanEnd = true;

	var item_target = Tree.Add("target", CommandStructureType.Target);
	item_target.Description = "The target to kill";
	item_target.IsOptional = true;

	return Tree;
}
