import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of setmaxplayers
export const setmaxplayersTree = createsetmaxplayers();

function createsetmaxplayers() : CommandStructureTree {
	var Tree = new CommandStructureTree("setmaxplayers");
	Tree.Description = "Sets the maximum number of players for this game session.";
	Tree.CanEnd = true;

	var item_maxPlayers = Tree.Add("maxPlayers:", CommandStructureType.Any);
	item_maxPlayers.Description = "maxPlayers:";
	item_maxPlayers.IsOptional = false;

	var item_int = Tree.Add("int", CommandStructureType.Any);
	item_int.Description = "int";
	item_int.IsOptional = false;

	return Tree;
}
