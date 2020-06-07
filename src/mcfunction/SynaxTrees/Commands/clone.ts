import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of clone
export const cloneTree = createclone();

function createclone() : CommandStructureTree {
	var Tree = new CommandStructureTree("clone");
	Tree.Description = "Clones blocks from one region to another.";
	Tree.CanEnd = true;

	var item_begin = Tree.Add("begin:", CommandStructureType.Any);
	item_begin.Description = "begin:";
	item_begin.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	var item_end = Tree.Add("end:", CommandStructureType.Any);
	item_end.Description = "end:";
	item_end.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	var item_destination = Tree.Add("destination:", CommandStructureType.Any);
	item_destination.Description = "destination:";
	item_destination.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	//Branch: item_z.[replace|masked]
	{
	var item_replace|masked = Tree.Add("replace|masked", CommandStructureType.Any);
	item_replace|masked.Description = "replace|masked";
	item_replace|masked.IsOptional = true;

	var item_normal|force|move = Tree.Add("normal|force|move", CommandStructureType.Any);
	item_normal|force|move.Description = "normal|force|move";
	item_normal|force|move.IsOptional = true;

	}

	//Branch: item_z.filtered
	{
	var item_filtered = Tree.Add("filtered", CommandStructureType.Any);
	item_filtered.Description = "filtered";
	item_filtered.IsOptional = false;

	var item_normal|force|move = Tree.Add("normal|force|move", CommandStructureType.Any);
	item_normal|force|move.Description = "normal|force|move";
	item_normal|force|move.IsOptional = false;

	var item_tileName = Tree.Add("tileName:", CommandStructureType.Any);
	item_tileName.Description = "tileName:";
	item_tileName.IsOptional = false;

	var item_Block = Tree.Add("Block", CommandStructureType.Any);
	item_Block.Description = "Block";
	item_Block.IsOptional = false;

	var item_tileData = Tree.Add("tileData:", CommandStructureType.Any);
	item_tileData.Description = "tileData:";
	item_tileData.IsOptional = false;

	var item_int = Tree.Add("int", CommandStructureType.Any);
	item_int.Description = "int";
	item_int.IsOptional = false;

	}

	return Tree;
}
