import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of setmaxplayers
export const setmaxplayersTree = createsetmaxplayers();

function createsetmaxplayers() : CommandStructureTree {
	var Tree = new CommandStructureTree("setmaxplayers");
	Tree.Description = "Sets the maximum number of players for this game session.";
	Tree.CanEnd = true;

	var item_maxPlayersint = Tree.Add("maxPlayers", CommandStructureType.Integer);
	item_maxPlayersint.Description = "maxPlayers: int";
	item_maxPlayersint.IsOptional = false;

	return Tree;
}
