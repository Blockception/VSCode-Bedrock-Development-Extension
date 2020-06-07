import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of spawnpoint
export const spawnpointTree = createspawnpoint();

function createspawnpoint() : CommandStructureTree {
	var Tree = new CommandStructureTree("spawnpoint");
	Tree.Description = "Sets the spawn point for a player.";
	Tree.CanEnd = true;

	var item_playertarget = Tree.Add("player: target", CommandStructureType.Target);
	item_playertarget.Description = "The target/selector that targets a player";
	item_playertarget.IsOptional = true;

	var item_spawnPosxyz = Tree.Add("spawnPos: x y z", CommandStructureType.Any);
	item_spawnPosxyz.Description = "spawnPos: x y z";
	item_spawnPosxyz.IsOptional = true;

	return Tree;
}
