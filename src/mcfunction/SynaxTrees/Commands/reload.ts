import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of reload
export const reloadTree = createreload();

function createreload() : CommandStructureTree {
	var Tree = new CommandStructureTree("reload");
	Tree.Description = "Reloads all function files from all behaviour packs.";
	Tree.CanEnd = true;

	return Tree;
}
