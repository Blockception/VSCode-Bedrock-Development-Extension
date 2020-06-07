import { CommandStructureTree, CommandStructureType, CommandStructureItem } from "../CommandStructure";

//The tree structure of summon
export const summonTree = createsummon();

function createsummon() : CommandStructureTree {
	var Tree = new CommandStructureTree("summon");
	Tree.Description = "Summons an entity.";
	Tree.CanEnd = true;

	var item_entityType = Tree.Add("entityType", CommandStructureType.Entity);
	item_entityType.Description = "entityType";
	item_entityType.IsOptional = false;


	branch(item_entityType);
	branchNamed(item_entityType);

	return Tree;
}

function branch(Item : CommandStructureItem) {
	var item_spawnPosxyz = Item.Add("spawnPos: x y z", CommandStructureType.Any);
	item_spawnPosxyz.Description = "spawnPos: x y z";
	item_spawnPosxyz.IsOptional = true;

	var item_spawnEventstring = item_spawnPosxyz.Add("spawnEvent: string", CommandStructureType.Any);
	item_spawnEventstring.Description = "spawnEvent: string";
	item_spawnEventstring.IsOptional = true;

	var item_nameTagstring = item_spawnEventstring.Add("nameTag: string", CommandStructureType.Any);
	item_nameTagstring.Description = "nameTag: string";
	item_nameTagstring.IsOptional = true;
}

function branchNamed(Item : CommandStructureItem) {
	var item_nameTagstring = Item.Add("nameTag: string", CommandStructureType.Any);
	item_nameTagstring.Description = "nameTag: string";
	item_nameTagstring.IsOptional = false;

	var item_x = item_nameTagstring.Add("position: x", CommandStructureType.Coordinate);
	item_x.Description = "The x coordinate to place the player spawn at";
	item_x.IsOptional = true;

	var item_y = item_x.Add("position: y", CommandStructureType.Coordinate);
	item_y.Description = "The y coordinate to place the player spawn at";
	item_y.IsOptional = true;

	var item_z = item_y.Add("position: z", CommandStructureType.Coordinate);
	item_z.Description = "The z coordinate to place the player spawn at";
	item_z.IsOptional = true;
}
