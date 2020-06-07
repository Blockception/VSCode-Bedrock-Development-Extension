import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of particle
export const particleTree = createparticle();

function createparticle() : CommandStructureTree {
	var Tree = new CommandStructureTree("particle");
	Tree.Description = "Creates a particle emitter";
	Tree.CanEnd = true;

	var item_effectstring = Tree.Add("particle", CommandStructureType.Particle);
	item_effectstring.Description = "The particle identifier to play";
	item_effectstring.IsOptional = false;

	var item_x = item_effectstring.Add("position: x", CommandStructureType.Coordinate);
	item_x.Description = "The x coordinate to play the particle at";
	item_x.IsOptional = false;

	var item_y = item_x.Add("position: y", CommandStructureType.Coordinate);
	item_y.Description = "The y coordinate to play the particle at";
	item_y.IsOptional = false;

	var item_z = item_y.Add("position: z", CommandStructureType.Coordinate);
	item_z.Description = "The z coordinate to play the particle at";
	item_z.IsOptional = false;

	return Tree;
}
