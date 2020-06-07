import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of effect
export const effectTree = createeffect();

function createeffect() : CommandStructureTree {
	var Tree = new CommandStructureTree("effect");
	Tree.Description = "Add status effects.";
	Tree.CanEnd = true;

	var item_player = Tree.Add("player:", CommandStructureType.Any);
	item_player.Description = "player:";
	item_player.IsOptional = false;

	var item_target = Tree.Add("target", CommandStructureType.Target);
	item_target.Description = "target";
	item_target.IsOptional = false;

	//Branch: item_target.<effect:
	{
	var item_effect = item_target.Add("effect:", CommandStructureType.Any);
	item_effect.Description = "effect:";
	item_effect.IsOptional = false;

	var item_Effect = Tree.Add("Effect", CommandStructureType.Any);
	item_Effect.Description = "Effect";
	item_Effect.IsOptional = false;

	var item_secondsint = Tree.Add("seconds: int", CommandStructureType.Any);
	item_secondsint.Description = "seconds: int";
	item_secondsint.IsOptional = true;

	var item_amplifierint = Tree.Add("amplifier: int", CommandStructureType.Any);
	item_amplifierint.Description = "amplifier: int";
	item_amplifierint.IsOptional = true;

	var item_hideParticlesBoolean = Tree.Add("hideParticles: Boolean", CommandStructureType.Any);
	item_hideParticlesBoolean.Description = "hideParticles: Boolean";
	item_hideParticlesBoolean.IsOptional = true;

	}

	//Branch: item_target.clear
	{
	var item_clear = item_target.Add("clear", CommandStructureType.Any);
	item_clear.Description = "clear";
	item_clear.IsOptional = false;

	}

	return Tree;
}
