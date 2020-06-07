import { CommandStructureTree, CommandStructureType } from "../CommandStructure";

//The tree structure of playsound
export const playsoundTree = createplaysound();

function createplaysound() : CommandStructureTree {
	var Tree = new CommandStructureTree("playsound");
	Tree.Description = "Plays a sound.";
	Tree.CanEnd = true;

	var item_soundstring = Tree.Add("sound", CommandStructureType.Sound);
	item_soundstring.Description = "The sound to play";
	item_soundstring.IsOptional = false;
	
	var item_playertarget = item_soundstring.Add("player", CommandStructureType.Target);
	item_playertarget.Description = "The player target/selector";
	item_playertarget.IsOptional = true;

	var item_x = item_playertarget.Add("position: x", CommandStructureType.Coordinate);
	item_x.Description = "The x coordinate to play the sound at";
	item_x.IsOptional = true;

	var item_y = item_x.Add("position: y", CommandStructureType.Coordinate);
	item_y.Description = "The y coordinate to play the sound at";
	item_y.IsOptional = true;

	var item_z = item_y.Add("position: z", CommandStructureType.Coordinate);
	item_z.Description = "The z coordinate to play the sound at";
	item_z.IsOptional = true;

	var item_volume = item_z.Add("volume", CommandStructureType.Number);
	item_volume.Description = "The volume to play this sound at";
	item_volume.IsOptional = true;

	var item_pitch = item_volume.Add("pitch", CommandStructureType.Number);
	item_pitch.Description = "The pitch to play the audio at";
	item_pitch.IsOptional = true;

	var item_minimumVolume = item_pitch.Add("minimumVolume", CommandStructureType.Number);
	item_minimumVolume.Description = "The minimum volume the sound needs to have";
	item_minimumVolume.IsOptional = true;

	return Tree;
}
