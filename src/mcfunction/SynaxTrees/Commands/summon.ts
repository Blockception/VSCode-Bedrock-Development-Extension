import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of summon
export const summonTree = createsummon();

function createsummon() : CommandStructureTree {
	var Tree = new CommandStructureTree("summon");
	Tree.Description = "Summons an entity.";
	Tree.CanEnd = true;

	var item_entityType = Tree.Add("entityType:", CommandStructureType.Any);
	item_entityType.Description = "entityType:";
	item_entityType.IsOptional = false;

	var item_EntityType = Tree.Add("EntityType", CommandStructureType.Any);
	item_EntityType.Description = "EntityType";
	item_EntityType.IsOptional = false;

	//Branch: item_EntityType.[spawnPos: x y z]
	{
	var item_spawnPosxyz = item_EntityType.Add("spawnPos: x y z", CommandStructureType.Any);
	item_spawnPosxyz.Description = "spawnPos: x y z";
	item_spawnPosxyz.IsOptional = true;

	var item_spawnEventstring = Tree.Add("spawnEvent: string", CommandStructureType.Any);
	item_spawnEventstring.Description = "spawnEvent: string";
	item_spawnEventstring.IsOptional = true;

	var item_nameTagstring = Tree.Add("nameTag: string", CommandStructureType.Any);
	item_nameTagstring.Description = "nameTag: string";
	item_nameTagstring.IsOptional = true;

	}

	//Branch: item_EntityType.<nameTag:
	{
	var item_nameTag = item_EntityType.Add("nameTag:", CommandStructureType.Any);
	item_nameTag.Description = "nameTag:";
	item_nameTag.IsOptional = false;

	var item_string = Tree.Add("string", CommandStructureType.Any);
	item_string.Description = "string";
	item_string.IsOptional = false;

	var item_spawnPosxyz = Tree.Add("spawnPos: x y z", CommandStructureType.Any);
	item_spawnPosxyz.Description = "spawnPos: x y z";
	item_spawnPosxyz.IsOptional = true;

	}

	return Tree;
}
