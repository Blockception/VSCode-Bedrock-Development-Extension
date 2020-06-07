import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of particle
export const particleTree = createparticle();

function createparticle() : CommandStructureTree {
	var Tree = new CommandStructureTree("particle");
	Tree.Description = "Creates a particle emitter";
	Tree.CanEnd = true;

	var item_effectstring = Tree.Add("effect: string", CommandStructureType.Any);
	item_effectstring.Description = "effect: string";
	item_effectstring.IsOptional = false;

	var item_positionxyz = item_effectstring.Add("position: x y z", CommandStructureType.Any);
	item_positionxyz.Description = "position: x y z";
	item_positionxyz.IsOptional = false;

	return Tree;
}
