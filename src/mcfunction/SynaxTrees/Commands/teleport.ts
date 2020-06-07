import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of teleport
export const teleportTree = createteleport();

function createteleport() : CommandStructureTree {
	var Tree = new CommandStructureTree("teleport");
	Tree.Description = "Teleports entities";
	Tree.CanEnd = true;

	//Branch: teleport.<target>
	{
	var item_target = Tree.Add("target", CommandStructureType.Target);
	item_target.Description = "target";
	item_target.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	//Branch: item_y.z|destination>
	{
	var item_z|destination = item_y.Add("z|destination", CommandStructureType.Any);
	item_z|destination.Description = "z|destination";
	item_z|destination.IsOptional = false;

	var item_yRotvalue = Tree.Add("yRot: value", CommandStructureType.Any);
	item_yRotvalue.Description = "yRot: value";
	item_yRotvalue.IsOptional = true;

	var item_xRotvalue = Tree.Add("xRot: value", CommandStructureType.Any);
	item_xRotvalue.Description = "xRot: value";
	item_xRotvalue.IsOptional = true;

	var item_checkForBlocksBoolean = Tree.Add("checkForBlocks", CommandStructureType.Boolean);
	item_checkForBlocksBoolean.Description = "checkForBlocks: Boolean";
	item_checkForBlocksBoolean.IsOptional = true;

	}

	//Branch: item_y.z|target>
	{
	var item_z|target = item_y.Add("z|target", CommandStructureType.Target);
	item_z|target.Description = "z|target";
	item_z|target.IsOptional = false;

	var item_facing = Tree.Add("facing", CommandStructureType.Any);
	item_facing.Description = "facing";
	item_facing.IsOptional = false;

	var item_lookAtEntity = Tree.Add("lookAtEntity:", CommandStructureType.Any);
	item_lookAtEntity.Description = "lookAtEntity:";
	item_lookAtEntity.IsOptional = false;

	var item_target|x = Tree.Add("target|x", CommandStructureType.Any);
	item_target|x.Description = "target|x";
	item_target|x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	var item_checkForBlocksBoolean = Tree.Add("checkForBlocks", CommandStructureType.Boolean);
	item_checkForBlocksBoolean.Description = "checkForBlocks: Boolean";
	item_checkForBlocksBoolean.IsOptional = true;

	}

	}

	//Branch: teleport.<x
	{
	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	//Branch: item_y.z|destination>
	{
	var item_z|destination = item_y.Add("z|destination", CommandStructureType.Any);
	item_z|destination.Description = "z|destination";
	item_z|destination.IsOptional = false;

	var item_yRotvalue = Tree.Add("yRot: value", CommandStructureType.Any);
	item_yRotvalue.Description = "yRot: value";
	item_yRotvalue.IsOptional = true;

	var item_xRotvalue = Tree.Add("xRot: value", CommandStructureType.Any);
	item_xRotvalue.Description = "xRot: value";
	item_xRotvalue.IsOptional = true;

	var item_checkForBlocksBoolean = Tree.Add("checkForBlocks", CommandStructureType.Boolean);
	item_checkForBlocksBoolean.Description = "checkForBlocks: Boolean";
	item_checkForBlocksBoolean.IsOptional = true;

	}

	//Branch: item_y.z|target>
	{
	var item_z|target = item_y.Add("z|target", CommandStructureType.Target);
	item_z|target.Description = "z|target";
	item_z|target.IsOptional = false;

	var item_facing = Tree.Add("facing", CommandStructureType.Any);
	item_facing.Description = "facing";
	item_facing.IsOptional = false;

	var item_lookAtEntity = Tree.Add("lookAtEntity:", CommandStructureType.Any);
	item_lookAtEntity.Description = "lookAtEntity:";
	item_lookAtEntity.IsOptional = false;

	var item_target|x = Tree.Add("target|x", CommandStructureType.Any);
	item_target|x.Description = "target|x";
	item_target|x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	var item_checkForBlocksBoolean = Tree.Add("checkForBlocks", CommandStructureType.Boolean);
	item_checkForBlocksBoolean.Description = "checkForBlocks: Boolean";
	item_checkForBlocksBoolean.IsOptional = true;

	}

	}

	return Tree;
}
