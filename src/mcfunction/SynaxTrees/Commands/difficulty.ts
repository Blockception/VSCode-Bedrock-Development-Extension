import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of difficulty
export const difficultyTree = createdifficulty();

function createdifficulty() : CommandStructureTree {
	var Tree = new CommandStructureTree("difficulty");
	Tree.Description = "Sets the difficulty level.";
	Tree.CanEnd = true;

	var item_peaceful|easy|normal|hard|e|h|n|p|0|1|2|3 = Tree.Add("peaceful|easy|normal|hard|e|h|n|p|0|1|2|3", CommandStructureType.Any);
	item_peaceful|easy|normal|hard|e|h|n|p|0|1|2|3.Description = "peaceful|easy|normal|hard|e|h|n|p|0|1|2|3";
	item_peaceful|easy|normal|hard|e|h|n|p|0|1|2|3.IsOptional = false;

	return Tree;
}
