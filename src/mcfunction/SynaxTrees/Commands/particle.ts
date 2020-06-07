import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of particle
export const particleTree = createparticle();

function createparticle() : CommandStructureTree {
	var Tree = new CommandStructureTree("particle");
	Tree.Description = "Creates a particle emitter";
	Tree.CanEnd = true;

	var item_effect = Tree.Add("effect:", CommandStructureType.Any);
	item_effect.Description = "effect:";
	item_effect.IsOptional = false;

	var item_string = Tree.Add("string", CommandStructureType.Any);
	item_string.Description = "string";
	item_string.IsOptional = false;

	var item_position = Tree.Add("position:", CommandStructureType.Any);
	item_position.Description = "position:";
	item_position.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	return Tree;
}
