import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of execute
export const executeTree = createexecute();

function createexecute() : CommandStructureTree {
	var Tree = new CommandStructureTree("execute");
	Tree.Description = "Executes a command on behalf of one or more entities.";
	Tree.CanEnd = true;

	var item_origin = Tree.Add("origin:", CommandStructureType.Any);
	item_origin.Description = "origin:";
	item_origin.IsOptional = false;

	var item_target = Tree.Add("target", CommandStructureType.Any);
	item_target.Description = "target";
	item_target.IsOptional = false;

	var item_position = Tree.Add("position:", CommandStructureType.Any);
	item_position.Description = "position:";
	item_position.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	//Branch: item_z.<command:
	{
	var item_command = Tree.Add("command:", CommandStructureType.Any);
	item_command.Description = "command:";
	item_command.IsOptional = false;

	var item_command = Tree.Add("command", CommandStructureType.Any);
	item_command.Description = "command";
	item_command.IsOptional = false;

	}

	//Branch: item_z.detect
	{
	var item_detect = Tree.Add("detect", CommandStructureType.Any);
	item_detect.Description = "detect";
	item_detect.IsOptional = false;

	var item_detectPos = Tree.Add("detectPos:", CommandStructureType.Any);
	item_detectPos.Description = "detectPos:";
	item_detectPos.IsOptional = false;

	var item_x = Tree.Add("x", CommandStructureType.Any);
	item_x.Description = "x";
	item_x.IsOptional = false;

	var item_y = Tree.Add("y", CommandStructureType.Any);
	item_y.Description = "y";
	item_y.IsOptional = false;

	var item_z = Tree.Add("z", CommandStructureType.Any);
	item_z.Description = "z";
	item_z.IsOptional = false;

	var item_block = Tree.Add("block:", CommandStructureType.Any);
	item_block.Description = "block:";
	item_block.IsOptional = false;

	var item_Block = Tree.Add("Block", CommandStructureType.Any);
	item_Block.Description = "Block";
	item_Block.IsOptional = false;

	var item_data = Tree.Add("data:", CommandStructureType.Any);
	item_data.Description = "data:";
	item_data.IsOptional = false;

	var item_int = Tree.Add("int", CommandStructureType.Any);
	item_int.Description = "int";
	item_int.IsOptional = false;

	var item_command = Tree.Add("command:", CommandStructureType.Any);
	item_command.Description = "command:";
	item_command.IsOptional = false;

	var item_command = Tree.Add("command", CommandStructureType.Any);
	item_command.Description = "command";
	item_command.IsOptional = false;

	}

	return Tree;
}
