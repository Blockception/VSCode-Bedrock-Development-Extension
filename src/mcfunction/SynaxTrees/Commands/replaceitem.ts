import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of replaceitem
export const replaceitemTree = createreplaceitem();

function createreplaceitem() : CommandStructureTree {
	var Tree = new CommandStructureTree("replaceitem");
	Tree.Description = "Replaces items in inventories";
	Tree.CanEnd = true;

	//Branch: replaceitem.block
	{
	var item_block = Tree.Add("block", CommandStructureType.Any);
	item_block.Description = "block";
	item_block.IsOptional = false;

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

	var item_slot.container = Tree.Add("slot.container", CommandStructureType.Any);
	item_slot.container.Description = "slot.container";
	item_slot.container.IsOptional = false;

	var item_slotId = Tree.Add("slotId:", CommandStructureType.Any);
	item_slotId.Description = "slotId:";
	item_slotId.IsOptional = false;

	var item_int = Tree.Add("int", CommandStructureType.Any);
	item_int.Description = "int";
	item_int.IsOptional = false;

	var item_itemName = Tree.Add("itemName:", CommandStructureType.Any);
	item_itemName.Description = "itemName:";
	item_itemName.IsOptional = false;

	var item_Item = Tree.Add("Item", CommandStructureType.Any);
	item_Item.Description = "Item";
	item_Item.IsOptional = false;

	var item_amountint = Tree.Add("amount: int", CommandStructureType.Any);
	item_amountint.Description = "amount: int";
	item_amountint.IsOptional = true;

	var item_dataint = Tree.Add("data: int", CommandStructureType.Any);
	item_dataint.Description = "data: int";
	item_dataint.IsOptional = true;

	var item_componentsjson = Tree.Add("components: json", CommandStructureType.Any);
	item_componentsjson.Description = "components: json";
	item_componentsjson.IsOptional = true;

	}

	//Branch: replaceitem.entity
	{
	var item_entity = Tree.Add("entity", CommandStructureType.Any);
	item_entity.Description = "entity";
	item_entity.IsOptional = false;

	var item_target = Tree.Add("target:", CommandStructureType.Any);
	item_target.Description = "target:";
	item_target.IsOptional = false;

	var item_target = Tree.Add("target", CommandStructureType.Target);
	item_target.Description = "target";
	item_target.IsOptional = false;

	var item_slotType = Tree.Add("slotType:", CommandStructureType.Any);
	item_slotType.Description = "slotType:";
	item_slotType.IsOptional = false;

	var item_EntityEquipmentSlot = Tree.Add("EntityEquipmentSlot", CommandStructureType.Any);
	item_EntityEquipmentSlot.Description = "EntityEquipmentSlot";
	item_EntityEquipmentSlot.IsOptional = false;

	var item_slotId = Tree.Add("slotId:", CommandStructureType.Any);
	item_slotId.Description = "slotId:";
	item_slotId.IsOptional = false;

	var item_int = Tree.Add("int", CommandStructureType.Any);
	item_int.Description = "int";
	item_int.IsOptional = false;

	var item_itemName = Tree.Add("itemName:", CommandStructureType.Any);
	item_itemName.Description = "itemName:";
	item_itemName.IsOptional = false;

	var item_Item = Tree.Add("Item", CommandStructureType.Any);
	item_Item.Description = "Item";
	item_Item.IsOptional = false;

	var item_amountint = Tree.Add("amount: int", CommandStructureType.Any);
	item_amountint.Description = "amount: int";
	item_amountint.IsOptional = true;

	var item_dataint = Tree.Add("data: int", CommandStructureType.Any);
	item_dataint.Description = "data: int";
	item_dataint.IsOptional = true;

	var item_componentsjson = Tree.Add("components: json", CommandStructureType.Any);
	item_componentsjson.Description = "components: json";
	item_componentsjson.IsOptional = true;

	}

	return Tree;
}
