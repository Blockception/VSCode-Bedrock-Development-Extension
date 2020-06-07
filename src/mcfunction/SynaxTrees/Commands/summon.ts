import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of summon
export const summonTree = createsummon();

function createsummon() : CommandStructureTree {
	var Tree = new CommandStructureTree("summon");
	Tree.Description = "Summons an entity.";
	Tree.CanEnd = true;

	var item_entityTypeEntityType = Tree.Add("entityType: EntityType", CommandStructureType.Any);
	item_entityTypeEntityType.Description = "entityType: EntityType";
	item_entityTypeEntityType.IsOptional = false;

	//Branch: item_entityTypeEntityType.[spawnPos: x y z]
	{
	var item_spawnPosxyz = item_entityTypeEntityType.Add("spawnPos: x y z", CommandStructureType.Any);
	item_spawnPosxyz.Description = "spawnPos: x y z";
	item_spawnPosxyz.IsOptional = true;

	var item_spawnEventstring = item_spawnPosxyz.Add("spawnEvent: string", CommandStructureType.Any);
	item_spawnEventstring.Description = "spawnEvent: string";
	item_spawnEventstring.IsOptional = true;

	var item_nameTagstring = item_spawnEventstring.Add("nameTag: string", CommandStructureType.Any);
	item_nameTagstring.Description = "nameTag: string";
	item_nameTagstring.IsOptional = true;

	}

	//Branch: item_entityTypeEntityType.<nameTag: string>
	{
	var item_nameTagstring = item_entityTypeEntityType.Add("nameTag: string", CommandStructureType.Any);
	item_nameTagstring.Description = "nameTag: string";
	item_nameTagstring.IsOptional = false;

	var item_spawnPosxyz = item_nameTagstring.Add("spawnPos: x y z", CommandStructureType.Any);
	item_spawnPosxyz.Description = "spawnPos: x y z";
	item_spawnPosxyz.IsOptional = true;

	}

	return Tree;
}
