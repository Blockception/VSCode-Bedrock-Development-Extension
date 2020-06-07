import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of fill
export const fillTree = createfill();

function createfill() : CommandStructureTree {
	var Tree = new CommandStructureTree("fill");
	Tree.Description = "Fills all or parts of a region with a specific block.";
	Tree.CanEnd = true;

	var item_xstart = Tree.Add("area Start x", CommandStructureType.Coordinate);
	item_xstart.Description = "The x coordinate the area starts at";
	item_xstart.IsOptional = false;

	var item_ystart = item_xstart.Add("area Start y", CommandStructureType.Coordinate);
	item_ystart.Description = "The y coordinate the area starts at";
	item_ystart.IsOptional = false;

	var item_zstart = item_ystart.Add("area Start z", CommandStructureType.Coordinate);
	item_zstart.Description = "The z coordinate the area starts at";
	item_zstart.IsOptional = false;

	var item_xend = item_zstart.Add("area End x", CommandStructureType.Coordinate);
	item_xend.Description = "The x coordinate the area ends at";
	item_xend.IsOptional = false;

	var item_yend = item_xend.Add("area End y", CommandStructureType.Coordinate);
	item_yend.Description = "The y coordinate the area ends at";
	item_yend.IsOptional = false;

	var item_zend = item_yend.Add("area End z", CommandStructureType.Coordinate);
	item_zend.Description = "The z coordinate the area ends at";
	item_zend.IsOptional = false;

	var item_tileNameBlock = item_zend.Add("block", CommandStructureType.Block);
	item_tileNameBlock.Description = "block";
	item_tileNameBlock.IsOptional = false;

	var item_tileDataint = item_tileNameBlock.Add("block data", CommandStructureType.Integer);
	item_tileDataint.Description = "The data value of the block";
	item_tileDataint.IsOptional = true;

	var item_outline = item_tileDataint.Add("outline", CommandStructureType.SameAsName);
	item_outline.Description = "The outline of the area";
	item_outline.IsOptional = true;

	var item_hollow = item_tileDataint.Add("hollow", CommandStructureType.SameAsName);
	item_hollow.Description = "Make the filled area hollow";
	item_hollow.IsOptional = true;

	var item_destroy = item_tileDataint.Add("destroy", CommandStructureType.SameAsName);
	item_destroy.Description = "Destroys the old blocks";
	item_destroy.IsOptional = true;

	var item_keep = item_tileDataint.Add("keep", CommandStructureType.SameAsName);
	item_keep.Description = "Keeps the old blocks, air not included";
	item_keep.IsOptional = true;

	//Branch: replace
	var item_replace = item_tileDataint.Add("replace", CommandStructureType.SameAsName);
	item_replace.Description = "replace";
	item_replace.IsOptional = false;

	var item_replacetileNameBlock = item_zend.Add("block", CommandStructureType.Block);
	item_replacetileNameBlock.Description = "The block to replace";
	item_replacetileNameBlock.IsOptional = false;

	var item_replacetileDataint = item_tileNameBlock.Add("block data", CommandStructureType.Integer);
	item_replacetileDataint.Description = "The data value of the block to replace";
	item_replacetileDataint.IsOptional = true;

	return Tree;
}
