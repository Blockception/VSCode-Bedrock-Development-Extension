import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of setworldspawn
export const setworldspawnTree = createsetworldspawn();

function createsetworldspawn() : CommandStructureTree {
	var Tree = new CommandStructureTree("setworldspawn");
	Tree.Description = "Sets the world spawn.";
	Tree.CanEnd = true;

	var item_spawnPointxyz = Tree.Add("spawnPoint: x y z", CommandStructureType.Any);
	item_spawnPointxyz.Description = "spawnPoint: x y z";
	item_spawnPointxyz.IsOptional = true;

	return Tree;
}
