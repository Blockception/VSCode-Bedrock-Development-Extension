import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of kill
export const killTree = createkill();

function createkill() : CommandStructureTree {
	var Tree = new CommandStructureTree("kill");
	Tree.Description = "Kills entities";
	Tree.CanEnd = true;

	var item_targettarget = Tree.Add("target: target", CommandStructureType.Target);
	item_targettarget.Description = "target: target";
	item_targettarget.IsOptional = true;

	return Tree;
}
