import { CommandStructureTree, CommandStructureType, CommandStructureItem } from "../CommandStructure";

//The tree structure of effect
export const effectTree = createeffect();

function createeffect() : CommandStructureTree {
	var Tree = new CommandStructureTree("effect");
	Tree.Description = "Add status effects.";
	Tree.CanEnd = true;

	var item_playertarget = Tree.Add("entity: target", CommandStructureType.Target);
	item_playertarget.Description = "The entity target/selector";
	item_playertarget.IsOptional = false;

	branchGive(item_playertarget);

	var item_clear = item_playertarget.Add("clear", CommandStructureType.SameAsName);
	item_clear.Description = "clear";
	item_clear.IsOptional = false;

	return Tree;
}

function branchGive(Item : CommandStructureItem){
	var item_effect = Item.Add("effect", CommandStructureType.Effect);
	item_effect.Description = "The effect to give to entity";
	item_effect.IsOptional = false;

	var item_seconds = item_effect.Add("seconds", CommandStructureType.Integer);
	item_seconds.Description = "seconds: int";
	item_seconds.IsOptional = true;

	var item_amplifier = item_seconds.Add("amplifier", CommandStructureType.Integer);
	item_amplifier.Description = "amplifier: int";
	item_amplifier.IsOptional = true;

	var item_hideParticles = item_amplifier.Add("hideParticles", CommandStructureType.Boolean);
	item_hideParticles.Description = "If true then the particles are hidden";
	item_hideParticles.IsOptional = true;
}
