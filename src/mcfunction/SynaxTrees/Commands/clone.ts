import { CommandStructureTree, CommandStructureType, CommandStructureItem } from "../CommandStructure";

//The tree structure of clone
export const cloneTree = createclone();

function createclone() : CommandStructureTree {
	var Tree = new CommandStructureTree("clone");
	Tree.Description = "Clones blocks from one region to another.";
	Tree.CanEnd = true;

	var item_xstart = Tree.Add("Source Start x", CommandStructureType.Coordinate);
	item_xstart.Description = "The x coordinate the source starts at";
	item_xstart.IsOptional = false;

	var item_ystart = item_xstart.Add("Source Start y", CommandStructureType.Coordinate);
	item_ystart.Description = "The y coordinate the source starts at";
	item_ystart.IsOptional = false;

	var item_zstart = item_ystart.Add("Source Start z", CommandStructureType.Coordinate);
	item_zstart.Description = "The z coordinate the source starts at";
	item_zstart.IsOptional = false;

	var item_xend = item_zstart.Add("Source End x", CommandStructureType.Coordinate);
	item_xend.Description = "The x coordinate";
	item_xend.IsOptional = false;

	var item_yend = item_xend.Add("Source End y", CommandStructureType.Coordinate);
	item_yend.Description = "The y coordinate";
	item_yend.IsOptional = false;

	var item_zend = item_yend.Add("Source End z", CommandStructureType.Coordinate);
	item_zend.Description = "The z coordinate";
	item_zend.IsOptional = false;

	var item_xdestination = item_zend.Add("Destination x", CommandStructureType.Coordinate);
	item_xdestination.Description = "The x coordinate of the destination of the cloning";
	item_xdestination.IsOptional = false;

	var item_ydestination = item_xdestination.Add("Destination y", CommandStructureType.Coordinate);
	item_ydestination.Description = "The y coordinate of the destination of the cloning";
	item_ydestination.IsOptional = false;

	var item_zdestination = item_ydestination.Add("Destination z", CommandStructureType.Coordinate);
	item_zdestination.Description = "The z coordinate of the destination of the cloning";
	item_zdestination.IsOptional = false;

	//Branch: item_z.replace
	branchReplace(item_zdestination);
	branchMasked(item_zdestination);
	branchFiltered(item_zdestination);

	return Tree;
}


function branchReplace(Item : CommandStructureItem) {
	var item_replace = Item.Add("replace", CommandStructureType.Any);
	item_replace.Description = "replace";
	item_replace.IsOptional = true;

	branchNormalForceMove(item_replace, false);
}

function branchMasked(Item : CommandStructureItem) {
	var item_masked = Item.Add("replace|masked", CommandStructureType.Any);
	item_masked.Description = "replace|masked";
	item_masked.IsOptional = true;

	branchNormalForceMove(item_masked, false);
}

function branchFiltered(Item : CommandStructureItem) {
	var item_filtered = Item.Add("filtered", CommandStructureType.Any);
	item_filtered.Description = "filtered";
	item_filtered.IsOptional = false;	

	branchNormalForceMove(item_filtered, true);
}

function branchNormalForceMove(Item : CommandStructureItem, includeBlocks : boolean){
	var item_normal = Item.Add("normal", CommandStructureType.Any);
	item_normal.Description = "normal";
	item_normal.IsOptional = true;

	var item_force = Item.Add("force", CommandStructureType.Any);
	item_force.Description = "force";
	item_force.IsOptional = true;

	var item_move = Item.Add("move", CommandStructureType.Any);
	item_move.Description = "move";
	item_move.IsOptional = true;

	if (includeBlocks){
		var item_tileName = new CommandStructureItem("tile name", CommandStructureType.Block);
		item_tileName.Description = "The name of the block";
		item_tileName.IsOptional = false;
	
		var item_tileData = item_tileName.Add("tile data", CommandStructureType.Number);
		item_tileData.Description = "tileData:";
		item_tileData.IsOptional = false;

		item_normal.Childs.push(item_tileName);
		item_force.Childs.push(item_tileName);
		item_force.Childs.push(item_tileName);
	}	
}
