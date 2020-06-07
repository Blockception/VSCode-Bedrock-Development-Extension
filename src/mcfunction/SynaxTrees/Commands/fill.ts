import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of fill
export const fillTree = createfill();

function createfill() : CommandStructureTree {
	var Tree = new CommandStructureTree("fill");
	Tree.Description = "Fills all or parts of a region with a specific block.";
	Tree.CanEnd = true;

	var item_from = Tree.Add("from:", CommandStructureType.Any);
	item_from.Description = "from:";
	item_from.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	var item_to = Tree.Add("to:", CommandStructureType.Any);
	item_to.Description = "to:";
	item_to.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	var item_tileName = Tree.Add("tileName:", CommandStructureType.Any);
	item_tileName.Description = "tileName:";
	item_tileName.IsOptional = false;

	var item_Block = Tree.Add("Block", CommandStructureType.Any);
	item_Block.Description = "Block";
	item_Block.IsOptional = false;

	//Branch: item_Block.[tileData: int]
	{
	var item_tileDataint = item_Block.Add("tileData: int", CommandStructureType.Any);
	item_tileDataint.Description = "tileData: int";
	item_tileDataint.IsOptional = true;

	var item_outline|hollow|destroy|keep = Tree.Add("outline|hollow|destroy|keep", CommandStructureType.Any);
	item_outline|hollow|destroy|keep.Description = "outline|hollow|destroy|keep";
	item_outline|hollow|destroy|keep.IsOptional = true;

	}

	//Branch: item_Block.<tileData:
	{
	var item_tileData = item_Block.Add("tileData:", CommandStructureType.Any);
	item_tileData.Description = "tileData:";
	item_tileData.IsOptional = false;

	var item_int = Tree.Add("int", CommandStructureType.Any);
	item_int.Description = "int";
	item_int.IsOptional = false;

	var item_replace = Tree.Add("replace", CommandStructureType.Any);
	item_replace.Description = "replace";
	item_replace.IsOptional = false;

	var item_replaceTileNameBlock = Tree.Add("replaceTileName: Block", CommandStructureType.Any);
	item_replaceTileNameBlock.Description = "replaceTileName: Block";
	item_replaceTileNameBlock.IsOptional = true;

	var item_replaceDataValueint = Tree.Add("replaceDataValue: int", CommandStructureType.Any);
	item_replaceDataValueint.Description = "replaceDataValue: int";
	item_replaceDataValueint.IsOptional = true;

	}

	return Tree;
}
