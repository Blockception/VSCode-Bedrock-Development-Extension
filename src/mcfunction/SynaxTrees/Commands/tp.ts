import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of tp
export const tpTree = createtp();

function createtp() : CommandStructureTree {
	var Tree = new CommandStructureTree("tp");
	Tree.Description = "Teleports entities";
	Tree.CanEnd = true;

	//Branch: tp.<target>
	{
	var item_target = Tree.Add("target", CommandStructureType.Any);
	item_target.Description = "target";
	item_target.IsOptional = false;

	//Branch: item_target.<x y z|destination>
	{
	var item_xyz|destination = item_target.Add("x y z|destination", CommandStructureType.Any);
	item_xyz|destination.Description = "x y z|destination";
	item_xyz|destination.IsOptional = false;

	var item_yRotvalue = item_xyz|destination.Add("yRot: value", CommandStructureType.Any);
	item_yRotvalue.Description = "yRot: value";
	item_yRotvalue.IsOptional = true;

	var item_xRotvalue = item_yRotvalue.Add("xRot: value", CommandStructureType.Any);
	item_xRotvalue.Description = "xRot: value";
	item_xRotvalue.IsOptional = true;

	var item_checkForBlocksBoolean = item_xRotvalue.Add("checkForBlocks", CommandStructureType.Boolean);
	item_checkForBlocksBoolean.Description = "checkForBlocks: Boolean";
	item_checkForBlocksBoolean.IsOptional = true;

	}

	//Branch: item_target.<x y z|target>
	{
	var item_xyz|target = item_target.Add("x y z|target", CommandStructureType.Any);
	item_xyz|target.Description = "x y z|target";
	item_xyz|target.IsOptional = false;

	var item_facing = item_xyz|target.Add("facing", CommandStructureType.Any);
	item_facing.Description = "facing";
	item_facing.IsOptional = false;

	var item_lookAtEntitytarget|xyz = item_facing.Add("lookAtEntity: target|x y z", CommandStructureType.Any);
	item_lookAtEntitytarget|xyz.Description = "lookAtEntity: target|x y z";
	item_lookAtEntitytarget|xyz.IsOptional = false;

	var item_checkForBlocksBoolean = item_lookAtEntitytarget|xyz.Add("checkForBlocks", CommandStructureType.Boolean);
	item_checkForBlocksBoolean.Description = "checkForBlocks: Boolean";
	item_checkForBlocksBoolean.IsOptional = true;

	}

	}

	//Branch: tp.<x y z|destination>
	{
	var item_xyz|destination = Tree.Add("x y z|destination", CommandStructureType.Any);
	item_xyz|destination.Description = "x y z|destination";
	item_xyz|destination.IsOptional = false;

	var item_yRotvalue = item_xyz|destination.Add("yRot: value", CommandStructureType.Any);
	item_yRotvalue.Description = "yRot: value";
	item_yRotvalue.IsOptional = true;

	var item_xRotvalue = item_yRotvalue.Add("xRot: value", CommandStructureType.Any);
	item_xRotvalue.Description = "xRot: value";
	item_xRotvalue.IsOptional = true;

	var item_checkForBlocksBoolean = item_xRotvalue.Add("checkForBlocks", CommandStructureType.Boolean);
	item_checkForBlocksBoolean.Description = "checkForBlocks: Boolean";
	item_checkForBlocksBoolean.IsOptional = true;

	}

	//Branch: tp.<x y z|target>
	{
	var item_xyz|target = Tree.Add("x y z|target", CommandStructureType.Any);
	item_xyz|target.Description = "x y z|target";
	item_xyz|target.IsOptional = false;

	var item_facing = item_xyz|target.Add("facing", CommandStructureType.Any);
	item_facing.Description = "facing";
	item_facing.IsOptional = false;

	var item_lookAtEntitytarget|xyz = item_facing.Add("lookAtEntity: target|x y z", CommandStructureType.Any);
	item_lookAtEntitytarget|xyz.Description = "lookAtEntity: target|x y z";
	item_lookAtEntitytarget|xyz.IsOptional = false;

	var item_checkForBlocksBoolean = item_lookAtEntitytarget|xyz.Add("checkForBlocks", CommandStructureType.Boolean);
	item_checkForBlocksBoolean.Description = "checkForBlocks: Boolean";
	item_checkForBlocksBoolean.IsOptional = true;

	}

	return Tree;
}
